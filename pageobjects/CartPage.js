import { BasePage } from "./BasePage";
import { expect } from "@playwright/test";

export class CartPage extends BasePage {

    constructor(page) {
        super(page);
        this.cartItems = page.locator('.cart-item-row');
        this.productName = page.locator('.product-name');
        this.productPrice = page.locator('.product-unit-price');
        this.quantity = page.locator('.qty-input');
        this.productSubTotal = page.locator('.product-subtotal');
        this.productConfig = page.locator('.cart-item-row .attributes');// consist processor , rrsm and hdd
        this.removeButton = page.locator('[name="removefromcart"]');
        this.updateShoppingCart = page.locator('[name="updatecart"]');
        this.continueShopping = page.locator('[name="continueshopping"]')
        this.cartInfo = page.locator('.cart-total');
        this.cartEmptyMessage = page.locator('.order-summary-content');
        this.cartQuantity = page.locator('.cart-qty');
        this.termsAndContitions = page.locator('#termsofservice');
        this.chcekoutButton = page.getByRole('button', { name: 'Checkout' });

    }
    async clickOnCheckout() {
        await this.chcekoutButton.click();
    }
    async clickOnTermsAndConditions() {
        await this.termsAndContitions.click();
    }

    getCartItem(productName) {
        return this.cartItems.filter({ hasText: productName });
    }

    getCartItemQuantity(productName) {
        return this.getCartItem(productName).locator('.qty-input');
    }

    getCartItemConfiguration(productName) {
        return this.getCartItem(productName).locator('.attributes');
    }

    getCartItemByConfiguration(configuration) {
        return this.cartItems.filter({ hasText: configuration });
    }

    async setQuantity(productName, quantity) {
        await this.getCartItem(productName).locator('.qty-input').fill(String(quantity));
    }

    async updateCart() {
        await this.updateShoppingCart.click();
    }

    async getProductTotal(productName) {
        const price = await this.getCartItem(productName).locator('.product-subtotal').textContent();
        return Number(price);
    }

    async getProductPrice(productName) {
        const price = await this.getCartItem(productName).locator('.product-unit-price').textContent();
        return Number(price);
    }

    async removeProductByName(productName) {
        await this.getCartItem(productName).locator('[name="removefromcart"]').check();
        await this.updateCart();
    }

    getCartSummaryValue(label) {
        return this.cartInfo.locator('tr').filter({ hasText: label }).locator('td').last();
    }

    async getCartSubTotal() {
        return Number(await this.getCartSummaryValue('Sub-Total:').textContent());
    }

    async getShipping() {
        return Number(await this.getCartSummaryValue('Shipping:').textContent());
    }

    async getTax() {
        return Number(await this.getCartSummaryValue('Tax:').textContent());
    }

    async getCartTotal() {
        return Number(await this.getCartSummaryValue('Total:').textContent());
    }

    async clickOnContinueShopping() {
        await this.continueShopping.click();
    }

    getCartItemByConfigurationUsingData(data) {
        let item = this.cartItems
            .filter({ hasText: data.productName })
            .filter({ hasText: `Processor: ${data.processor}` })
            .filter({ hasText: `RAM: ${data.ram}` })
            .filter({ hasText: `HDD: ${data.hdd}` });
        for (const software of data.software) {
            item = item.filter({hasText: `Software: ${software}`});
        }
        return item;
    }
    async removeProduct(data) {
        const item = this.getCartItemByConfigurationUsingData(data);
        await expect(item).toBeVisible();
        await item.locator('[name="removefromcart"]').check();
        await this.updateCart();
    }
}