"use strict";
/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const rangeDate_service_1 = require("./rangeDate.service");
const nativeDate_service_1 = require("./nativeDate.service");
describe('@range service checks', () => {
    let rangeService;
    const initialRange = {
        startDate: null,
        endDate: null,
    };
    beforeEach(() => {
        rangeService = new rangeDate_service_1.RangeDateService(new nativeDate_service_1.NativeDateService());
    });
    it('* should create range without end date', () => {
        const startDate = new Date(2019, 8, 12);
        const range = rangeService.createRange(initialRange, startDate);
        expect(range).toStrictEqual({ startDate, endDate: null });
    });
    it('* should create range with end date after select', () => {
        const startDate = new Date(2019, 8, 12);
        const endDate = new Date(2019, 8, 24);
        let range = rangeService.createRange(initialRange, startDate);
        range = rangeService.createRange(range, endDate);
        expect(range).toStrictEqual({ startDate, endDate });
    });
    it('* should create range with same start and end dates after select', () => {
        const startDate = new Date(2019, 8, 12);
        const endDate = new Date(2019, 8, 12);
        let range = rangeService.createRange(initialRange, startDate);
        range = rangeService.createRange(range, endDate);
        expect(range).toStrictEqual({ startDate, endDate });
    });
    it('* should create range with start date after re-select', () => {
        const startDate = new Date(2019, 8, 12);
        const endDate = new Date(2019, 8, 24);
        const updatedStartDate = new Date(2019, 8, 19);
        let range = rangeService.createRange(initialRange, startDate);
        range = rangeService.createRange(range, endDate);
        range = rangeService.createRange(range, updatedStartDate);
        expect(range).toStrictEqual({ startDate: updatedStartDate, endDate: null });
    });
    it('* should create range with start and end date after re-select', () => {
        const startDate = new Date(2019, 8, 12);
        const endDate = new Date(2019, 8, 13);
        const updatedStartDate = new Date(2019, 8, 10);
        const updatedEndDate = new Date(2019, 8, 11);
        let range = rangeService.createRange(initialRange, startDate);
        range = rangeService.createRange(range, endDate);
        range = rangeService.createRange(range, updatedStartDate);
        range = rangeService.createRange(range, updatedEndDate);
        expect(range).toStrictEqual({ startDate: updatedStartDate, endDate: updatedEndDate });
    });
});
//# sourceMappingURL=rangeDate.service.spec.js.map