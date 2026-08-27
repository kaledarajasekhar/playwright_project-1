import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CheckoutPage extends BasePage {
    constructor(page) {
        super(page);
        this.billingAddressDropdown = page.getByLabel('Select a billing address from your address book or enter a new address.');
        this.firstName = page.getByLabel('First name:');
        this.lastName = page.getByLabel('Last name:');
        this.email = page.getByLabel('Email:');
        this.company = page.getByLabel('Company:');
        this.country = page.getByLabel('Country:');
        this.city = page.getByLabel('City:');
        this.address1 = page.getByLabel('Address 1:');
        this.address2 = page.getByLabel('Address 2:');
        this.postalCode = page.getByLabel('Zip / postal code:');
        this.phoneNumber = page.getByLabel('Phone number:');
        this.faxNumber = page.getByLabel('Fax number:');
        this.continueBillingButton = page.locator('.button-1.new-address-next-step-button').first();
        this.shippingAddressDropdown = page.getByLabel('Select a shipping address from your address book or enter a new address.');
        this.pickUpInStore = page.getByLabel('In-Store Pickup');
        this.shippingAddressBack = page.locator('[href="#"]').first();
        this.continueShippingAddressButton = page.locator('.button-1.new-address-next-step-button').nth(1);
        this.paymentMethod = page.getByRole('heading', { name: 'Payment method' });
        this.cashOnDelivery = page.getByLabel('Cash On Delivery (COD) (7.00)');
        this.moneyOrder = page.getByLabel('Check / Money Order (5.00)');
        this.creditCard = page.getByLabel('Credit Card');
        this.purchaseOrder = page.getByLabel('Purchase Order');
        this.continuePaymentButton = page.locator('.payment-method-next-step-button');
        this.paymentInformation = page.getByRole('heading', { name: 'Payment information' });
        this.paymentCODMessage = page.getByText('You will pay by COD');
        this.monerOrderMessage = page.getByText('Mail Personal or Business Check,');
        this.creditCardType = page.getByRole('row', { name: 'Select credit card:' }).getByRole('combobox');
        this.cardholderName = page.getByLabel('Cardholder name');
        this.cardNumber = page.getByLabel('Card number');
        this.expirationMonth = page.locator('#ExpireMonth');
        this.expirationYear = page.locator('#ExpireYear');
        this.cardCode = page.getByLabel('Card code');
        this.continuePaymentInfoButton = page.locator('[onclick="PaymentInfo.save()"]');
        this.confirmOrder = page.getByRole('heading', { name: 'Confirm order' });
        this.confirmBillingAddress = page.locator('.billing-info');
        this.confirmPaymentMethod = page.locator('.billing-info .payment-method');
        this.confirmShippingMethod = page.locator('.shipping-method');
        this.confirmProduct = page.getByRole('link', { name: 'Build your own cheap computer' });
        this.confirmOrderButton = page.getByRole('button', { name: 'Confirm' });
        this.orderInfo = page.locator('.cart-total');
        this.poNumber = page.locator('[name="PurchaseOrderNumber"]');
    }

    async fillPurchaseOrderDetails(poNumber) {
        await this.poNumber.fill(poNumber);
    }

    getOrderSummaryValue(label) {
        return this.orderInfo.locator('tr').filter({ hasText: label }).locator('td').last();
    }

    async getOrderAdditionalFee(){
        return Number(await this.getOrderSummaryValue('Payment method additional fee:').textContent());
    }

    async getOrdertSubTotal() {
        return Number(await this.getOrderSummaryValue('Sub-Total:').textContent());
    }

    async getOrderShipping() {
        return Number(await this.getOrderSummaryValue('Shipping:').textContent());
    }

    async getOrderTax() {
        return Number(await this.getOrderSummaryValue('Tax:').textContent());
    }

    async getOrderTotal() {
        return Number(await this.getOrderSummaryValue('Total:').textContent());
    }

    async clickOnContinueShopping() {
        await this.continueShopping.click();
    }

    async clickOnContinuePaymentInfo() {
        await this.continuePaymentInfoButton.click();
    }

    async clickOnContinuePayment() {
        await this.continuePaymentButton.click();
    }

    async selectCashOnDelivery() {
        await this.cashOnDelivery.check();
    }

    async selectMoneyOrder() {
        await this.moneyOrder.check();
    }

    async selectCreditCard() {
        await this.creditCard.check();
    }

    async selectPurchaseOrder() {
        await this.purchaseOrder.check();
    }

    async selectNewAddressIfRequired() {
        await this.billingAddressDropdown.waitFor({ state: 'visible', timeout: 3000 });
        if (await this.billingAddressDropdown.isVisible()) {
            await this.billingAddressDropdown.click();
            await this.billingAddressDropdown.selectOption({ label: 'New Address' });

        }

    }

    async fillBillingAddress(data) {
        await this.company.fill(data.company);
        await this.country.selectOption({ label: data.country });
        await this.city.fill(data.city);
        await this.address1.fill(data.address1);
        await this.address2.fill(data.address2);
        await this.postalCode.fill(data.postalCode);
        await this.phoneNumber.fill(data.phoneNumber);
        await this.faxNumber.fill(data.faxNumber);
    }

    async continueBillingAddress() {
        await this.continueBillingButton.click();
    }

    async clickOnPickUpInStore() {
        await this.pickUpInStore.check();
    }

    async continueShippingAddress() {
        await this.continueShippingAddressButton.click();
    }

    async backFromShippngAddress() {
        await this.shippingAddressBack.click();
    }

    async selectSavedBillingAddressAndContinue() {
        await this.billingAddressDropdown.selectOption({ index: 0 });
        await this.continueBillingAddress();
    }

    async fillCreditCardDetails(data) {
        await this.creditCardType.selectOption({ label: data.cardType });
        await this.cardholderName.fill(data.cardholderName);
        await this.cardNumber.fill(data.cardNumber);
        await this.expirationMonth.selectOption({ label: data.expirationMonth });
        await this.expirationYear.selectOption({ label: data.expirationYear });
        await this.cardCode.fill(data.cardCode);
    }

    async validateConfirmOrder(productName, paymentMethod, shippingMethod) {
        await expect(this.confirmOrder).toBeVisible();
        await expect(this.confirmPaymentMethod).toContainText(paymentMethod);
        await expect(this.confirmShippingMethod).toContainText(shippingMethod);
        await expect(this.confirmProduct).toHaveText(productName);
    }
    async validateOrderSummary(expectedSubtotal,paymentFee=0) {
        const subTotal = await this.getOrdertSubTotal();
        const shipping = await this.getOrderShipping();
        const tax = await this.getOrderTax();
        const total = await this.getOrderTotal();
        expect(subTotal).toBe(expectedSubtotal);
        expect(shipping).toBe(0);
        expect(tax).toBe(0);
        expect(total).toBe(subTotal + shipping + tax+paymentFee);
    }
}