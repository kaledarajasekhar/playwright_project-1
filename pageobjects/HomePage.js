import { BasePage } from "./BasePage.js";

export class HomePage extends BasePage {

    constructor(page) {
        super(page);
        this.register = page.getByText('Register');
        this.login = page.getByText('Log in');
        this.shoppingCart = page.getByText('Shopping cart');
        this.wishList = page.getByText('Wishlist');
        this.searchField = page.locator('#small-searchterms');
        this.searchButton = page.getByRole('button', { name: 'Search' });
        this.computers = page.locator('.header-menu').getByRole('link', { name: 'Computers' });
        this.books = page.locator('.header-menu').getByRole('link', { name: 'Books' });
        this.logout = page.getByRole('link', { name: 'Log out' });
        this.registerMail = page.locator('.header-links .account');
        this.shoppingCart=page.locator('#topcartlink');
    }

    async clickOnRegister() {
        await this.register.click();
    }

    async clickOnLogin() {
        await this.login.click();
    }

    async clickOnShoppingCart() {
        await this.shoppingCart.click();
    }

    async clickOnWishList() {
        await this.wishList.click();
    }

    async clickOnComputers() {
        await this.computers.click();
    }

    async clickOnBooks() {
        await this.books.click();
    }

    async clickOnShoppingCart(){
        await this.shoppingCart.click();
    }

    async search(data) {
        await this.searchField.fill(data);
        await this.searchButton.click();
    }

    async clickOnLogout() {
        await this.logout.click();
    }
}
