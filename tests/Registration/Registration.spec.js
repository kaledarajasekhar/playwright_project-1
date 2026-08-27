import { test } from '../../Fixtures/BaseFixture';
import { expect } from '@playwright/test';
import { RegisterData } from '../../TestData/RegisterData ';

test('register with valid data', async ({ page, poManager }) => {

    const homePage = poManager.getHomePage();
    const regPage = poManager.getRegisterPage();
    const loginPage=poManager.getLoginPage();

    await homePage.clickOnRegister();
    await expect(page).toHaveTitle('Demo Web Shop. Register');
    await regPage.register(RegisterData);
    await expect(regPage.successMessage).toHaveText('Your registration completed');
    await expect(regPage.registerMail).toHaveText(RegisterData.email);
    await regPage.clickOnContinue();
    await homePage.clickOnLogout();
    await homePage.clickOnLogin();
    await loginPage.login(RegisterData);
     await expect(regPage.registerMail).toHaveText(RegisterData.email);
})