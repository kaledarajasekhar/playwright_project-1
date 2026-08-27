import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {

    constructor(page) {
        super(page);
        this.email = page.getByLabel('Email:');
        this.password = page.getByLabel('Password:');
        this.rememberMe = page.getByLabel('Remember me?');
        this.loginButton = page.getByRole('button', { name: 'Log in' });
        this.errorMessage=page.locator('.validation-summary-errors');
    }

    async login(data) {

        await this.email.fill(data.email);
        await this.password.fill(data.password);
        await this.rememberMe.click();
        await this.loginButton.click();
    }
}