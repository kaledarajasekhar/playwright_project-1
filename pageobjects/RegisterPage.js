import { BasePage } from "./BasePage";

export class RegisterPage extends BasePage {

    constructor(page) {
        super(page);
        this.male = page.locator('#gender-male');
        this.female = page.locator('#gender-female');
        this.firstName = page.getByLabel('First name:');
        this.lastName = page.getByLabel('Last name:');
        this.email = page.getByLabel('Email:');
        this.password = page.locator('#Password');
        this.confirmPassword = page.locator('#ConfirmPassword');
        this.registerButton = page.getByRole('button', { name: 'Register' });
        this.successMessage = page.locator('.page-body .result');
        this.registerMail = page.locator('.header-links .account');
        this.continue = page.getByRole('button', { name: 'Continue' });
    }

    async register(data) {

        if (data.gender === 'Male') {
            await this.male.click();
        } else {
            await this.female.click();
        }

        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.email.fill(data.email);
        await this.password.fill(data.password);
        await this.confirmPassword.fill(data.password);
        await this.registerButton.click();
    }

    async clickOnContinue(){
        await this.continue.click();
    }
}