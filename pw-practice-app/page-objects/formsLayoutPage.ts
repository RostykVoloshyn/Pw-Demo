import { Page } from '@playwright/test'
import { HelperBase } from './helperBase'

export class FormsLayoutPage extends HelperBase {


    constructor(page: Page) {
        super(page)
    }

    async submitUsingTheGridFormWithCredentialsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', { hasText: 'Using the Grid' })
        await usingTheGridForm.locator('#inputEmail1').fill(email)
        //await emailFiled.clear()
        //await emailFiled.fill(email)
        await usingTheGridForm.locator('#inputPassword2').fill(password)
        //await passwordField.clear()
        //await passwordField.fill(password)
        await  usingTheGridForm.getByRole('radio', { name: optionText }).check({ force: true })
        await usingTheGridForm.getByRole('button', { name: "Sign in" }).click()


    }

    /**
     * This method fill out the form with user details
     * @param nickname  - should be first nad last name
     * @param email  - should be a valid email adress
     * @param remamberMe  - true or false if user session to be safed
     */

    async submitInlineFormWithNicknameEmailAndCheckbox(nickname: string, email: string, remamberMe: boolean) {
        const usingTheInlineForm = this.page.locator('nb-card', { hasText: 'Inline form' })
        await usingTheInlineForm.getByPlaceholder('Jane Doe').fill(nickname)
        await usingTheInlineForm.getByPlaceholder('Email').fill(email)

        if (remamberMe == true) {
            await usingTheInlineForm.getByRole('checkbox', { name: "" }).check({ force: true })
        }

        await usingTheInlineForm.getByRole('button', { name: 'Submit' }).click()

    }

}