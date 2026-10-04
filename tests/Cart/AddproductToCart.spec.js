import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js'

test('validate product added in shopping cart', async ({ poManager, page  }) => {

    const homePage = poManager.getHomePage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const productName = 'Build your own cheap computer';
    const data = CheapComputerConfigurations[3];

    await homePage.clickOnComputers();
    await expect(page).toHaveTitle('Demo Web Shop. Computers');
    await computersPage.clickOnDesktops();
    await expect(page).toHaveTitle('Demo Web Shop. Desktops');
    await desktopPage.clickOnBuildYourOwnCheapComputer();
    await expect(productPage.productName).toHaveText(productName);
    await expect(page).toHaveTitle('Demo Web Shop. Build your own cheap computer');
    await productPage.configureAndAddProductToCart(data);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.clickOnShoppingCart();
    await expect(cartPage.cartItems).toHaveCount(1);
    const item = await cartPage.getCartItem(productName);
    await expect(item).toBeVisible();
    await expect(item.locator('.product-name')).toHaveText(productName);
    const configuration = await cartPage.getCartItemConfiguration();
    await expect(configuration).toContainText(`Processor: ${data.processor}`);
    await expect(configuration).toContainText(`RAM: ${data.ram}`);
    await expect(configuration).toContainText(`HDD: ${data.hdd}`);
    for (const software of data.software) {
        await expect(configuration).toContainText(software);
    }
    await expect(await cartPage.getProductPrice()).toBe(data.expectedUnitPrice);
    await expect(await cartPage.getProductTotal()).toBe(data.expectedSubtotal);
    await expect(cartPage.getCartItemQuantity(productName)).toHaveValue(String(data.quantity));
    const oldTotal = await cartPage.getProductTotal(productName);
    await cartPage.setQuantity(productName, 5);
    await cartPage.updateCart();
    await expect(cartPage.getCartItemQuantity()).toHaveValue('5');
    const newTotal = await cartPage.getProductTotal(productName);
    expect(oldTotal).not.toBe(newTotal);
    await cartPage.removeProduct(data);
})
