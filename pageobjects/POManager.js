import { HomePage } from "./HomePage.js";
import { RegisterPage } from "./RegisterPage.js";
import { LoginPage } from './LoginPage.js';
import { ComputersPage } from "./ComputersPage.js";
import { DesktopPage } from "./DesktopPage.js";
import { ProductPage } from "./ProductPage.js";
import { CartPage } from './CartPage.js';
import { CheckoutPage } from './CheckoutPage.js';


export class POManager {

    constructor(page) {
        this.page = page;
        this.homePage = null;
        this.registerPage = null;
        this.loginPage = null;
        this.computersPage = null;
        this.desktopPage = null;
        this.productPage = null;
        this.cartPage = null;
        this.chcekoutPage = null;
    }

    getHomePage() {
        if (!this.homePage) {
            this.homePage = new HomePage(this.page);
        }
        return this.homePage;
    }

    getRegisterPage() {
        if (!this.registerPage) {
            this.registerPage = new RegisterPage(this.page);
        }
        return this.registerPage;
    }

    getLoginPage() {
        if (!this.loginPage) {
            this.loginPage = new LoginPage(this.page);
        }
        return this.loginPage;
    }

    getComputersPage() {
        if (!this.computersPage) {
            this.computersPage = new ComputersPage(this.page);
        }
        return this.computersPage;
    }

    getDesktopPage() {
        if (!this.desktopPage) {
            this.desktopPage = new DesktopPage(this.page);
        }
        return this.desktopPage;
    }

    getProductPage() {
        if (!this.ProductPage) {
            this.productPage = new ProductPage(this.page);
        }
        return this.productPage;
    }

    getCartPage() {
        if (!this.cartPage) {
            this.cartPage = new CartPage(this.page);
        }
        return this.cartPage;
    }

    getCheckoutPage() {
        if (!this.chcekoutPage) {
            this.chcekoutPage = new CheckoutPage(this.page);
        }
        return this.chcekoutPage;
    }



}