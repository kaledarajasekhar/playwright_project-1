import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';

test('checkout without login redirects to login page', async ({ poManager, page }) => {

    const homePage = poManager.getHomePage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const productName = 'Build your own cheap computer';
    const data = CheapComputerConfigurations[3];

    await homePage.clickOnComputers();
    await computersPage.clickOnDesktops();
    await desktopPage.clickOnBuildYourOwnCheapComputer();
    await productPage.configureAndAddProductToCart(data);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.clickOnShoppingCart();
    const item = await cartPage.getCartItem(productName);
    await expect(item).toBeVisible();
    await cartPage.clickOnTermsAndConditions();
    await cartPage.clickOnCheckout();
    await expect(page).toHaveTitle('Demo Web Shop. Login');
    await homePage.clickOnShoppingCart();
    await cartPage.removeProduct(data);
})