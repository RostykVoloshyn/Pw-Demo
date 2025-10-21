import { SelectMultipleControlValueAccessor } from '@angular/forms';
import { expect, test } from '@playwright/test'

//test.describe.configure({ mode: 'parallel' })

test.beforeEach(async ({ page }) => {
    await page.goto('/');

})

test.describe.only('Form layouts page', () => {

    test.describe.configure({ retries: 2 })

    test.beforeEach(async ({ page }) => {
        await page.getByText('Forms').click();
        await page.getByTitle('Form Layouts').click();

    })

    test('Input fileds', async ({ page }, testInfo) => {
        if (testInfo.retry) {
            // do something
        }

        const usingTheGrideEmailField = page.locator('#inputEmail1')
        await usingTheGrideEmailField.fill('test@test.com')
        await usingTheGrideEmailField.clear()
        await usingTheGrideEmailField.pressSequentially('test@test.com')


        //generic assertion
        const inputValue = await usingTheGrideEmailField.inputValue()
        expect(inputValue).toEqual('test@test.com')

        //locator assertion
        await expect(usingTheGrideEmailField).toHaveValue('test@test1.com')

    })

    test('Radio buttons', async ({ page }) => {
        // const usingTheGrideRadio1 = page.getByText('Option 1')
        // await usingTheGrideRadio1.click()


        const usingTheGridForm = page.locator('nb-card', { hasText: 'Using the Grid' })
        //await usingTheGridForm.getByLabel('Option 1').check({force:true})
        await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).check({ force: true })
        const radioStatus = usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()
        expect(radioStatus).toBeTruthy()
        await expect(usingTheGridForm.getByRole('radio', { name: 'Option 1' })).toBeChecked()

        await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).check({ force: true })
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 1' }).isChecked()).toBeFalsy()
        expect(await usingTheGridForm.getByRole('radio', { name: 'Option 2' }).isChecked()).toBeTruthy()





    })

})


test('checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();

    const checkbox = page.getByRole('checkbox', { name: 'Hide on click' })
    await checkbox.uncheck({ force: true })

    //expect(await page.getByRole('checkbox',{name:'Hide on click'}).isChecked()).toBeFalsy()


})


test('multiply checkboxes', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByTitle('Toastr').click();

    const allBoxes = page.getByRole('checkbox')

    for (const box of await allBoxes.all()) {
        await box.check({ force: true })
        expect(box.isChecked()).toBeTruthy()

    }

    //expect(await page.getByRole('checkbox',{name:'Hide on click'}).isChecked()).toBeFalsy()


})

test('Lists and Dropdowns', async ({ page }) => {

    const dropDownMenue = page.locator('ngx-header nb-select')
    await dropDownMenue.click()

    page.getByRole('list') //when the list has a  UL tag
    page.getByRole('listitem') //when the list has LI tag

    const optionList = page.locator('nb-option-list nb-option')
    await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"])
    await optionList.filter({ hasText: "Cosmic" }).click()

    const header = page.locator('nb-layout-header')
    await expect(header).toHaveCSS('background-color', 'rgb(50, 50, 89)')

    const colors = {
        "Light": "rgb(255, 255, 255)",
        "Dark": "rgb(34, 43, 69)",
        "Cosmic": "rgb(50, 50, 89)",
        "Corporate": "rgb(255, 255, 255)",
    }

    await dropDownMenue.click()
    for (const color in colors) {
        await optionList.filter({ hasText: color }).click()
        await expect(header).toHaveCSS('background-color', colors[color])
        if (color != 'Corporate') {
            await dropDownMenue.click()
        }



    }


})


test('Tooltips', async ({ page }) => {
    await page.getByText('Modal & Overlays').click();
    await page.getByTitle('Tooltip').click();

    const topTooltipCard = page.locator('nb-card', { hasText: "Tooltip Placements" })
    await topTooltipCard.getByRole('button', { name: "Top" }).hover()

    page.getByRole('tooltip')
    const tooltip = page.locator('nb-tooltip')
    await (expect(tooltip).toHaveText('This is a tooltip'))

    //page.getByRole('tooltip') // works only if the web element hav a created role tooltip



})


