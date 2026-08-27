import { test } from '../../Fixtures/BaseFixture.js';
import { expect } from '@playwright/test';

test.describe('home page ', () => {

    test('verify url ', async ({ page, poManager }) => {

        await expect(page).toHaveURL('https://demowebshop.tricentis.com/');
        await expect(page).toHaveTitle('Demo Web Shop');
    })



})