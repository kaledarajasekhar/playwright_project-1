import { test } from '../../Fixtures/BaseFixture';
import { expect } from '@playwright/test';
import { RegisterData } from '../../TestData/RegisterData.js';

test(' @Smoke register with valid data', async ({ page, poManager }) => {

    const homePage = poManager.getHomePage();
    const regPage = poManager.getRegisterPage();
    const loginPage = poManager.getLoginPage();
    const registerData = new RegisterData();
    await homePage.clickOnRegister();
    await expect(page).toHaveTitle('Demo Web Shop. Register');
    await regPage.register(registerData);
    await expect(regPage.successMessage).toHaveText('Your registration completed');
    await expect(regPage.registerMail).toHaveText(registerData.email);
    await regPage.clickOnContinue();
    await homePage.clickOnLogout();
    await homePage.clickOnLogin();
    await loginPage.login(registerData);
    await expect(regPage.registerMail).toHaveText(registerData.email);
})