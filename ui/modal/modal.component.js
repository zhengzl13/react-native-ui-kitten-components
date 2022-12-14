"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
const theme_1 = require("../../theme");
/**
 * A wrapper that presents content above an enclosing view.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets modal visible.
 *
 * @method {() => void} hide - Sets modal invisible.
 *
 * @property {ReactNode} children - Component to render within the modal.
 *
 * @property {boolean} visible - Whether component is visible.
 * Defaults to false.
 *
 * @property {() => void} onBackdropPress - Called when the modal is visible and the view below it was touched.
 * Useful when needed to close the modal on outside touches.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example ModalSimpleUsage
 * Modals accept content views as child elements and are displayed in the screen center.
 * To display a modal, a `visible` property should be used.
 *
 * @overview-example ModalWithBackdrop
 * To configure underlying view, `backdropStyle` and `onBackdropPress` properties may be used.
 */
class Modal extends react_1.default.PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            contentFrame: devsupport_1.Frame.zero(),
            forceMeasure: false,
        };
        this.contentPosition = devsupport_1.Point.outscreen();
        this.show = () => {
            this.modalId = theme_1.ModalService.show(this.renderMeasuringContentElement(), this.backdropConfig);
        };
        this.hide = () => {
            this.modalId = theme_1.ModalService.hide(this.modalId);
        };
        this.onDimensionChange = () => {
            if (this.props.visible) {
                theme_1.ModalService.update(this.modalId, this.renderMeasuringContentElement());
            }
        };
        this.onContentMeasure = (contentFrame) => {
            this.state.contentFrame = contentFrame;
            const displayFrame = this.state.contentFrame.centerOf(devsupport_1.Frame.window());
            this.contentPosition = displayFrame.origin;
            theme_1.ModalService.update(this.modalId, this.renderContentElement());
        };
        this.renderContentElement = () => {
            return (react_1.default.createElement(react_native_1.View, Object.assign({}, this.props, { style: [this.props.style, styles.modalView, this.contentFlexPosition] })));
        };
        this.renderMeasuringContentElement = () => {
            return (react_1.default.createElement(devsupport_1.MeasureElement, { shouldUseTopInsets: theme_1.ModalService.getShouldUseTopInsets, onMeasure: this.onContentMeasure }, this.renderContentElement()));
        };
    }
    get contentFlexPosition() {
        const derivedStyle = react_native_1.StyleSheet.flatten(this.props.style || {});
        const { x: centerX, y: centerY } = this.contentPosition;
        // @ts-ignore
        return { left: derivedStyle.left || centerX, top: derivedStyle.top || centerY };
    }
    get backdropConfig() {
        const { onBackdropPress, backdropStyle } = this.props;
        return { onBackdropPress, backdropStyle };
    }
    componentDidMount() {
        this.dimensionsChangeSubscription = react_native_1.Dimensions.addEventListener('change', this.onDimensionChange);
        if (!this.modalId && this.props.visible) {
            this.show();
            return;
        }
    }
    componentDidUpdate(prevProps) {
        if (!this.modalId && this.props.visible && !this.state.forceMeasure) {
            this.setState({ forceMeasure: true });
            return;
        }
        if (!this.modalId && this.props.visible) {
            this.show();
            return;
        }
        if (this.modalId && !this.props.visible) {
            this.hide();
        }
        if (this.modalId && this.props.visible) {
            theme_1.ModalService.update(this.modalId, this.renderContentElement());
        }
    }
    componentWillUnmount() {
        if (this.dimensionsChangeSubscription) {
            this.dimensionsChangeSubscription.remove();
        }
        else {
            // for backward compatibility with RN <0.65
            react_native_1.Dimensions.removeEventListener('change', this.onDimensionChange);
        }
        this.hide();
    }
    render() {
        return null;
    }
}
exports.Modal = Modal;
const styles = react_native_1.StyleSheet.create({
    modalView: {
        position: 'absolute',
    },
});
//# sourceMappingURL=modal.component.js.map