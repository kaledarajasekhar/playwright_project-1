import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';

test('continue shopping from cart', async ({ poManager , page }) => {

    const homePage = poManager.getHomePage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const productName = 'Build your own cheap computer';
    const data = CheapComputerConfigurations[2];

    await homePage.clickOnComputers();
    await computersPage.clickOnDesktops();
    await desktopPage.clickOnBuildYourOwnCheapComputer();
    await productPage.configureAndAddProductToCart(data);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.clickOnShoppingCart();
    const item = await cartPage.getCartItem(productName);
    await expect(item).toBeVisible();
    await cartPage.clickOnContinueShopping();
    await expect(page).toHaveTitle('Demo Web Shop. Desktops');
    await expect(homePage.shoppingCart).toContainText('(1)');
    await expect(await desktopPage.getAllProductsCount()).toBe(6);
    await homePage.clickOnShoppingCart();
    await cartPage.removeProduct(data);
})