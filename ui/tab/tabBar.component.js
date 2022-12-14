"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_native_1 = require("react-native");
const theme_1 = require("../../theme");
const tabIndicator_component_1 = require("../shared/tabIndicator.component");
/**
 * A bar with tabs styled by Eva.
 * TabBar should contain Tab components to provide a useful navigation component.
 *
 * @extends React.Component
 *
 * @property {ReactElement<TabProps> | ReactElement<TabProps>[]} children - Tabs to be rendered within the bar.
 *
 * @property {number} selectedIndex - Index of currently selected tab.
 *
 * @property {(number) => void} onSelect - Called when tab is pressed.
 *
 * @property {StyleProp<ViewStyle>} indicatorStyle - Style of the indicator component.
 *
 * @property {ViewProps} ...ViewProps - Any props applied to View component.
 *
 * @overview-example TabBarSimpleUsage
 * In basic examples, tabs are wrapped within `TabBar`.
 *
 * @overview-example Using with React Navigation
 * TabBar can also be [configured with React Navigation](guides/configure-navigation)
 * to provide a navigational component.
 * ```
 * import React from 'react';
 * import { NavigationContainer } from '@react-navigation/native';
 * import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
 * import { TabBar, Tab, Layout, Text } from '@ui-kitten/components';
 *
 * const { Navigator, Screen } = createMaterialTopTabNavigator();
 *
 * const UsersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>USERS</Text>
 *   </Layout>
 * );
 *
 * const OrdersScreen = () => (
 *   <Layout style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
 *     <Text category='h1'>ORDERS</Text>
 *   </Layout>
 * );
 *
 * const TopTabBar = ({ navigation, state }) => (
 *   <TabBar
 *     selectedIndex={state.index}
 *     onSelect={index => navigation.navigate(state.routeNames[index])}>
 *     <Tab title='USERS'/>
 *     <Tab title='ORDERS'/>
 *   </TabBar>
 * );
 *
 * const TabNavigator = () => (
 *   <Navigator tabBar={props => <TopTabBar {...props} />}>
 *     <Screen name='Users' component={UsersScreen}/>
 *     <Screen name='Orders' component={OrdersScreen}/>
 *   </Navigator>
 * );
 *
 * export const AppNavigator = () => (
 *   <NavigationContainer>
 *     <TabNavigator/>
 *   </NavigationContainer>
 * );
 * ```
 *
 * @overview-example TabBarAccessories
 * Tabs also may contain [icons](guides/icon-packages), to provide a better user interfaces.
 *
 * @overview-example TabStyling
 * Tab and it's inner views can be styled by passing them as function components.
 * ```
 * import { Tab, Text } from '@ui-kitten/components';
 *
 * <Tab
 *   title={evaProps => <Text {...evaProps}>USERS</Text>}
 * />
 * ```
 *
 * @overview-example TabTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
let TabBar = class TabBar extends react_1.default.Component {
    constructor() {
        super(...arguments);
        this.tabIndicatorRef = react_1.default.createRef();
        this.onTabSelect = (index) => {
            this.props.onSelect && this.props.onSelect(index);
        };
        this.getComponentStyle = (source) => {
            const { indicatorHeight, indicatorBorderRadius, indicatorBackgroundColor, ...containerParameters } = source;
            return {
                container: containerParameters,
                item: {},
                indicator: {
                    height: indicatorHeight,
                    borderRadius: indicatorBorderRadius,
                    backgroundColor: indicatorBackgroundColor,
                },
            };
        };
        this.isTabSelected = (index) => {
            return index === this.props.selectedIndex;
        };
        this.renderTabElement = (element, index) => {
            return react_1.default.cloneElement(element, {
                key: index,
                style: [styles.item, element.props.style],
                selected: this.isTabSelected(index),
                onSelect: () => this.onTabSelect(index),
            });
        };
        this.renderTabElements = (source) => {
            return react_1.default.Children.map(source, this.renderTabElement);
        };
    }
    scrollToIndex(params) {
        this.tabIndicatorRef.current?.scrollToIndex(params);
    }
    scrollToOffset(params) {
        this.tabIndicatorRef.current?.scrollToOffset(params);
    }
    render() {
        const { eva, style, testID, indicatorStyle, selectedIndex, children, ...viewProps } = this.props;
        const evaStyle = this.getComponentStyle(eva.style);
        const tabElements = this.renderTabElements(children);
        return (react_1.default.createElement(react_native_1.View, { testID: testID },
            react_1.default.createElement(react_native_1.View, Object.assign({}, viewProps, { style: [evaStyle.container, styles.container, style] }), tabElements),
            react_1.default.createElement(tabIndicator_component_1.TabIndicator, { ref: this.tabIndicatorRef, style: [evaStyle.indicator, indicatorStyle], selectedPosition: selectedIndex, positions: tabElements.length })));
    }
};
TabBar.defaultProps = {
    selectedIndex: 0,
};
TabBar = __decorate([
    theme_1.styled('TabBar')
], TabBar);
exports.TabBar = TabBar;
const styles = react_native_1.StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    item: {
        flex: 1,
    },
});
//# sourceMappingURL=tabBar.component.js.map