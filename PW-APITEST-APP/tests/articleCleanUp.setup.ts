import { test as setup,expect } from '@playwright/test'


setup('delete article', async ({ request }) => {
    const deleteArticle = await request.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`)
    expect(deleteArticle.status()).toEqual(204)



})