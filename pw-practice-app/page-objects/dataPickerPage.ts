import { Data } from '@angular/router'
import { Page, expect } from '@playwright/test'
import { HelperBase } from './helperBase'

export class DatapickerPage extends HelperBase {


    constructor(page: Page) {
        super(page)


    }

    async selectDateInCommonDatapickerfromTooday(numberOfDaysFromTooday: number) {


        const CalendarInputFiled = this.page.getByPlaceholder('Form Picker')
        await CalendarInputFiled.click()
        const dataToAssert = await this.selectDateInTheCalendar(numberOfDaysFromTooday)
        await expect(this.page.getByPlaceholder('Form Picker')).toHaveValue(dataToAssert)


    }


    async selectDateRangeFromTooday(startDateFromTooday: number, endDateFromTooday: number) {

        const CalendarInputFiled = this.page.getByPlaceholder('Range Picker')
        await CalendarInputFiled.click()
        const dateToAsserStart = await this.selectDateInTheCalendar(startDateFromTooday)
        const dateToAsserEnd = await this.selectDateInTheCalendar(endDateFromTooday)
        await expect(this.page.getByPlaceholder('Range Picker')).toHaveValue(`${dateToAsserStart} - ${dateToAsserEnd}`)


    }

    private async selectDateInTheCalendar(numberOfDaysFromTooday: number) {

        let date = new Date()
        date.setDate(date.getDate() + numberOfDaysFromTooday)

        const targetDat = date.getDate().toString()
        const expectedMonth = date.toLocaleString('En-US', { month: 'short' })
        const expectedMonthlLong = date.toLocaleString('En-US', { month: 'long' })
        const expectedYear = date.getFullYear()
        const dataToAssert = `${expectedMonth} ${targetDat}, ${expectedYear}`


        let monthYearSelector = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthYearSelector = `${expectedMonthlLong} ${expectedYear}`

        while (!monthYearSelector.includes(expectedMonthYearSelector)) {
            await this.page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
            monthYearSelector = await this.page.locator('nb-calendar-view-mode').textContent()

        }

        await this.page.locator('.day-cell.ng-star-inserted:not(.bounding-month)').getByText(targetDat).click()
        return dataToAssert


    }
}