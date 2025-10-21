import { expect } from '@playwright/test';
import { faker } from '@faker-js/faker'
import { test } from '../test-options'

// test.beforeEach(async ({ page }) => {

//     await page.goto('/');

// });

test("parametrized methods", async ({ PageManager}) => {
    const randomFullName = faker.person.fullName()
    const randomEmail = `${randomFullName.replace(' ', '')}${faker.number.int(1000)}@test.com`


    //await pm.navigateTo().formLayoutsPage()
    await PageManager.onFormLayoutPage().submitUsingTheGridFormWithCredentialsAndSelectOption(process.env.USERNAME, process.env.PASSWORD, 'Option 1')
    await PageManager.onFormLayoutPage().submitInlineFormWithNicknameEmailAndCheckbox(randomFullName, randomEmail, true)

})



