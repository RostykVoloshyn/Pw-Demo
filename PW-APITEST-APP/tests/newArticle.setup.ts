import { test as setup,expect } from '@playwright/test'


setup('create new articel', async ({ request }) => {
    const responceArticle = await request.post('https://conduit-api.bondaracademy.com/api/articles/', {
            data: {
                'article': { "title": "Likes test article ", "description": "Likes", "body": "Like", "tagList": [] }
            }
        })
    
    expect(responceArticle.status()).toEqual(201)
    const responceBody = await responceArticle.json()
    const slugId = responceBody.article.slug
    process.env['SLUGID'] = slugId


})