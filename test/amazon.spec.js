import{test,expect} from '@playwright/test';
test('amazon functionality' ,async({page})=>{
await page.goto("https://www.amazon.in/");
await page.locator('//input[@id="twotabsearchtextbox"]').fill("laptop");
await page.keyboard.press('Enter');
await page.waitForTimeout(2000);  
const pricesText = await page.locator ('//div[@data-component-type="s-search-result"]/descendant::span[@class="a-price-whole"] ').allTextContents();
// function to find the index of the minimum price               
const minval = pricesText.reduce((minIdx, curr, idx) => {
const mintext = parseFloat(pricesText[minIdx].replace(/[^\d.]/g, ''));
const currVal = parseFloat(curr.replace(/[^\d.]/g, ''));
return currVal < mintext ? idx : minIdx;
}, 0);

// const minPriceText = pricesText[minval];
console.log("Minimum price :", pricesText[minval]);
// console.log(pricesText);
const productLocator = page.locator('//span[@class="a-price-whole"]/ancestor::div[@role="listitem"]/descendant::div[@data-cy="title-recipe"]');
const [productPage] = await Promise.all([
  page.waitForEvent('popup'),
  productLocator.nth(minval).click(),
]);
await productPage.waitForLoadState('domcontentloaded');
await productPage.locator('//div[@data-csa-c-slot-id="newAccordionRow_0"]/descendant::div[@class="a-button-stack"]/descendant::input[@id="add-to-cart-button"]').click();

const addToCartMessage = productPage.locator('//div[@data-csa-c-content-id="NATC_SMART_WAGON_CONF_MSG_SUCCESS_CONTENT"]');
try {
  await addToCartMessage.waitFor({ state: 'visible', timeout: 5000 });
  console.log('added to cart');
} catch (error) {
  console.log('add-to-cart confirmation message did not appear');
}

await productPage.waitForTimeout(2000);
await productPage.screenshot({ path: 'cart.png' });

});