import { BasePage } from "./BasePage";

export class ProductPage extends BasePage {
    constructor(page) {
        super(page);
        this.processor = page.locator('dt', { hasText: 'Processor' }).locator('xpath=following-sibling::dd[1]');
        this.ram = page.locator('dt', { hasText: 'RAM' }).locator('xpath=following-sibling::dd[1]');
        this.hdd = page.locator('dt', { hasText: 'HDD' }).locator('xpath=following-sibling::dd[1]');
        this.software = page.locator('dt', { hasText: 'Software' }).locator('xpath=following-sibling::dd[1]');
        this.productName = page.getByRole('heading', { level: 1 });
        this.productPrice = page.locator('.price-value-72');
        this.quantity = page.getByLabel('Qty:');
        this.addToCartButton = page.locator('#add-to-cart-button-72');
        this.cartSuccessMessage = page.locator('.bar-notification');

    }

    async selectProcessor(option) {
        await this.processor.getByLabel(option).check();
    }

    async selectRam(option) {
        await this.ram.getByLabel(option).check();
    }

    async selectHdd(option) {
        await this.hdd.getByLabel(option).check();
    }

    async selectSoftware(options) {
        for (const option of options) {
            await this.software.getByLabel(option).check();
        }
    }

    async setQuantity(quantity) {
        await this.quantity.fill(String(quantity));
    }

    async addToCart() {
        await this.addToCartButton.click();
    }

    async configureAndAddProductToCart(data) {
        await this.selectProcessor(data.processor);
        await this.selectRam(data.ram);
        await this.selectHdd(data.hdd);
        await this.selectSoftware(data.software);
        await this.setQuantity(data.quantity);
        await this.addToCart();
    }
}