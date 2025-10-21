import { Page } from "@playwright/test";
import { FormsLayoutPage } from '../page-objects/formsLayoutPage';
import { NavigationPage } from '../page-objects/navigationPage';
import { DatapickerPage } from '../page-objects/dataPickerPage'

export class PageManager {
    private readonly page: Page
    private readonly navigationPage: NavigationPage
    private readonly formsLayoutPage: FormsLayoutPage
    private readonly dataPickerPage: DatapickerPage

    constructor(page: Page) {
        this.page = page
        this.navigationPage = new NavigationPage(this.page)
        this.formsLayoutPage = new FormsLayoutPage(this.page)
        this.dataPickerPage = new DatapickerPage(this.page)
    }

    navigateTo(){
        return this.navigationPage
    }

    onFormLayoutPage(){
        return this.formsLayoutPage
    }

    onDataPickerPage(){
        return this.dataPickerPage
    }
}