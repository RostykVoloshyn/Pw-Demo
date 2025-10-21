import { test as base, expect, APIRequestContext } from '@playwright/test';
import { RequestBuilder } from '../PW-APITEST-APP/Builder/RequestBuilder'

export type TestOptions = {
    request: APIRequestContext,
    RequestBuilder: RequestBuilder


}

// Extend the base test to add the `request` fixture
export const test = base.extend<TestOptions>({
    request: async ({ playwright }, use) => {
        // Initialize the APIRequestContext
        const request = await playwright.request.newContext({
            baseURL: 'https://jsonplaceholder.typicode.com', // Base URL for the API
        });

        await use(request);
        await request.dispose();
    },

    RequestBuilder: async ({ request }, use) => {
        const builder = new RequestBuilder(request);
        await use(builder)

    },

});



