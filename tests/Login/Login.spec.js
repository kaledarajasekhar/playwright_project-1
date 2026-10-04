import { test } from '../../Fixtures/BaseFixture';
import { LoginTestdata } from '../../TestData/LoginData.js';
import { expect } from '@playwright/test';

for (const data of LoginTestdata) {

    test(` @Regression login with ${data.scenario}`, async ({ page, poManager }) => {

        const homePage = poManager.getHomePage();
        const loginPage = poManager.getLoginPage();

        await homePage.clickOnLogin();
        await loginPage.login(data);

        if (data.expectedResult === 'success') {
            await expect(homePage.registerMail).toHaveText(data.email);
        }
        else if (data.expectedResult === 'error') {
            await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.')
        }
        else if(data.expectedResult==='validation'){
            await expect(loginPage.errorMessage).toContainText('Login was unsuccessful. Please correct the errors and try again.')
        }
    })
}