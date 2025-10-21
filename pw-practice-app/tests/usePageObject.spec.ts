import { expect } from '@playwright/test';
import { PageManager } from '../page-objects/pageManager';
import { faker } from '@faker-js/faker'
import { test } from '../test-options'




// test.beforeEach(async ({ page }) => {

//     await page.goto('/');

// });


test('Navigate to the form page', async ({ PageManager }) => {
    await PageManager.navigateTo().formLayoutsPage()
    await PageManager.navigateTo().dataPickerPage()
    await PageManager.navigateTo().toasterPage()
    await PageManager.navigateTo().tooltipPage()
    await PageManager.navigateTo().smartTablePage()
})

test('Navigate to the Modal & Overlays page', { tag: ['@smoke', '@regression'] }, async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().toasterPage()
    await pm.navigateTo().tooltipPage()

})


test('Navigate to the Tables & Datapage ', { tag: ['@smoke'] }, async ({ page }) => {
    const pm = new PageManager(page)
    await pm.navigateTo().smartTablePage()

})

test("parametrized methods", async ({ PageManager, page }) => {
    await PageManager.navigateTo().formLayoutsPage()
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`
    const randomPasword = faker.internet.password()


    await PageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await page.screenshot({ path: 'screenshots/formsLayoutPage.png' })
    await PageManager.onFormLayoutPage().submitInlineFormWithNicknameEmailAndCheckbox(randomFullName, randomEmail, true)
    await page.locator('nb-card', { hasText: 'Inline form' }).screenshot({ path: 'screenshots/InlineForm.png' })
    const bufer = await page.screenshot()
    console.log(bufer.toString('base64'))

})

test('datapicker menthods', async ({ PageManager }) => {
    await PageManager.navigateTo().dataPickerPage()
    await PageManager.onDataPickerPage().selectDateInCommonDatapickerfromTooday(8)
    await PageManager.onDataPickerPage().selectDateRangeFromTooday(3, 5)

})

