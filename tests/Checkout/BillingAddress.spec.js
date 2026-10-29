import { test, expect } from '../../Fixtures/CheckoutFixture.js';

test('fill billing address and continue', async ({ checkoutSetup }) => {
    const { poManager } = checkoutSetup;
    const checkoutPage = poManager.getCheckoutPage();

    await expect(checkoutPage.paymentMethod).toBeVisible();
});