import { test as base } from './BaseFixture.js';
import { expect } from '@playwright/test';
import { RegisterData } from '../TestData/RegisterData.js';
import { CheapComputerConfigurations } from '../TestData/ProductData.js';
import { BillingAddressData } from '../TestData/BillingData.js';

export const test = base.extend({
    checkoutSetup: async ({ poManager, page }, use) => {
        const homePage = poManager.getHomePage();
        const registerPage = poManager.getRegisterPage();
        const computersPage = poManager.getComputersPage();
        const desktopPage = poManager.getDesktopPage();
        const productPage = poManager.getProductPage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();

        const testUser = new RegisterData();
        const data = CheapComputerConfigurations[1];
        const billingData = BillingAddressData[3];

        // Register a unique account for this test
        await homePage.clickOnRegister();
        await registerPage.register(testUser);

        await expect(registerPage.successMessage)
            .toContainText('Your registration completed');

        await expect(registerPage.registerMail)
            .toContainText(testUser.email);

        await registerPage.clickOnContinue();

        // Add product to a fresh account's cart
        await homePage.clickOnComputers();
        await computersPage.clickOnDesktops();
        await desktopPage.clickOnBuildYourOwnCheapComputer();
        await productPage.configureAndAddProductToCart(data);

        await expect(productPage.cartSuccessMessage)
            .toHaveText('The product has been added to your shopping cart');

        await homePage.clickOnShoppingCart();

        const item = await cartPage.getCartItemByConfiguration(
            `Processor: ${data.processor}`
        );
        await expect(item).toBeVisible();

        await cartPage.clickOnTermsAndConditions();
        await cartPage.clickOnCheckout();

        await expect(page).toHaveTitle('Demo Web Shop. Checkout');

        // A newly registered account may not have a saved billing address
        await checkoutPage.fillBillingAddress(billingData);
        await checkoutPage.continueBillingAddress();

        await expect(checkoutPage.shippingAddressDropdown).toBeVisible();

        await checkoutPage.clickOnPickUpInStore();
        await checkoutPage.continueShippingAddress();

        await expect(checkoutPage.paymentMethod).toBeVisible();

        await use({ poManager, page, data, testUser });
    }
});

export { expect };