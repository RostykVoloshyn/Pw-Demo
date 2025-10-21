import { test as base } from '@playwright/test'
import { PageManager } from '../pw-practice-app/page-objects/pageManager'
import { tr } from '@faker-js/faker/.'

export type TestOptions = {
    globalSQaURL: string,
    formsLayoutPage: string,
    PageManager: PageManager
}

export const test = base.extend<TestOptions>({
    globalSQaURL: ['', { option: true }],

    // formsLayoutPage: [async ({ page }, use) => {
    //     await page.goto('/');
    //     await page.getByText('Forms').click()
    //     await page.getByText('Form Layouts').click();
    //     await use('')

    // }, { auto: true }],

    PageManager: async ({page}, use) => {
        const pm = new PageManager(page)
        await use(pm)

    }
})

