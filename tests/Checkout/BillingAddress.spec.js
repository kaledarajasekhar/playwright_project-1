import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';
import { BillingAddressData } from '../../TestData/BillingData.js';

test('fill billing address and continue', async ({ poManager, page }) => {

    const homePage = poManager.getHomePage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();

    const data = CheapComputerConfigurations[1];
    const billingData = BillingAddressData[3];

    await homePage.clickOnComputers();
    await computersPage.clickOnDesktops();
    await desktopPage.clickOnBuildYourOwnCheapComputer();

    await productPage.configureAndAddProductToCart(data);

    await expect(productPage.cartSuccessMessage)
        .toHaveText('The product has been added to your shopping cart');

    await homePage.clickOnShoppingCart();

    const item = cartPage.getCartItemByConfigurationUsingData(data);
    await expect(item).toBeVisible();

    await cartPage.clickOnTermsAndConditions();
    await cartPage.clickOnCheckout();

    await expect(page).toHaveTitle('Demo Web Shop. Checkout');

    await checkoutPage.selectNewAddressIfRequired();
    await checkoutPage.fillBillingAddress(billingData);
    await checkoutPage.continueBillingAddress();
});