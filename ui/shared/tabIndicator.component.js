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
class TabIndicator extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.indicatorWidth = 0;
        this.contentOffset = new react_native_1.Animated.Value(0);
        this.onContentOffsetAnimationStateChanged = (state) => {
            // no-op
        };
        this.onContentOffsetAnimationStateEnd = (result) => {
            // no-op
        };
        this.createOffsetAnimation = (params) => {
            return react_native_1.Animated.timing(this.contentOffset, {
                toValue: devsupport_1.RTLService.select(params.offset, -params.offset),
                duration: 200,
                easing: react_native_1.Easing.linear,
                useNativeDriver: react_native_1.Platform.OS !== 'web',
            });
        };
        this.onLayout = (event) => {
            this.indicatorWidth = event.nativeEvent.layout.width;
            this.scrollToOffset({
                offset: this.indicatorWidth * this.props.selectedPosition,
                animated: false,
            });
        };
        this.getComponentStyle = () => {
            const widthPercent = 100 / this.props.positions;
            return {
                width: `${widthPercent}%`,
                // @ts-ignore: RN has no types for `Animated` styles
                transform: [{ translateX: this.contentOffset }],
            };
        };
        this.renderIndicatorLine = (style) => {
            return (react_1.default.createElement(react_native_1.View, { testID: 'indicator body', style: [{ width: '100%', alignSelf: 'center' }, style] }));
        };
    }
    componentDidMount() {
        this.contentOffset.addListener(this.onContentOffsetAnimationStateChanged);
    }
    componentDidUpdate() {
        const { selectedPosition: index } = this.props;
        this.scrollToIndex({
            index,
            animated: true,
        });
    }
    componentWillUnmount() {
        this.contentOffset.removeAllListeners();
    }
    /**
     * scrolls indicator to passed index
     *
     * @param params (object) - {
     *  index: number,
     *  animated: boolean | undefined
     * }
     */
    scrollToIndex(params) {
        const { index, ...rest } = params;
        const offset = this.indicatorWidth * index;
        this.scrollToOffset({ offset, ...rest });
    }
    /**
     * scrolls indicator to passed offset
     *
     * @param params (object) - {
     *  offset: number,
     *  animated: boolean | undefined
     * }
     */
    scrollToOffset(params) {
        this.createOffsetAnimation(params).start(this.onContentOffsetAnimationStateEnd);
    }
    render() {
        const { style, ...viewProps } = this.props;
        const evaStyle = this.getComponentStyle();
        const indicatorLine = this.renderIndicatorLine(style);
        return (react_1.default.createElement(react_native_1.Animated.View, Object.assign({}, viewProps, { style: [evaStyle], onLayout: this.onLayout }), indicatorLine));
    }
}
exports.TabIndicator = TabIndicator;
TabIndicator.defaultProps = {
    selectedPosition: 0,
};
//# sourceMappingURL=tabIndicator.component.js.map