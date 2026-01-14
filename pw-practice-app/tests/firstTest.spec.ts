import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {

    await page.goto('/');
    await page.getByText('Forms').click();
    await page.getByTitle('Form Layouts').click();

});

// test.describe('suite1',  () => {
//     test.beforeEach('', async ({ page }) => {
//       await page.getByText('Charts').click();

//     });
//     test('the first test', async ({ page }) => {
//       await page.getByText('Form Layouts').click();

//     });
//     test('the second test', async ({ page }) => {
//         await page.getByText('Datepicker').click();

//     });

// });

// test.describe('suite2',  () => {
//     test.beforeEach('', async ({ page }) => {
//       await page.getByText('Forms').click();

//     });
//     test('the first test', async ({ page }) => {
//       await page.getByText('Form Layouts').click();

//     });
//     test('the second test', async ({ page }) => {
//         await page.getByText('Datepicker').click();

//     });

// });





test('Locator syntacs rules', async ({ page }) => {

    // by tag name 
    //await page.locator('input').first().click()
    await page.getByRole('textbox', { name: 'Jane Doe' }).click()

    //by id
    await page.locator('#inputEmail1').click()
    await page.getByRole('textbox', { name: 'Email address' }).click()
    await page.locator('.checkbox > .status-basic > .label > .custom-checkbox').click()
    await page.locator('nb-card').filter({ hasText: 'Using the' }).getByRole('button').click()


    //by class value
    page.locator('.shape-rectangle')

    //by attribute
    page.locator('[placeholder="Email"]')
    // by class value (full)
    page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

    //selectors can be combined
    page.locator('input[placeholder="Email"][nbinput]')

    //by xpath (NOT RECOMENDED)
    page.locator('//@id=inputEmail1')

    //by partial match
    page.locator(':text("Using")')

    //by exact text matching
    page.locator(':text-is("Using the Grid")')
});


test('user facing locators', async ({ page }) => {

    await page.getByRole('textbox', { name: 'Email' }).first().click();
    await page.getByRole('button', { name: 'Sign In' }).first().click();
    await page.getByLabel('Email').first().click();
    await page.getByText('Remember me').nth(1).click();
    await page.getByLabel

    await page.getByPlaceholder('Jane Doe').click();
    await page.getByText('Using the Grid').click();
    await page.getByTitle('IoT Dashboard').click();

});


test('locating child elements', async ({ page }) => {
    await page.locator('nb-card nb-radio :text-is("Option 1")').click()
    await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()
    await page.locator('nb-card').getByRole('button', { name: 'Sign In' }).first().click()


});

// #-used for the element id's
// .-used for the classes

test('locating parent elements', async ({ page }) => {
    await page.locator('nb-card', { hasText: "Using the Grid" }).getByRole('textbox', { name: 'Email' }).click()
    await page.locator('nb-card', { has: page.locator('#inputEmail1') }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card').filter({ hasText: 'Basic form' }).getByRole('textbox', { name: 'Email' }).click()

    await page.locator('nb-card').filter({ has: page.locator('.status-danger') }).getByRole('button', { name: 'Submit' }).click()

    await page.locator('nb-card').filter({ has: page.locator('nb-checkbox') }).getByRole('button', { name: 'Sign in' }).click()

});

test('Reusing the locators', async ({ page }) => {

    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    const emailFiled = basicForm.getByPlaceholder('Email')

    await emailFiled.fill('test@test.com')
    await basicForm.getByPlaceholder('Password').fill('123qwe123')
    await basicForm.getByText('Check me out').click()
    await basicForm.getByRole('button', { name: 'Submit' }).click()

    await expect(emailFiled).toHaveValue('test@test.com')


})

test('extracting values', async ({ page }) => {
    //single test value
    const basicForm = page.locator('nb-card', { hasText: "Basic form" })
    const buttonText = await basicForm.locator('button').textContent()
    await expect(buttonText).toEqual('Submit')

    const FormWithoutLabel = page.locator('nb-card', { hasText: "Form without labels" })
    const Recipients = await FormWithoutLabel.getByPlaceholder("Recipients")
    await Recipients.fill('test1')
    const Subject = await FormWithoutLabel.getByPlaceholder("Subject")
    await Subject.fill('test 2')
    const Send = await FormWithoutLabel.locator("button").click()

    //all text values
    const radioButtonsValues = await page.locator('nb-radio').allTextContents()
    await expect(radioButtonsValues).toContain('Option 1')

    //input values
    const emailFiled = page.locator('#exampleInputEmail1')
    await emailFiled.fill('test@test.com')
    await expect(emailFiled).toHaveValue('test@test.com')

    const emailValue = await emailFiled.inputValue()
    expect(emailValue).toEqual('test@test.com')

    const placeholderValues = await emailFiled.getAttribute('placeholder')
    expect(placeholderValues).toEqual('Email')


})

test('assertiosn', async ({ page }) => {
    const basicFormButton = page.locator('nb-card', { hasText: "Basic form" }).locator('button')

    const value = 5
    expect(value).toEqual(5)
    let basicFormButtonValue = await basicFormButton.textContent()
    expect(basicFormButtonValue).toEqual('Submit')

    //locator assertion
    await expect(basicFormButton).toContainText('Submit')


    //soft assertions
    await expect.soft(basicFormButton).toContainText('Submit')
    await basicFormButton.click()




})

