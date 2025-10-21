import { test as setup } from '@playwright/test'
import user from '../.auth/auth.json'
import fs from 'fs'

const authFile = '.auth/auth.json'


setup('authentification', async ({ page,request}) => {
    const responce = await request.post('https://conduit-api.bondaracademy.com/api/users/login', {
        data: {
            "user": { "email": "r_test@test.com", "password": "123qwe123" }
        }
    })

    const responceBody = await responce.json()
    const acessToken = responceBody.user.token
    user.origins[0].localStorage[0].value = acessToken
    fs.writeFileSync(authFile, JSON.stringify(user))
    process.env['ACCES_TOKEN'] = acessToken

})

