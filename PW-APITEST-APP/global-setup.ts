import { request, expect } from '@playwright/test'
import user from '../PW-APITEST-APP/.auth/auth.json'
import fs from 'fs'


async function globalSetup() {
    const authFile = '.auth/auth.json'
    const context = await request.newContext()

    const responceToken = await context.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": { "email": "r_test@test.com", "password": "123qwe123" }
        }
    })

    const responceBody = await responceToken.json()
    const acessToken = responceBody.user.token
    user.origins[0].localStorage[0].value = acessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCES_TOKEN'] = acessToken


    const responceArticle = await context.post('https://conduit-api.bondaracademy.com/api/articles/', {
        data: {
            'article': { "title": "Global Likes test article ", "description": "Likes", "body": "Like", "tagList": [] }
        },
        headers:{
            Authorization:`Token ${process.env.ACCES_TOKEN}`
        }
    })

    expect(responceArticle.status()).toEqual(201)
    const responce= await responceArticle.json()
    const slugId = responce.article.slug
    process.env['SLUGID'] = slugId

}

export default globalSetup;
