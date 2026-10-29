import { test, expect } from '../../Fixtures/CheckoutFixture.js';

test('should select Cash On Delivery payment method and verify message', async ({ checkoutSetup }) => {
    const { poManager, data } = checkoutSetup;
    const checkoutPage = poManager.getCheckoutPage();
    const homePage = poManager.getHomePage();
    const cartPage = poManager.getCartPage();

    // Select Cash On Delivery
    await checkoutPage.selectCashOnDelivery();
    await expect(checkoutPage.cashOnDelivery).toBeChecked();

    await checkoutPage.clickOnContinuePayment();

    // Verify payment information
    await expect(checkoutPage.paymentInformation).toBeVisible();
    await expect(checkoutPage.paymentCODMessage).toBeVisible();

    await checkoutPage.clickOnContinuePaymentInfo();

    // Verify order confirmation
    await checkoutPage.validateConfirmOrder(
        'Build your own cheap computer',
        'Cash On Delivery (COD)',
        'In-Store Pickup'
    );

    // Verify order summary
    const paymentFee = await checkoutPage.getOrderAdditionalFee();

    await checkoutPage.validateOrderSummary(data.expectedSubtotal,paymentFee);
    await homePage.clickOnShoppingCart();
    await cartPage.removeProduct(data);
});