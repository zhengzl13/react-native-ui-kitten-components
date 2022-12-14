"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const devsupport_1 = require("../../devsupport");
const chevronDown_component_1 = require("../shared/chevronDown.component");
const menuItem_component_1 = require("./menuItem.component");
const theme_1 = require("../../theme");
const CHEVRON_DEG_COLLAPSED = -180;
const CHEVRON_DEG_EXPANDED = 0;
const CHEVRON_ANIM_DURATION = 200;
const POSITION_OUTSCREEN = devsupport_1.Point.outscreen();
/**
 * A group of items displayed in Menu.
 * Groups should be rendered within Menu and contain MenuItem components to provide a useful navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<MenuItemProps> | ReactElement<MenuItemProps>[]} children -
 * Items to be rendered within group.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} title - String, number or a function component
 * to render within the group.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the *title*.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the *title*.
 * Expected to return an Image.
 *
 * @property {boolean} initiallyExpanded - Boolean value which defines whether group should be initially expanded.
 * If true - menu group will be expanded by default.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example MenuGroups
 */
class MenuGroup extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.state = {
            submenuHeight: 1,
        };
        this.expandAnimation = new react_native_1.Animated.Value(0);
        this.onPress = (descriptor, event) => {
            if (this.hasSubmenu) {
                this.initiallyExpanded = false;
                const expandValue = this.expandAnimationValue > 0 ? 0 : this.state.submenuHeight;
                this.createExpandAnimation(expandValue).start();
                this.props.onPress && this.props.onPress(descriptor, event);
            }
        };
        this.onSubmenuMeasure = (frame) => {
            this.setState({ submenuHeight: frame.size.height });
        };
        this.createExpandAnimation = (toValue) => {
            return react_native_1.Animated.timing(this.expandAnimation, {
                toValue: toValue,
                duration: CHEVRON_ANIM_DURATION,
                useNativeDriver: false,
            });
        };
        this.renderAccessoryIfNeeded = (evaProps) => {
            if (!this.hasSubmenu) {
                return null;
            }
            const style = react_native_1.StyleSheet.flatten(evaProps.style);
            return (react_1.default.createElement(react_native_1.Animated.View, { style: { transform: [{ rotate: this.expandToRotateInterpolation }] } },
                react_1.default.createElement(chevronDown_component_1.ChevronDown, Object.assign({}, evaProps, { fill: style.tintColor }))));
        };
        this.renderItemsWithDefaultProps = () => {
            return react_1.default.Children.map(this.props.children, (item) => {
                return react_1.default.cloneElement(item, this.defaultItemProps, null);
            });
        };
        this.renderGroupedItems = (evaStyle) => {
            return (react_1.default.createElement(react_native_1.Animated.View, { style: [styles.submenu, this.submenuStyle, evaStyle] }, this.renderItemsWithDefaultProps()));
        };
        this.renderMeasuringGroupedItems = (evaStyle) => {
            return (react_1.default.createElement(devsupport_1.MeasureElement, { shouldUseTopInsets: theme_1.ModalService.getShouldUseTopInsets, onMeasure: this.onSubmenuMeasure }, this.renderGroupedItems(evaStyle)));
        };
        this.renderGroupedItemsIfNeeded = (evaStyle) => {
            if (!this.hasSubmenu) {
                return null;
            }
            if (this.shouldMeasureSubmenu) {
                return this.renderMeasuringGroupedItems(evaStyle);
            }
            return this.renderGroupedItems(evaStyle);
        };
        this.initiallyExpanded = props.initiallyExpanded;
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        const submenuHeightChanged = this.state.submenuHeight !== prevState.submenuHeight;
        if (submenuHeightChanged && this.hasSubmenu && this.initiallyExpanded) {
            this.expandAnimation.setValue(this.state.submenuHeight);
        }
    }
    get hasSubmenu() {
        return react_1.default.Children.count(this.props.children) > 0;
    }
    get shouldMeasureSubmenu() {
        return this.state.submenuHeight === 1;
    }
    get expandAnimationValue() {
        // @ts-ignore - private api, but let's us avoid creating animation listeners.
        // `this.expandAnimation.addListener`
        return this.expandAnimation._value;
    }
    get expandToRotateInterpolation() {
        return this.expandAnimation.interpolate({
            inputRange: [-this.state.submenuHeight, CHEVRON_DEG_EXPANDED],
            outputRange: [`${CHEVRON_DEG_COLLAPSED}deg`, `${CHEVRON_DEG_EXPANDED}deg`],
        });
    }
    get submenuStyle() {
        // @ts-ignore - issue of `@types/react-native` package
        return this.shouldMeasureSubmenu ? styles.outscreen : { height: this.expandAnimation };
    }
    get defaultItemProps() {
        return { appearance: 'grouped' };
    }
    render() {
        const { children, ...itemProps } = this.props;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement(menuItem_component_1.MenuItem, Object.assign({ accessoryRight: this.renderAccessoryIfNeeded }, itemProps, { onPress: this.onPress })),
            this.renderGroupedItemsIfNeeded({})));
    }
}
exports.MenuGroup = MenuGroup;
const styles = react_native_1.StyleSheet.create({
    outscreen: {
        position: 'absolute',
        left: POSITION_OUTSCREEN.x,
        top: POSITION_OUTSCREEN.y,
    },
    submenu: {
        overflow: 'hidden',
    },
});
//# sourceMappingURL=menuGroup.component.js.map