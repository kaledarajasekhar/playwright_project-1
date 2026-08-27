import { test as base } from '@playwright/test';
import { POManager } from '../pageobjects/POManager.js';

export const test = base.extend({

    poManager: async ({ page}, use ) => {

        const pomanager = new POManager(page);
        const homePage = pomanager.getHomePage();
        await homePage.navigateTo('https://demowebshop.tricentis.com/');
        await homePage.waitForPageLoad();
        await use(pomanager);
    }
});
