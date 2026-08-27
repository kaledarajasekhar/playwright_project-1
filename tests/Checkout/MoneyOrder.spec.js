import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../TestData/ProductData.js';
import { LoginTestdata } from '../../TestData/LoginData.js';

test('should select Check / Money Order payment method', async ({ poManager, page }) => {
    const homePage = poManager.getHomePage();
    const loginPage = poManager.getLoginPage();
    const computersPage = poManager.getComputersPage();
    const desktopPage = poManager.getDesktopPage();
    const productPage = poManager.getProductPage();
    const cartPage = poManager.getCartPage();
    const checkoutPage = poManager.getCheckoutPage();
    const data = CheapComputerConfigurations[1];
    const loginData = LoginTestdata[0];

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
    await checkoutPage.selectSavedBillingAddressAndContinue();
    await expect(checkoutPage.shippingAddressDropdown).toBeVisible();
    await checkoutPage.clickOnPickUpInStore();
    await checkoutPage.continueShippingAddress();
    await expect(checkoutPage.paymentMethod).toBeVisible();
    await checkoutPage.selectMoneyOrder();
    await expect(checkoutPage.moneyOrder).toBeChecked();
    await checkoutPage.clickOnContinuePayment();
    await expect(checkoutPage.paymentInformation).toBeVisible();
    await expect(checkoutPage.monerOrderMessage).toBeVisible();
    await checkoutPage.clickOnContinuePaymentInfo();
    await checkoutPage.validateConfirmOrder('Build your own cheap computer','Check / Money Order','In-Store Pickup');
    const paymentFee=await checkoutPage.getOrderAdditionalFee();
    await checkoutPage.validateOrderSummary(data.expectedSubtotal,paymentFee);
    await homePage.clickOnShoppingCart();
    await cartPage.removeProduct(data);
})