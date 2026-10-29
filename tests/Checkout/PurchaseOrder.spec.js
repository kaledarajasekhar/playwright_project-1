// import { test } from '../../Fixtures/BaseFixture.js';
// import { expect } from '@playwright/test';
// import { CheapComputerConfigurations } from '../../TestData/ProductData.js';
// import { LoginTestdata } from '../../TestData/LoginData.js';

// test('should select Check / Money Order payment method', async ({ poManager, page }) => {
//     const homePage = poManager.getHomePage();
//     const loginPage = poManager.getLoginPage();
//     const computersPage = poManager.getComputersPage();
//     const desktopPage = poManager.getDesktopPage();
//     const productPage = poManager.getProductPage();
//     const cartPage = poManager.getCartPage();
//     const checkoutPage = poManager.getCheckoutPage();
//     const data = CheapComputerConfigurations[1];
//     const loginData = LoginTestdata[0];

//     await homePage.clickOnLogin();
//     await loginPage.login(loginData);
//     await homePage.clickOnComputers();
//     await computersPage.clickOnDesktops();
//     await desktopPage.clickOnBuildYourOwnCheapComputer();
//     await productPage.configureAndAddProductToCart(data);
//     await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
//     await homePage.clickOnShoppingCart();
//     const item = await cartPage.getCartItemByConfiguration(`Processor: ${data.processor}`);
//     await expect(item).toBeVisible();
//     await cartPage.clickOnTermsAndConditions();
//     await cartPage.clickOnCheckout();
//     await expect(page).toHaveTitle('Demo Web Shop. Checkout');
//     await checkoutPage.selectSavedBillingAddressAndContinue();
//     await expect(checkoutPage.shippingAddressDropdown).toBeVisible();
//     await checkoutPage.clickOnPickUpInStore();
//     await checkoutPage.continueShippingAddress();
//     await expect(checkoutPage.paymentMethod).toBeVisible();
//     await checkoutPage.selectPurchaseOrder();
//     await expect(checkoutPage.purchaseOrder).toBeChecked();
//     await checkoutPage.clickOnContinuePayment();
//     await expect(checkoutPage.paymentInformation).toBeVisible();
//     await expect(checkoutPage.poNumber).toBeVisible();
//     await checkoutPage.fillPurchaseOrderDetails('PO-2026-001');
//     await checkoutPage.clickOnContinuePaymentInfo();
//     await checkoutPage.validateConfirmOrder('Build your own cheap computer','Purchase Order','In-Store Pickup');
//     await checkoutPage.validateOrderSummary(data.expectedSubtotal);
//     await homePage.clickOnShoppingCart();
//     await cartPage.removeProduct(data);
// })

import { test, expect } from '../../Fixtures/CheckoutFixture.js';

test('should select Purchase Order payment method',
    async ({ checkoutSetup }) => {

        const { poManager, data } = checkoutSetup;

        const homePage = poManager.getHomePage();
        const cartPage = poManager.getCartPage();
        const checkoutPage = poManager.getCheckoutPage();

        // Select Purchase Order
        await checkoutPage.selectPurchaseOrder();
        await expect(checkoutPage.purchaseOrder).toBeChecked();

        await checkoutPage.clickOnContinuePayment();

        // Verify payment information
        await expect(checkoutPage.paymentInformation).toBeVisible();
        await expect(checkoutPage.poNumber).toBeVisible();

        await checkoutPage.fillPurchaseOrderDetails('PO-2026-001');
        await checkoutPage.clickOnContinuePaymentInfo();

        // Verify order confirmation
        await checkoutPage.validateConfirmOrder(
            'Build your own cheap computer',
            'Purchase Order',
            'In-Store Pickup'
        );

        // Verify order summary
        await checkoutPage.validateOrderSummary(data.expectedSubtotal);

        // Clean up the cart if the product remains.
        await homePage.clickOnShoppingCart();

        const item = await cartPage.getCartItemByConfiguration(
            `Processor: ${data.processor}`
        );

        if (await item.isVisible()) {
            await cartPage.removeProduct(data);
        }
    }
);