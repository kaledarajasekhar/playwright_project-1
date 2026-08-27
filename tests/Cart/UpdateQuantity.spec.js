import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';

test('update quantity', async ({ poManager }) => {

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
    await expect(cartPage.getCartItemQuantity(productName)).toHaveValue('1');
    await cartPage.setQuantity(productName,2);
    await cartPage.updateCart();
    await expect(cartPage.getCartItemQuantity(productName)).toHaveValue('2');
    const unitPrice=await cartPage.getProductPrice();
    const productSubTotal=await cartPage.getProductTotal();
    await expect(unitPrice*2).toBe(productSubTotal);
    await expect(await cartPage.getCartSubTotal()).toBe(productSubTotal);
    await expect(await cartPage.getCartTotal()).toBe(productSubTotal);
    await cartPage.removeProduct(data);

})
