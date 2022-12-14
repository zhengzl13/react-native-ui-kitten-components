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
const calendar_component_1 = require("../calendar/calendar.component");
/**
 * Date picker provides a simple way to select a date within a picker displayed in modal.
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
 * @property {D} date - Date which is currently selected.
 * Defaults to current date.
 *
 * @property {D} initialVisibleDate - Specific date that should be shown on load.
 * If it is not set, the selected date or today's date will be displayed.
 * Clear initialVisibleDate to stop showing it when the datepicker is opened.
 *
 * @property {(D) => void} onSelect - Called when date cell is pressed.
 *
 * @property {boolean} autoDismiss - Will hide the calendar when date cell is pressed.
 * Defaults to *true*.
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
 * @property {boolean} boundingMonth - Defines if previous and next months should be rendered in the current month view.
 *
 * @property {(D, NamedStyles) => ReactElement} renderDay - Function component
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
 * @property {(date: D) => boolean} filter - A function to determine whether particular date cells should be disabled.
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
 * @property {ReactText | ReactElement | (TextProps) => ReactElement} caption - Function component to render below Input view.
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
 * @overview-example DatepickerSimpleUsage
 * Both range and date pickers support all parameters as calendar, so, check Calendar API for additional info.
 *
 * @overview-example DatepickerAccessories
 * Pickers may contain labels, captions and inner views by configuring `accessoryLeft` or `accessoryRight` properties.
 * Within Eva, Datepicker accessories are expected to be images or [svg icons](guides/icon-packages).
 *
 * @overview-example DatepickerInitialVisibleDate
 * Calendar can show specified date on render.
 * Also, it is possible to use scrollToToday and scrollToDate to show specific dates.
 *
 * @overview-example DatepickerFilters
 * Picker may accept minimal and maximum dates, filter functions, and `boundingMonth` property,
 * which disables displaying previous month dates at the current date view.
 *
 * @overview-example DatepickerLocaleSettings
 * Also, it is possible to setup locale by configuring Date Service.
 *
 * @overview-example DatepickerStatus
 * Datepicker may be marked with `status` property, which is useful within forms validation.
 * An extra status is `control`, which is designed to be used on high-contrast backgrounds.
 *
 * @overview-example DatepickerSize
 * To resize Datepicker, a `size` property may be used.
 *
 * @overview-example DatepickerMoment
 * Datepicker is able to work with Moment, by configuring date service.
 * In order to use Moment, `@ui-kitten/moment` package is required.
 *
 * @overview-example DatepickerCustomDay
 * To render custom cells, `renderDay`, `renderMonth` and `renderYear` properties may be used.
 *
 * @overview-example DatepickerStyling
 * Datepicker and it's inner views can be styled by passing them as function components.
 * ```
 * import { Datepicker, Text } '@ui-kitten/components';
 *
 * <Datepicker
 *   controlStyle={{ ... }}
 *   label={evaProps => <Text {...evaProps}>Label</Text>}
 *   caption={evaProps => <Text {...evaProps}>Caption</Text>}
 * />
 * ```
 *
 * @overview-example DatepickerTheming
 * In most cases this is redundant, if [custom theme is configured](guides/branding).
 */
let Datepicker = class Datepicker extends baseDatepicker_component_1.BaseDatepickerComponent {
    constructor(props) {
        super(props);
        this.clear = () => {
            if (this.props.onSelect) {
                this.props.onSelect(null);
            }
        };
        this.onSelect = (date) => {
            this.props.onSelect && this.props.onSelect(date);
            this.props.autoDismiss && this.blur();
        };
        this.clear = this.clear.bind(this);
    }
    get calendarProps() {
        return {
            min: this.props.min,
            max: this.props.max,
            date: this.props.date,
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
        if (this.props.date) {
            return this.props.dateService.format(this.props.date, null);
        }
        else {
            return this.props.placeholder;
        }
    }
    renderCalendar() {
        return (react_1.default.createElement(calendar_component_1.Calendar, Object.assign({}, this.calendarProps, { ref: this.calendarRef, onSelect: this.onSelect })));
    }
};
Datepicker.defaultProps = {
    ...baseDatepicker_component_1.BaseDatepickerComponent.defaultProps,
    autoDismiss: true,
};
Datepicker = __decorate([
    theme_1.styled('Datepicker')
], Datepicker);
exports.Datepicker = Datepicker;
//# sourceMappingURL=datepicker.component.js.map