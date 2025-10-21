import { fa } from '@faker-js/faker/.';
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import { TestOptions } from './test-options';


//require('dotenv').config()

import 'dotenv/config'; 

export default defineConfig<TestOptions>({
  //timeout: 10000,
  globalTimeout: 60000,
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 1,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  use: {
    globalSQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    baseURL: process.env.DEV === '1' 
    ? 'http://localhost:4200/'
    : process.env.STAGE === '2' 
    ? 'http://localhost:4202/'
    : 'http://localhost:4200/',
    trace: 'on-first-retry',
    video: {
      mode: 'off',
      size: { width: 1920, height: 1080 }
    },
    screenshot: 'on-first-failure',
    navigationTimeout: 7000,
    actionTimeout: 5000,
    headless: true,
  },



  projects: [
    {
      name: 'dev',
      use: {
        ...devices['Desktop Chrome'],
        baseURL: 'http://localhost:42001/',
      },

    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        video: {
          mode: 'off',
          size: { width: 1920, height: 1080 }
        },
      },


    },

    {
      name: 'firefox',
      use: {
        browserName: 'firefox'
      },
    },
    {
      name: 'PageObjcetFullScreen',
      testMatch: 'usePageObject.spec.ts',
      use: {
        viewport: { width: 1920, height: 1080 }
      }
    },
    {
      name:'mobile',
      testMatch:'testMobile.spec.ts',
      use:{
        ...devices['Pixel 7']
      }
    }
  ],

});
