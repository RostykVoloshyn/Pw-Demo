import { expect, test } from '@playwright/test'


test('Input fileds', async ({ page }, testInfo) => {
    await page.goto('/');
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }
    await page.getByText('Forms').click();
    await page.getByTitle('Form Layouts').click();
    if (testInfo.project.name == 'mobile') {
        await page.locator('.sidebar-toggle').click()
    }

    const usingTheGrideEmailField = page.locator('#inputEmail1')
    await usingTheGrideEmailField.fill('test@test.com')
    await usingTheGrideEmailField.clear()
    await usingTheGrideEmailField.pressSequentially('test@test.com')


    //generic assertion
    const inputValue = await usingTheGrideEmailField.inputValue()
    expect(inputValue).toEqual('test@test.com')

    //locator assertion
    await expect(usingTheGrideEmailField).toHaveValue('test@test.com')

})