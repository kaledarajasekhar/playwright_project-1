import { test } from '../../../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';
import { CheapComputerConfigurations } from '../../../../TestData/ProductData.js';

for (const data of CheapComputerConfigurations) {

    test(`configure cheap computer - ${data.scenario}`, async ({ poManager , page }) => {

        const homePage=poManager.getHomePage();
        const computersPage=poManager.getComputersPage();
        const desktopPage=poManager.getDesktopPage();
        const productPage=poManager.getProductPage();

        await homePage.clickOnComputers();
        await computersPage.clickOnDesktops();
        await desktopPage.clickOnBuildYourOwnCheapComputer();
        await expect(productPage.productName).toHaveText('Build your own cheap computer');
        await expect (productPage.productPrice).toHaveText('800.00');
        await productPage.selectProcessor(data.processor);
        await productPage.selectRam(data.ram);
        await productPage.selectHdd(data.hdd);
        await productPage.selectSoftware(data.software);
        await productPage.setQuantity(data.quantity);
        await productPage.addToCart();
        await expect(productPage.cartSuccessMessage).toHaveText('The product has been added to your shopping cart');
    })
}

