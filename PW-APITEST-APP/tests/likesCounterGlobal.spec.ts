import { test, expect } from '@playwright/test'


test('Like counter increases', async ({ page, request }) => {

    await page.goto('https://conduit.bondaracademy.com')

    const LikeButton = page.locator('app-article-preview').first().locator('button')
    await expect(LikeButton).toContainText('0')
    await LikeButton.click()
    await expect(LikeButton).toContainText('1')



})