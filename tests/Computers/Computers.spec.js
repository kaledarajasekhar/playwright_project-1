import { test } from '../../Fixtures/BaseFixture';
import { expect } from '@playwright/test';

test.describe('computers navigation', () => {

    let computersPage;

    test.beforeEach(async ({ poManager }) => {
        const homePage = poManager.getHomePage();
        computersPage = poManager.getComputersPage();
        await homePage.clickOnComputers();
    })
    test('validate computer items', async ({ page, poManager }) => {
        await expect(page).toHaveTitle('Demo Web Shop. Computers');
        await expect(computersPage.computersText).toHaveText('Computers');
        await expect(computersPage.items).toHaveCount(3);
    })

    test('navigate to desktop', async ({ page }) => {
        await computersPage.clickOnDesktops();
        await expect(page).toHaveTitle('Demo Web Shop. Desktops');
    })

    test('navigate to notebooks', async ({ page }) => {

        await computersPage.clickOnNotebooks();
        await expect(page).toHaveTitle('Demo Web Shop. Notebooks');
    })

    test('navigate to accessories', async ({ page }) => {
        await computersPage.clickOnAccessories();
        await expect(page).toHaveTitle('Demo Web Shop. Accessories');
    })
})


