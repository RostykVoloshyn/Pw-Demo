import { test,expect } from '@playwright/test';

test.skip('secnod test', async ({ page }) => {
    test.slow()
    await page.goto('https://weather.com/');
});

test.skip('test', async ({ page }) => {
    await page.goto('https://weather.com/');
});

test.skip('test third', async ({ page }) => {
    await page.goto('https://weather.com/');
});