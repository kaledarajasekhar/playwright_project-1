import { BasePage } from "./BasePage";

export class ComputersPage extends BasePage {

    constructor(page) {
        super(page);
        this.desktops = page.locator('h2').getByRole('link', { name: 'Desktops' });
        this.notebooks = page.locator('h2').getByRole('link', { name: 'Notebooks' });
        this.accessories = page.locator('h2').getByRole('link', { name: 'accessories' });
        this.computersText=page.locator('h1');
        this.items=page.locator('.item-box');
    }

    async clickOnDesktops() {
        await this.desktops.click();
    }

    async clickOnNotebooks() {
        await this.notebooks.click();
    }

    async clickOnAccessories() {
        await this.accessories.click();
    }
}