test.describe('Smart table Page', () => {
    test.beforeEach(async ({ page }) => {
        await page.getByText('Tables & Data').click();
        await page.getByTitle('Smart Table').click()

    })

    test('Dialog box', async ({ page }) => {

        page.on('dialog', dialog => {
            expect(dialog.message()).toEqual('Are you sure you want to delete?')
            dialog.accept()
        })


        await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-trash').click()
        await expect(page.locator('table tr').first()).not.toHaveText('mdo@gmail.com')


    })


    test('Web tables', async ({ page }) => {


        // await page.getByRole('table').locator('tr', { hasText: "mdo@gmail.com" }).locator('.nb-edit').click()
        // const Age = page.getByRole('table').locator('tr').getByPlaceholder('Age').last()
        // await Age.clear()
        // await Age.fill('45')


        //get the row by any test in this row

        const targetRow = page.getByRole('row', { name: 'twitter@outlook.com' })
        await targetRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('Age').clear()
        await page.locator('input-editor').getByPlaceholder('Age').fill('45')
        await page.locator('.nb-checkmark').click()


        //get the row based on the value in the specific coumn


        await page.locator('.ng-star-inserted a', { hasText: "2" }).click()
        const secondTargetRow = page.getByRole('row', { name: "11" }).filter({ has: page.locator('td').nth(1).getByText('11') })
        await secondTargetRow.locator('.nb-edit').click()
        await page.locator('input-editor').getByPlaceholder('E-mail').clear()
        await page.locator('input-editor').getByPlaceholder('E-mail').fill('test@test.com')
        await page.locator('.nb-checkmark').click()
        await expect(secondTargetRow.locator('td').nth(5)).toHaveText('test@test.com')

        //filtering the users who has an age of 20 yeras old

        const ages = ['20', '30', '40', '200']


        for (let age of ages) {
            await page.locator('tr th').getByPlaceholder('Age').clear()
            await page.locator('tr th').getByPlaceholder('Age').fill(age)
            await page.waitForTimeout(500)
            const filteredUsers = page.locator('tbody tr')

            for (let user of await filteredUsers.all()) {
                const cell = await user.locator('td').last().textContent()
                if (age == '200') {
                    await expect(page.getByRole('cell', { name: 'No data found' })).toContainText('No data found')

                }
                else {
                    expect(cell).toEqual(age)
                }

            }


        }


    })



})



test('Data picker', async ({ page }) => {
    await page.getByText('Forms').click();
    await page.getByTitle('Datepicker').click()

    let date = new Date()
    date.setDate(date.getDate() + 30)

    const targetDat = date.getDate().toString()
    const expectedMonth = date.toLocaleString('En-US', { month: 'short' })
    const expectedMonthlLong = date.toLocaleString('En-US', { month: 'long' })
    const expectedYear = date.getFullYear()
    const dataToAssert = `${expectedMonth} ${targetDat}, ${expectedYear}`

    await page.getByPlaceholder('Form Picker').click()


    let monthYearSelector = await page.locator('nb-calendar-view-mode').textContent()
    const expectedMonthYearSelector = `${expectedMonthlLong} ${expectedYear}`


    while (!monthYearSelector.includes(expectedMonthYearSelector)) {
        await page.locator('nb-calendar-pageable-navigation [data-name="chevron-right"]').click()
        monthYearSelector = await page.locator('nb-calendar-view-mode').textContent()

    }

    await page.locator('[class ="day-cell ng-star-inserted"]').getByText(targetDat, { exact: true }).click()
    await expect(page.getByPlaceholder('Form Picker')).toHaveValue(dataToAssert)


})



let min = 8.5;
let max = 280.5;

let rnNumber = (Math.random() * (max - min) + min).toFixed(3)

test('Slider', async ({ page }) => {
    //updaunt the atribute

    // let tempGauge = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger circle')
    // await tempGauge.evaluate(node => {
    //     node.setAttribute('cx', '232.354')
    //     node.setAttribute('cy', '232.354')
    // })
    // await tempGauge.click()

    //mouse movment
    let tempBox = page.locator('[tabtitle="Temperature"] ngx-temperature-dragger')
    await tempBox.scrollIntoViewIfNeeded()

    const box = await tempBox.boundingBox()

    const x = box.x + box.width / 2
    const y = box.y + box.height / 2
    await page.mouse.move(x, y)
    await page.mouse.down()
    await page.mouse.move(x - Math.floor(Math.random() * 100), y)
    await page.mouse.move(x - Math.floor(Math.random() * 100), y + Math.floor(Math.random() * 100))
    await page.mouse.up()



})