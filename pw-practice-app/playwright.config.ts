import { fa } from '@faker-js/faker/.';
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';
import { TestOptions } from './test-options';
//import 'dotenv/config'; 

//require('dotenv').config();
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig<TestOptions>({
  //timeout: 10000,
  globalTimeout: 90000,
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

   webServer: {
    command: 'npm start',
    url: 'http://localhost:4200',
    timeout: 120 * 1000,
    reuseExistingServer: false,
  },
  reporter: [
    ["html"], 
    ["allure-playwright",{
      resultsDir: "allure-results",
        detail: true,
        suiteTitle: false,
    }]
],
  use: {
    globalSQaURL: 'https://www.globalsqa.com/demo-site/draganddrop/',
    uiPlayGround: 'http://uitestingplayground.com/ajax',
    baseURL: process.env.DEV === '1' ? 'http://localhost:4200/'
          : process.env.STAGE === '2' ? 'http://localhost:4202/'
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
        baseURL: 'http://localhost:42000/',
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
        ...devices['Desktop Firefox'],
        video: {
          mode: 'off',
          size: { width: 1920, height: 1080 }
        },
      },
    },
    // {
    //   name: 'PageObjcetFullScreen',
    //   testMatch: 'usePageObject.spec.ts',
    //   use: {
    //     viewport: { width: 1920, height: 1080 }
    //   }
    // },
    // {
    //   name:'mobile',
    //   testMatch:'testMobile.spec.ts',
    //   use:{
    //     ...devices['Pixel 7']
    //   }
    // }
  ],

});
