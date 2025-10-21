import { request, expect } from '@playwright/test'


async function globalCleanUp() {
    const context = await request.newContext()
    const deleteArticle = await context.delete(`https://conduit-api.bondaracademy.com/api/articles/${process.env.SLUGID}`, {
        headers: {
            Authorization: `Token ${process.env.ACCES_TOKEN}`
        }
    })

    
    expect(deleteArticle.status()).toEqual(204)

}

export default globalCleanUp;