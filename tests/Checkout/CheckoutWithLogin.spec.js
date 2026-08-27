import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';
import {LoginTestdata} from '../../TestData/LoginData.js';

test('checkout with login ', async ({ poManager, page }) => {

    const homePage = poManager.getHomePage();
    const loginPage=poManager.getLoginPage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const productName = 'Build your own cheap computer';
    const data = CheapComputerConfigurations[3];
    const loginData=LoginTestdata[0];

    await homePage.clickOnLogin();
    await loginPage.login(loginData);
    await homePage.clickOnComputers();
    await computersPage.clickOnDesktops();
    await desktopPage.clickOnBuildYourOwnCheapComputer();
    await productPage.configureAndAddProductToCart(data);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.clickOnShoppingCart();
    const item = await cartPage.getCartItemByConfiguration(`Processor: ${data.processor}`);
    await expect(item).toBeVisible();
    await cartPage.clickOnTermsAndConditions();
    await cartPage.clickOnCheckout();
    await expect(page).toHaveTitle('Demo Web Shop. Checkout');  
    await homePage.clickOnShoppingCart();
    await cartPage.removeProduct(data);  

})