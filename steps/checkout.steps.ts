import { Then } from '@cucumber/cucumber';
import { getPage } from '../playwrightUtilities';
import { Product } from '../pages/product.page';
import { Checkout } from '../pages/checkout.page';


Then('Select Checkout', async () => {
  await new Checkout(getPage()).selectCheckout();
});

Then('Fill in the First Name, Last Name, and Zip\\/Postal Code', async () => {
    await new Checkout(getPage()).enterCustomerInfo();
  });

Then('Select Continue', async () => {
    await new Checkout(getPage()).selectContinue();
  });  

Then('Select Finish', async () => {
    await new Checkout(getPage()).selectFinish();
  });    

Then('Validate the text {string}', async (expectedMessage) => {
    await new Checkout(getPage()).validateSuccessMessage(expectedMessage);
  });   