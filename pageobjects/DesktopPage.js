import { BasePage } from './BasePage';

export class DesktopPage extends BasePage {

    constructor(page) {
        super(page);

        this.titles = page.locator('.product-title');
        this.prices = page.locator('.actual-price');
        this.sortBy = page.locator('#products-orderby');
        this.display = page.locator('#products-pagesize');
        this.under1000 = page.locator('.price-range-selector a').first();
        this.between1000To1200 = page.locator('.price-range-selector a').nth(1);
        this.over1200 = page.locator('.price-range-selector a').nth(2);
        this.buildYourOwnCheapComputer =page.getByRole('link', {name: 'Build your own cheap computer',exact: true});
    }

    async waitForProducts() {
        await this.titles.first().waitFor({ state: 'visible' });
    }

    async getAllProductTitles() {
        await this.waitForProducts();

        return (await this.titles.allTextContents())
            .map(title => title.trim());
    }

    async getAllProductPrices() {
        await this.waitForProducts();

        return (await this.prices.allTextContents())
            .map(price => Number(price.trim()));
    }

    async getAllProductsCount() {
        await this.waitForProducts();

        return await this.titles.count();
    }

    async sortProducts(value) {
        await this.sortBy.selectOption({ label: value });
        await this.waitForProducts();
    }

    async displayProducts(value) {
        await this.display.selectOption({ label: value });
        await this.waitForProducts();
    }

    async filterUnder1000() {
        await this.under1000.click();
        await this.waitForProducts();
    }

    async filterBetween1000To1200() {
        await this.between1000To1200.click();
        await this.waitForProducts();
    }

    async filterOver1200() {
        await this.over1200.click();
        await this.waitForProducts();
    }

    async clickOnBuildYourOwnCheapComputer() {
        await this.buildYourOwnCheapComputer.click();
    }
}