export class BasePage {

    constructor(page){
        this.page=page;
    }

    async navigateTo(url){
        await this.page.goto(url);
    }

    async getTitle(){
        return await this.page.title();
    }

    async getCurrentUrl(){
        return await this.page.url();
    }

    async goBack(){
        await this.page.goBack();
    }

    async reLoad(){
        await this.page.reload();
    }

    async waitForPageLoad(){
        await this.page.waitForLoadState('load');
    }
}
