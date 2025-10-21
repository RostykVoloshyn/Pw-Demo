import { expect, APIRequestContext } from '@playwright/test';
import { test } from '../testOptions'

test.describe('API Testing with Builder Pattern', () => {

    test('GET Request using Builder Pattern', async ({RequestBuilder}) => {

        const response = await RequestBuilder
            .setMethod('GET')
            .setUrl('/posts')
            .addQueryParam('userId', '1')
            .send();

        expect(response).toBeTruthy();
        expect(response[0].userId).toBe(1);
    });

    test('POST Request using Builder Pattern', async ({RequestBuilder}) => {

        const response = await RequestBuilder
            .setMethod('POST')
            .setUrl('/posts')
            .addHeader('Content-Type', 'application/json')
            .setPayload({
                title: 'foo',
                body: 'bar',
                userId: 1,
            })
            .send();

        expect(response).toBeTruthy();
        expect(response.title).toBe('foo');
        expect(response.body).toBe('bar');
        expect(response.userId).toBe(1);
    });
});
