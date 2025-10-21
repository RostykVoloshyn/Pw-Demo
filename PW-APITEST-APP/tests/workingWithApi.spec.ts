import { test, expect } from '@playwright/test'
import tags from '../test-data/tags.json'
import { request } from 'http';


test.beforeEach(async ({ page }) => {
    await page.route('*/**/api/tags', async route => {
        await route.fulfill({
            body: JSON.stringify(tags)
        })

    })

    await page.goto('https://conduit.bondaracademy.com')
});


test('Navigate to the site', async ({ page }) => {

    await page.route('*/**/api/articles?limit=10&offset=0', async route => {
        const responce = await route.fetch()
        const responceBody = await responce.json()
        responceBody.articles[0].title = 'Discover. - Mock title'
        responceBody.articles[0].description = 'Unique plac. - Mock description'
        await route.fulfill({
            body: JSON.stringify(responceBody)
        })
    })
    //await page.reload()

    await expect(page.locator('.navbar-brand', { hasText: 'conduit' })).toHaveText('conduit')
    await expect(page.locator('app-article-list h1').nth(0)).toHaveText('Discover. - Mock title')
    await expect(page.locator('app-article-list p').nth(0)).toHaveText('Unique plac. - Mock description')

})

test('Delete article', async ({ page, request }) => {
    const responceArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            'article': { "title": "test3 ", "description": "test 3", "body": "test 3", "tagList": [] }

        }
    })


    expect(responceArticle.status()).toEqual(201)
    const createdArticle = page.locator('app-article-list h1', { hasText: 'test3 ' })
    //page.reload()

    await expect(createdArticle).toHaveText('test3')
    await createdArticle.click()
    await page.getByRole('button', { name: ' Delete Article ' }).first().click()
    await expect(page.locator('app-article-list h1').first()).not.toContainText('test 3')



})

test('create article', async ({ page, request }) => {

    await page.locator('.nav-item .nav-link', { hasText: 'New Article' }).click()
    await page.getByPlaceholder('Article Title').fill('Playwright is amazing')
    await page.getByPlaceholder("What's this article about?").fill('About the playwright')
    await page.getByPlaceholder("Write your article (in markdown)").fill('Playwright is the best for automation testing')
    await page.getByRole('button', { name: " Publish Article " }).click()
    const articleResponce = await page.waitForResponse('https://conduit-api.bondaracademy.com/api/articles/')
    const articleResponceBody = await articleResponce.json()
    const articleSlug = articleResponceBody.article.slug

    await expect(page.locator('.container  h1')).toContainText('Playwright is amazing')
    await page.locator('.nav-item .nav-link', { hasText: 'Home' }).click()
    await expect(page.locator('app-article-list h1').first()).toContainText('Playwright is amazing')


    const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${articleSlug}`)

    expect(deleteArticle.status()).toEqual(204)

    page.reload()


    await expect(page.locator('app-article-list h1').first()).not.toContainText('Playwright is amazing')



})