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
const nativeDate_service_1 = require("../calendar/service/nativeDate.service");
const popover_component_1 = require("../popover/popover.component");
const type_1 = require("../popover/type");
class BaseDatepickerComponent extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.state = {
            visible: false,
        };
        this.calendarRef = react_1.default.createRef(); // FIXME: ts
        this.scrollToToday = () => {
            this.calendarRef.current?.scrollToToday();
        };
        this.scrollToDate = (date) => {
            this.calendarRef.current?.scrollToDate(date);
        };
        this.popoverRef = react_1.default.createRef();
        this.show = () => {
            this.popoverRef.current?.show();
        };
        this.hide = () => {
            this.popoverRef.current?.hide();
        };
        this.focus = () => {
            this.setState({ visible: true }, this.onPickerVisible);
        };
        this.blur = () => {
            this.setState({ visible: false }, this.onPickerInvisible);
        };
        this.isFocused = () => {
            return this.state.visible;
        };
        this.getComponentStyle = (style) => {
            const { textMarginHorizontal, textFontFamily, textFontSize, textFontWeight, textColor, placeholderColor, iconWidth, iconHeight, iconMarginHorizontal, iconTintColor, labelColor, labelFontSize, labelMarginBottom, labelFontWeight, labelFontFamily, captionMarginTop, captionColor, captionFontSize, captionFontWeight, captionFontFamily, popoverWidth, ...controlParameters } = style;
            return {
                control: controlParameters,
                text: {
                    marginHorizontal: textMarginHorizontal,
                    fontFamily: textFontFamily,
                    fontSize: textFontSize,
                    fontWeight: textFontWeight,
                    color: textColor,
                },
                placeholder: {
                    marginHorizontal: textMarginHorizontal,
                    color: placeholderColor,
                },
                icon: {
                    width: iconWidth,
                    height: iconHeight,
                    marginHorizontal: iconMarginHorizontal,
                    tintColor: iconTintColor,
                },
                label: {
                    color: labelColor,
                    fontSize: labelFontSize,
                    fontFamily: labelFontFamily,
                    marginBottom: labelMarginBottom,
                    fontWeight: labelFontWeight,
                },
                captionLabel: {
                    fontSize: captionFontSize,
                    fontWeight: captionFontWeight,
                    fontFamily: captionFontFamily,
                    color: captionColor,
                },
                popover: {
                    width: popoverWidth,
                    marginBottom: captionMarginTop,
                },
            };
        };
        this.onPress = (event) => {
            this.setPickerVisible();
            this.props.onPress && this.props.onPress(event);
        };
        this.onPressIn = (event) => {
            this.props.eva.dispatch([theme_1.Interaction.ACTIVE]);
            this.props.onPressIn && this.props.onPressIn(event);
        };
        this.onPressOut = (event) => {
            this.props.eva.dispatch([]);
            this.props.onPressOut && this.props.onPressOut(event);
        };
        this.onPickerVisible = () => {
            this.props.eva.dispatch([theme_1.Interaction.ACTIVE]);
            this.props.onFocus && this.props.onFocus();
        };
        this.onPickerInvisible = () => {
            this.props.eva.dispatch([]);
            this.props.onBlur && this.props.onBlur();
        };
        this.setPickerVisible = () => {
            this.setState({ visible: true }, this.onPickerVisible);
        };
        this.setPickerInvisible = () => {
            this.setState({ visible: false }, this.onPickerInvisible);
        };
        this.renderInputElement = (props, evaStyle) => {
            return (react_1.default.createElement(devsupport_1.TouchableWithoutFeedback, Object.assign({}, props, { style: [evaStyle.control, styles.control, this.props.controlStyle], onPress: this.onPress, onPressIn: this.onPressIn, onPressOut: this.onPressOut }),
                react_1.default.createElement(devsupport_1.FalsyFC, { style: evaStyle.icon, component: this.props.accessoryLeft }),
                react_1.default.createElement(devsupport_1.FalsyText, { style: evaStyle.text, numberOfLines: 1, ellipsizeMode: 'tail', component: this.getComponentTitle() }),
                react_1.default.createElement(devsupport_1.FalsyFC, { style: evaStyle.icon, component: this.props.accessoryRight })));
        };
    }
    render() {
        const { eva, style, testID, backdropStyle, controlStyle, placement, label, accessoryLeft, accessoryRight, caption, ...touchableProps } = this.props;
        const evaStyle = this.getComponentStyle(eva.style);
        return (react_1.default.createElement(react_native_1.View, { style: style, testID: testID },
            react_1.default.createElement(devsupport_1.FalsyText, { style: [evaStyle.label, styles.label], component: label }),
            react_1.default.createElement(popover_component_1.Popover, { ref: this.popoverRef, style: [evaStyle.popover, styles.popover], backdropStyle: backdropStyle, placement: placement, visible: this.state.visible, anchor: () => this.renderInputElement(touchableProps, evaStyle), onBackdropPress: this.setPickerInvisible }, this.renderCalendar()),
            react_1.default.createElement(devsupport_1.FalsyText, { style: [evaStyle.captionLabel, styles.captionLabel], component: caption })));
    }
}
exports.BaseDatepickerComponent = BaseDatepickerComponent;
BaseDatepickerComponent.defaultProps = {
    dateService: new nativeDate_service_1.NativeDateService(),
    placeholder: 'dd/mm/yyyy',
    placement: type_1.PopoverPlacements.BOTTOM_START,
};
const styles = react_native_1.StyleSheet.create({
    popover: {
        borderWidth: 0,
    },
    control: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    label: {
        textAlign: 'left',
    },
    captionLabel: {
        textAlign: 'left',
    },
});
//# sourceMappingURL=baseDatepicker.component.js.map