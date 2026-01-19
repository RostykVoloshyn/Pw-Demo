import { Locator, Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class NavigationPage extends HelperBase{

    readonly formLayoutPageItem: Locator
    readonly dtapickerPageItem: Locator
    readonly toasterPageItem: Locator
    readonly tooltipPageItem: Locator
    readonly smartTableageItem: Locator

    constructor(page: Page) {
        super(page)

    }

    async formLayoutsPage() {
        await this.selectGroupMenurItem('Forms')
        await this.page.getByTitle('Form Layouts').click();
        //await this.waitforNumberOfSeconds(2)


    }
    async dataPickerPage() {
        await this.selectGroupMenurItem('Forms')
        await this.page.getByTitle('Datepicker1').click()

    }

    async toasterPage() {
        await this.selectGroupMenurItem('Modal & Overlays')
        await this.page.getByTitle('Toastr').click();
    }

    async tooltipPage() {
        await this.selectGroupMenurItem('Modal & Overlays')
        await this.page.getByTitle('Tooltip').click();
    }


    async smartTablePage() {
        await this.selectGroupMenurItem('Tables & Dat')
        await this.page.getByTitle('Smart Table').click()
    }

    private async selectGroupMenurItem(groupItemTitle: string) {
        const groupMenueItem = this.page.getByTitle(groupItemTitle)
        const expandedState = await groupMenueItem.getAttribute('aria-expanded')

        if (expandedState == 'false') {
            await groupMenueItem.click()

        }
    }







}