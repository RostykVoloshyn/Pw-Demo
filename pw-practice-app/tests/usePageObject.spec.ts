import { expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { test } from '../test-options'
import * as allure from 'allure-js-commons';




test.beforeEach(async ({ page }) => {
    await allure.suite('Page navigation tests');

    await page.goto('/');

});


test('Navigation to the all pages', async ({ PageManager }) => {
    await allure.step('Navigate to Form Layouts page', async () => {
        await PageManager.navigateTo().formLayoutsPage();
    });
    await allure.step('Navigate to Date Picker page', async () => {
        await PageManager.navigateTo().dataPickerPage();
    });
    await allure.step('Navigate to Toaster page', async () => {
        await PageManager.navigateTo().toasterPage();
    });
    await allure.step('Navigate to Tooltip page', async () => {
        await PageManager.navigateTo().tooltipPage();
    });
    await allure.step('Navigate to Smart Table page', async () => {
        await PageManager.navigateTo().smartTablePage();
    });
})

test('Navigate to the Modal & Overlays page', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const pm = new PageManager(page)
    await allure.step('Navigate to Toaster page', async () => {
        await pm.navigateTo().toasterPage();
    });

    await allure.step('Navigate to Tooltip page', async () => {
        await pm.navigateTo().tooltipPage();
    });

})


test('Navigate to the Tables & Datapage ', { tag: ['@smoke'] }, async ({ page }) => {
    const pm = new PageManager(page)
    await allure.step('Navigate to Smart Table page', async () => {
        await pm.navigateTo().smartTablePage();
    });


})

test("parametrized methods", async ({ PageManager, page }) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    const randomPasword = faker.internet.password()

    await allure.step('Navigate to Form Layouts page', async () => {
        await PageManager.navigateTo().formLayoutsPage();
    });

    await allure.step('Submit Grid form with credentials and option selection', async () => {
        await PageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    });
    //await page.screenshot({ path: 'screenshots/formsLayoutPage.png' })
    await allure.step('Submit Grid form with credentials and option selection', async () => {
        await PageManager.onFormLayoutPage().submitInlineFormWithNicknameEmailAndCheckbox(randomFullName, randomEmail, true)
    });
    //await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/InlineForm.png' })
    //const bufer = await page.screenshot()
    //console.log(bufer.toString('base64'))

})

test('datapicker menthods', async ({ PageManager }) => {
    await allure.step('Navigate to Data Picker page', async () => {
        await PageManager.navigateTo().dataPickerPage();
    });

    await allure.step('Select a date in Common Date Picker from today (+8 days)', async () => {
        await PageManager
            .onDataPickerPage()
            .selectDateInCommonDatapickerfromTooday(8);
    });

    await allure.step('Select a date range from today (+3 to +5 days)', async () => {
        await PageManager
            .onDataPickerPage()
            .selectDateRangeFromTooday(3, 5);
    }
    );

})

