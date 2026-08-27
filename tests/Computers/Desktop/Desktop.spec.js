import { test } from '../../../Fixtures/BaseFixture';
import { expect } from '@playwright/test';

const pagination = [
    { display: '4', expectedCount: 4 },
    { display: '8', expectedCount: 6 },
    { display: '12', expectedCount: 6 }
]

test.describe('validate desktop', () => {

    let desktopPage;
    test.beforeEach(async ({ poManager }) => {
        const homePage = poManager.getHomePage();
        const computersPage = poManager.getComputersPage();
        desktopPage = poManager.getDesktopPage();

        await homePage.clickOnComputers();
        await computersPage.clickOnDesktops();
    })

    test(' title, print product titles , prices and count', async ({ page }) => {
        await expect(page).toHaveTitle('Demo Web Shop. Desktops');
        const titles = await desktopPage.getAllProductTitles();
        const prices = await desktopPage.getAllProductPrices();
        const count = await desktopPage.getAllProductsCount();

        for (let i = 0; i < count; i++) {
            console.log(`${i + 1}.${titles[i]}-${prices[i]}`);
        }
    })

    test('all product titles sort in A-Z', async () => {
        await desktopPage.sortProducts('Name: A to Z');
        const actualTitles = await desktopPage.getAllProductTitles();
        const expectTitles = [...actualTitles].sort();
        await expect(actualTitles).toEqual(expectTitles);
    })

    test('all product titles sort in Z-A', async () => {
        await desktopPage.sortProducts('Name: Z to A');
        const actualTitles = await desktopPage.getAllProductTitles();
        const expectedTitles = [...actualTitles].sort().reverse();
        await expect(actualTitles).toEqual(expectedTitles);
    })

    test('product prices sort in LOW-HIGH ', async () => {
        await desktopPage.sortProducts('Price: Low to High');
        const actualPrices = await desktopPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);
        await expect(actualPrices).toEqual(expectedPrices);
    })

    test('all product prices sort in HIGH-LOW', async () => {
        await desktopPage.sortProducts('Price: High to Low');
        const actualPrices = await desktopPage.getAllProductPrices();
        const expectedPrices = [...actualPrices].sort((a, b) => b - a)
        expect(actualPrices).toEqual(expectedPrices);
    })

    for (const data of pagination) {

        test(`display ${data.display} products per page`, async () => {

            await desktopPage.displayProducts(data.display);
            const actualCount = await desktopPage.getAllProductsCount();
            await expect(actualCount).toBe(data.expectedCount);
        })
    }

    test('filter products under 1000', async () => {

        await desktopPage.filterUnder1000();
        const prices = await desktopPage.getAllProductPrices();
        for (const price of prices) {
            await expect(price).toBeLessThan(1000);
        }
    })

    test('filter products between 1000 to 1200', async () => {
        await desktopPage.filterBetween1000To1200();
        const prices = await desktopPage.getAllProductPrices();
        for (const price of prices) {
            await expect(price).toBeGreaterThanOrEqual(1000);
            await expect(price).toBeLessThanOrEqual(1200);
        }
    })

    test('filter products over 1200', async ({ page }) => {
        await desktopPage.filterOver1200();
        const prices = await desktopPage.getAllProductPrices();
        for (const price of prices) {
            await expect(price).toBeGreaterThanOrEqual(1200);
        }
    })
})