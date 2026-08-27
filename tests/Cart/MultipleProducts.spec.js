import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js'



test('validate cart with multiple products', async ({ poManager, page }) => {

    const homePage = poManager.getHomePage();
    const computerPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const products = [CheapComputerConfigurations[0], CheapComputerConfigurations[2]];
    const productName = 'Build your own cheap computer';

    await homePage.clickOnComputers();
    await computerPage.clickOnDesktops();
    await desktopPage.clickOnBuildYourOwnCheapComputer();
    await productPage.configureAndAddProductToCart(products[0]);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.reLoad();
    await productPage.configureAndAddProductToCart(products[1]);
    await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    await homePage.clickOnShoppingCart();
    await expect(cartPage.cartItems).toHaveCount(2);

    for (const data of products) {

        const item = cartPage.getCartItemByConfiguration(`Processor: ${data.processor}`);
        await expect(item).toBeVisible();
        await expect(item.locator('.product-name')).toHaveText(productName);
        const config = item.locator('.attributes');
        await expect(config).toContainText(`Processor: ${data.processor}`);
        await expect(config).toContainText(`RAM: ${data.ram}`);
        await expect(config).toContainText(`HDD: ${data.hdd}`);
        for (const software of data.software) {
            await expect(config).toContainText(`Software: ${software}`);
        }
        await expect(item.locator('.product-unit-price')).toHaveText(data.expectedUnitPrice.toFixed(2));
        await expect(item.locator('.product-subtotal')).toHaveText(data.expectedSubtotal.toFixed(2));
        await expect(item.locator('.qty-input')).toHaveValue(String(data.quantity));
    }

    const expectedCartSubTotal = products.reduce((total, product) => {
        return total + product.expectedSubtotal;
    }, 0);
    const auctualCartSubTotal = await cartPage.getCartSubTotal();

    await expect(expectedCartSubTotal).toBe(auctualCartSubTotal);
    await expect(await cartPage.getShipping()).toBe(0);
    await expect(await cartPage.getTax()).toBe(0);
    await expect(await cartPage.getCartTotal()).toBe(expectedCartSubTotal);
    for(const data of products){
        await cartPage.removeProduct(data);
    }
})