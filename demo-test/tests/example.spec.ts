import { test, expect } from '@playwright/test';

test.skip('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test.skip('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  await expect(page).toHaveURL(/.*intro/);

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test('get Java page', async ({page}) => {
  await page.goto('https://playwright.dev/')
  
  await page.getByRole('button', { name: 'Node.js' }).hover()

  await page.getByLabel('Main', { exact: true }).getByRole('link', { name: 'Java' }).click();

  await expect (page.getByRole('link', { name: 'Playwright logo Playwright' })).toHaveText('Playwright for Java');
})

test.skip('user faicing locator',async({page}) =>{
  await page.getByRole('textbox', { name: 'Email' }).first().click();


});

test('', async ({ page }) => {
  await page.goto('');
  
});


test.skip('user locator', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


test.skip('locator', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});


test.skip('locator4', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});