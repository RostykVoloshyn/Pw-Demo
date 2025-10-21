import { test, expect } from '@playwright/test';



test.beforeEach(async ({ page}, testInfo) => {

    await page.goto(process.env.URL)
    await page.locator('#ajaxButton').click();
    //overiding the timeout for the whole test suite
    //testInfo.setTimeout(testInfo.timeout + 2000)

});


test('auto waititng', async ({ page }) => {
    //const sucessText = await page.locator('#content .bg-success').click()
    const sucessTextButton = page.getByText('Data loaded with AJAX get request.')
    //await sucessTextButton.click()

    // textContent will be waiting untill the content will be visible on the page
    // const text = await sucessTextButton.textContent()
    // expect(text).toEqual('Data loaded with AJAX get request.')
    // will not be waiting for all text contents.It is need to be modified as described below
    // await sucessTextButton.waitFor({ state: 'attached' })
    // const text2 = await sucessTextButton.allTextContents()

    //await sucessTextButton.click()

    //expect(text2).toContain('Data loaded with AJAX get request.')

    await expect(sucessTextButton).toHaveText('Data loaded with AJAX get request.',{timeout:20000})

})

test('alternative waits', async ({ page }) => {
    const sucessTextButton = page.locator('.bg-success')

    // ___wait for element
    await page.waitForSelector('.bg-success')

    //___wait for particular responce
    //await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    //___wait for network call to be completed (NOT RECOMENDED)

    //await page.waitForLoadState('networkidle')


});

test('timeouts demonstration', async ({ page }) => {
    test.setTimeout(10000)
    //test.slow()
    const sucessTextButton = page.locator('.bg-success')
    await sucessTextButton.click({timeout:16000})

    page.getByTitle




});
