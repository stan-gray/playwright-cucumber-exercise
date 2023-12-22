import { Page } from "@playwright/test"

export class Login {
    private readonly page: Page
    private readonly password: string = 'secret_sauce'
    private readonly passwordField: string = 'input[id="password"]'
    private readonly userNameField: string = 'input[id="user-name"]'
    private readonly loginButton: string = 'input[id="login-button"]'
    private readonly errorMessage: string = 'h3[data-test="error"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async validateTitle(expectedTitle: string) {
        const pageTitle = await this.page.title();
        if (pageTitle !== expectedTitle) {
            throw new Error(`Expected title to be ${expectedTitle} but found ${pageTitle}`);
        }
    }

    public async loginAsUser(userName: string) {
        await this.page.locator(this.userNameField).fill(userName)
        await this.page.locator(this.passwordField).fill(this.password)
        await this.page.locator(this.loginButton).click()
    }

    public async validateMessage(expectedMessage: string) {

        // Find the element using the selector
        const errorMessageHandle = await this.page.$(this.errorMessage);

        // Check if the element exists
        if (!errorMessageHandle) {
            throw new Error('Error message element not found.');
        }

        // Get the inner text of the element
        const errorMessage = await errorMessageHandle.innerText();


        // Validate an error message text
        if (errorMessage !== expectedMessage) {
            throw new Error(`Expected to be ${expectedMessage} but found  ${errorMessage}`);
        }
    }


}
