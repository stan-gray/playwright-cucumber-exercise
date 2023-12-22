import { Page } from "@playwright/test"

export class Checkout {
    private readonly page: Page
    private readonly checkoutButton: string = 'button[id="checkout"]'
    private readonly firstNameInput: string = 'input[id="first-name"]'
    private readonly lastNameInput: string = 'input[id="last-name"]'
    private readonly postalCodeInput: string = 'input[id="postal-code"]'
    private readonly continueButton: string = 'input[id="continue"]'
    private readonly finishButton: string = 'button[id="finish"]'
    private readonly successMessage: string = 'h2[class="complete-header"]'

    constructor(page: Page) {
        this.page = page;
    }

    public async selectCheckout() {
        await this.page.locator(this.checkoutButton).click()
    }

    public async enterCustomerInfo() {

        const firstNameInput = await this.page.$(this.firstNameInput);
        const lastNameInput = await this.page.$(this.lastNameInput);
        const postalCodeInput = await this.page.$(this.postalCodeInput);

        // Check if the first name input exists
        if (!firstNameInput) {
            throw new Error('First name input element not found.');
        }

        // Check if the last name input exists
        if (!lastNameInput) {
            throw new Error('Last name input element not found.');
        }

        // Check if the postal code input exists
        if (!postalCodeInput) {
            throw new Error('Postal code input element not found.');
        }

        await firstNameInput.fill('Test');
        await lastNameInput.fill('Testerson');
        await postalCodeInput.fill('92660');

    }

    public async selectContinue() {
        await this.page.locator(this.continueButton).click()
    }

    public async selectFinish() {
        await this.page.locator(this.finishButton).click()
    }

    public async validateSuccessMessage(expectedMessage: string) {

        // Find the element using the selector
        const successMessageHandle = await this.page.$(this.successMessage);

        // Check if the element exists
        if (!successMessageHandle) {
            throw new Error('Success message element not found.');
        }

        // Get the inner text of the element
        const successMessage = await successMessageHandle.innerText();


        // Validate an error message text
        if (successMessage !== expectedMessage) {
            throw new Error(`Expected to be ${expectedMessage} but found  ${successMessage}`);
        }
    }

}