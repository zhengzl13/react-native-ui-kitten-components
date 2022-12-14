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
const theme_1 = require("../../theme");
const baseDatepicker_component_1 = require("./baseDatepicker.component");
const rangeCalendar_component_1 = require("../calendar/rangeCalendar.component");
/**
 * Range date picker provides a simple way to select a date range within a picker displayed in modal.
 *
 * @extends React.Component
 *
 * @method {() => void} show - Sets picker visible.
 *
 * @method {() => void} hide - Sets picker invisible.
 *
 * @method {() => void} focus - Focuses Datepicker and sets it visible.
 *
 * @method {() => void} blur - Removes focus from Datepicker and sets it invisible.
 *
 * @method {() => boolean} isFocused - Returns true if the Datepicker is currently focused and visible.
 *
 * @method {() => void} clear - Removes all text from the Datepicker.
 *
 * @method {() => void} scrollToToday - Show the current date in the picker, the picker should be visible.
 *
 * @method {(date: D) => void} scrollToDate - Show the specific date in the picker, the picker should be visible.
 *
 * @property {CalendarRange<D>} range - Date range which is currently selected.
 * CalendarRange `startDate?: D, endDate?: D` - Object with start and end dates for date range.
 * A range may contain only a startDate or both startDate and endDate properties meaning completeness of picked value.
 *
 * @property {D} initialVisibleDate - Specific date that should be shown on load.
 * If it is not set, the selected date or today's date will be displayed.
 * Clear initialVisibleDate to stop showing it when the datepicker is opened.
 *
 * @property {(CalendarRange) => void} onSelect - Called when day cell is pressed.
 *
 * @property {D} min - Minimal date that is able to be selected.
 *
 * @property {D} max - Maximum date that is able to be selected.
 *
 * @property {DateService<D>} dateService - Date service that is able to work with a date objects.
 * Defaults to Native Date service that works with JS Date.
 * Allows using different types of date like Moment.js or date-fns.
 * Moment.js service can be provided by installing `@ui-kitten/moment` package.
 * date-fns service can be provided by installing `@ui-kitten/date-fns` package.
 *
 * @property {boolean} boundingMonth - Whether previous and next months in the current month view should be rendered.
 *
 * @property {D, NamedStyles) => ReactElement} renderDay - Function component
 * to render instead of default day cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderMonth - Function component
 * to render instead of default month cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {(D, NamedStyles) => ReactElement} renderYear - Function component
 * to render instead of default year cell.
 * Called with a date for this cell and styles provided by Eva.
 *
 * @property {CalendarViewMode} startView - Defines starting view for calendar.
 * Can be `CalendarViewModes.DATE`, `CalendarViewModes.MONTH` or `CalendarViewModes.YEAR`.
 * Defaults to *CalendarViewModes.DATE*.
 *
 * @property {(D, D, CalendarViewMode) => string} title - A function to transform visible date to a string displayed in header for the specific view mode: first date - date picker, second date - year and month picker.
 *
 * @property {(D) => boolean} filter - A function to determine whether particular date cells should be disabled.
 *
 * @property {string} status - Status of the component.
 * Can be `basic`, `primary`, `success`, `info`, `warning`, `danger` or `control`.
 * Defaults to *basic*.
 * Useful for giving user a hint on the input validity.
 * Use *control* status when needed to display within a contrast container.
 *
 * @property {string} size - Size of the component.
 * Can be `small`, `medium` or `large`.
 * Defaults to *medium*.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} placeholder - String, number or a function component
 * to render when input field is empty.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} label - String, number or a function component
 * to render to top of the input field.
 * If it is a function, expected to return a Text.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryLeft - Function component
 * to render to start of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | (ImageProps) => ReactElement} accessoryRight - Function component
 * to render to end of the text.
 * Expected to return an Image.
 *
 * @property {ReactElement | ReactText | (TextProps) => ReactElement} caption - Function component to render below Input view.
 * Expected to return View.
 *
 * @property {() => void} onFocus - Called when picker becomes visible.
 *
 * @property {() => void} onBlur - Called when picker becomes invisible.
 *
 * @property {string | PopoverPlacement} placement - Position of the picker relative to the input field.
 * Can be `left`, `top`, `right`, `bottom`, `left start`, `left end`, `top start`, `top end`, `right start`,
 * `right end`, `bottom start` or `bottom end`.
 * Defaults to *bottom*.
 *
 * @property {StyleProp<ViewStyle>} backdropStyle - Style of backdrop.
 *
 * @property {TouchableOpacityProps} ...TouchableOpacityProps - Any props applied to TouchableOpacity component.
 *
 * @overview-example RangeDatepickerSimpleUsage
 * Ranged picker works with special range object - CalendarRange: `{ startDate: Date, endDate: Date }`.
 * For incomplete ranges, there is only a `startDate` property.
 */
let RangeDatepicker = class RangeDatepicker extends baseDatepicker_component_1.BaseDatepickerComponent {
    constructor(props) {
        super(props);
        this.clear = () => {
            this.props.onSelect && this.props.onSelect({});
        };
        this.clear = this.clear.bind(this);
    }
    get calendarProps() {
        return {
            min: this.props.min,
            max: this.props.max,
            range: this.props.range,
            initialVisibleDate: this.props.initialVisibleDate,
            dateService: this.props.dateService,
            boundingMonth: this.props.boundingMonth,
            startView: this.props.startView,
            filter: this.props.filter,
            title: this.props.title,
            onSelect: this.props.onSelect,
            renderDay: this.props.renderDay,
            renderMonth: this.props.renderMonth,
            renderYear: this.props.renderYear,
            renderFooter: this.props.renderFooter,
        };
    }
    // BaseDatepickerComponent
    getComponentTitle() {
        const { startDate, endDate } = this.props.range;
        if (startDate || endDate) {
            const start = startDate ? this.props.dateService.format(startDate, null) : '';
            const end = endDate ? this.props.dateService.format(endDate, null) : '';
            return `${start} - ${end}`;
        }
        else {
            return this.props.placeholder;
        }
    }
    renderCalendar() {
        return (
        // @ts-ignore
        react_1.default.createElement(rangeCalendar_component_1.RangeCalendar, Object.assign({ ref: this.calendarRef }, this.calendarProps)));
    }
};
RangeDatepicker.styledComponentName = 'Datepicker';
RangeDatepicker = __decorate([
    theme_1.styled('Datepicker')
], RangeDatepicker);
exports.RangeDatepicker = RangeDatepicker;
//# sourceMappingURL=rangeDatepicker.component.js.map