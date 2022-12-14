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
const react_native_testing_library_1 = require("react-native-testing-library");
const eva_1 = require("@eva-design/eva");
const theme_1 = require("../../theme");
const rangeDatepicker_component_1 = require("./rangeDatepicker.component");
const rangeCalendar_component_1 = require("../calendar/rangeCalendar.component");
const type_1 = require("../calendar/type");
jest.mock('react-native', () => {
    const ActualReactNative = jest.requireActual('react-native');
    ActualReactNative.UIManager.measureInWindow = (node, callback) => {
        callback(0, 0, 42, 42);
    };
    return ActualReactNative;
});
const now = new Date();
const today = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0);
describe('@range-datepicker: component checks', () => {
    afterAll(() => {
        jest.clearAllMocks();
    });
    const TestRangeDatepicker = react_1.default.forwardRef((props, ref) => {
        const [range, setRange] = react_1.default.useState(props.range || {});
        const onSelect = (nextRange) => {
            setRange(nextRange);
            props.onSelect && props.onSelect(nextRange);
        };
        return (react_1.default.createElement(theme_1.ApplicationProvider, { mapping: eva_1.mapping, theme: eva_1.light },
            react_1.default.createElement(rangeDatepicker_component_1.RangeDatepicker, Object.assign({ ref: ref }, props, { range: range, onSelect: onSelect }))));
    });
    /*
     * In this test:
     * [0] for input touchable
     * [1] for backdrop
     * ...rest for calendar touchable components
     */
    const touchables = {
        findInputTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[0],
        findBackdropTouchable: (api) => api.queryAllByType(react_native_1.TouchableOpacity)[1],
    };
    it('should not render range calendar when not focused', () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, null));
        expect(component.queryByType(rangeCalendar_component_1.RangeCalendar)).toBeFalsy();
    });
    it('should render range calendar when becomes focused', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, null));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeTruthy();
    });
    it('should render label as string', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { label: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { label: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render label as pure JSX component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { label: react_1.default.createElement(react_native_1.Text, null, "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as string', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { caption: 'I love Babel' }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption as component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { caption: props => react_1.default.createElement(react_native_1.Text, Object.assign({}, props), "I love Babel") }));
        expect(component.queryByText('I love Babel')).toBeTruthy();
    });
    it('should render caption', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { caption: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'caption icon' })) }));
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render caption as pure JSX component', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { caption: react_1.default.createElement(react_native_1.View, { testID: 'caption icon' }) }));
        expect(component.queryByTestId('caption icon')).toBeTruthy();
    });
    it('should render component passed to accessoryLeft prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { accessoryLeft: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'accessory left' })) }));
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryLeft prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { accessoryLeft: react_1.default.createElement(react_native_1.View, { testID: 'accessory left' }) }));
        expect(component.queryByTestId('accessory left')).toBeTruthy();
    });
    it('should render component passed to accessoryRight prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { accessoryRight: props => react_1.default.createElement(react_native_1.View, Object.assign({}, props, { testID: 'accessory right' })) }));
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should render pure JSX component passed to accessoryRight prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { accessoryRight: react_1.default.createElement(react_native_1.View, { testID: 'accessory right' }) }));
        expect(component.queryByTestId('accessory right')).toBeTruthy();
    });
    it('should call onSelect only with start date', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: null,
            });
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should call onSelect with start and end dates if start date passed to props', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: new Date(today.getFullYear(), today.getMonth(), 8),
            });
        });
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { range: { startDate: new Date(today.getFullYear(), today.getMonth(), 7) }, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('8')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should call onSelect only with start date if start and end dates passed to props', async () => {
        const onSelect = jest.fn((range) => {
            expect(range).toEqual({
                startDate: new Date(today.getFullYear(), today.getMonth(), 7),
                endDate: null,
            });
        });
        const initialRange = {
            startDate: new Date(today.getFullYear(), today.getMonth(), 7),
            endDate: new Date(today.getFullYear(), today.getMonth(), 8),
        };
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { range: initialRange, onSelect: onSelect }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const dateTouchable = await react_native_testing_library_1.waitForElement(() => component.queryAllByText('7')[0]);
        react_native_testing_library_1.fireEvent.press(dateTouchable);
    });
    it('should render element provided with renderDay prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { renderDay: () => react_1.default.createElement(react_native_1.View, { testID: '@range-datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderMonth prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { startView: type_1.CalendarViewModes.MONTH, renderMonth: () => react_1.default.createElement(react_native_1.View, { testID: '@range-datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(component.queryAllByType(react_native_1.TouchableOpacity)[0]);
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should render element provided with renderYear prop', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { startView: type_1.CalendarViewModes.YEAR, renderYear: () => react_1.default.createElement(react_native_1.View, { testID: '@range-datepicker/cell' }) }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const cells = await react_native_testing_library_1.waitForElement(() => component.queryAllByTestId('@range-datepicker/cell'));
        expect(cells.length).not.toEqual(0);
    });
    it('should hide calendar when backdrop pressed', async () => {
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, null));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeFalsy();
    });
    it('should call onFocus when calendar becomes visible', async () => {
        const onFocus = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onFocus: onFocus }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        await react_native_testing_library_1.waitForElement(() => null);
        expect(onFocus).toBeCalled();
    });
    it('should call onBlur when calendar becomes invisible', async () => {
        const onBlur = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onBlur: onBlur }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        const backdrop = await react_native_testing_library_1.waitForElement(() => touchables.findBackdropTouchable(component));
        react_native_testing_library_1.fireEvent.press(backdrop);
        expect(onBlur).toBeCalled();
    });
    it('should show calendar by calling `show` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        componentRef.current.show();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar by calling `hide` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        componentRef.current.show();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.hide();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeFalsy();
    });
    it('should show calendar by calling `focus` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeTruthy();
    });
    it('should hide calendar by calling `blur` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        await react_native_testing_library_1.waitForElement(() => null);
        componentRef.current.blur();
        const calendar = await react_native_testing_library_1.waitForElement(() => component.queryByType(rangeCalendar_component_1.RangeCalendar));
        expect(calendar).toBeFalsy();
    });
    it('should return false if calendar not visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        expect(componentRef.current.isFocused()).toEqual(false);
    });
    it('should return true if calendar visible by calling `isFocused` with ref', async () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef }));
        componentRef.current.focus();
        await react_native_testing_library_1.waitForElement(() => null);
        expect(componentRef.current.isFocused()).toEqual(true);
    });
    it('should call onSelect with empty object when calling `clear` with ref', async () => {
        const componentRef = react_1.default.createRef();
        const onSelect = jest.fn();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef, onSelect: onSelect }));
        componentRef.current.clear();
        await react_native_testing_library_1.waitForElement(() => null);
        expect(onSelect).toBeCalledWith({});
    });
    it('should call onPress', async () => {
        const onPress = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onPress: onPress }));
        react_native_testing_library_1.fireEvent.press(touchables.findInputTouchable(component));
        expect(onPress).toBeCalled();
    });
    it('should call onPressIn', async () => {
        const onPressIn = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onPressIn: onPressIn }));
        react_native_testing_library_1.fireEvent(touchables.findInputTouchable(component), 'pressIn');
        expect(onPressIn).toBeCalled();
    });
    it('should call onPressOut', async () => {
        const onPressOut = jest.fn();
        const component = react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { onPressOut: onPressOut }));
        react_native_testing_library_1.fireEvent(touchables.findInputTouchable(component), 'pressOut');
        expect(onPressOut).toBeCalled();
    });
    it('should show startDate of the selected range on load provided by range prop', () => {
        const date = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef, range: {
                startDate: date,
                endDate: new Date(2021, 3, 1),
            } }));
        componentRef.current.show();
        // @ts-ignore: private calendarRef
        const calendarState = componentRef.current.calendarRef.current.state;
        expect(calendarState.visibleDate.getFullYear()).toEqual(date.getFullYear());
        expect(calendarState.visibleDate.getMonth()).toEqual(date.getMonth());
    });
    it('should show the specific date on load provided by initialVisibleDate prop', () => {
        const initialDate = new Date(2021, 2, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef, initialVisibleDate: initialDate }));
        componentRef.current.show();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(initialDate.getFullYear());
        expect(visibleDate.getMonth()).toEqual(initialDate.getMonth());
    });
    it('should scroll to current month when scrollToToday called', () => {
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef, initialVisibleDate: new Date(2021, 2, 1) }));
        componentRef.current.show();
        componentRef.current.scrollToToday();
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(today.getFullYear());
        expect(visibleDate.getMonth()).toEqual(today.getMonth());
    });
    it('should scroll to the specific date when scrollToDate called', () => {
        const dateToScroll = new Date(2020, 1, 1);
        const componentRef = react_1.default.createRef();
        react_native_testing_library_1.render(react_1.default.createElement(TestRangeDatepicker, { ref: componentRef, initialVisibleDate: new Date(2021, 2, 1) }));
        componentRef.current.show();
        componentRef.current.scrollToDate(dateToScroll);
        // @ts-ignore: private calendarRef
        const visibleDate = componentRef.current.calendarRef.current.state.visibleDate;
        expect(visibleDate.getFullYear()).toEqual(dateToScroll.getFullYear());
        expect(visibleDate.getMonth()).toEqual(dateToScroll.getMonth());
    });
});
//# sourceMappingURL=rangeDatepicker.spec.js.map