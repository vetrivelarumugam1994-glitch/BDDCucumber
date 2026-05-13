# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: amazon.spec.js >> amazon functionality
- Location: test\amazon.spec.js:2:5

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.waitForTimeout: Target page, context or browser has been closed
```

# Test source

```ts
  1  | import{test,expect} from '@playwright/test';
  2  | test('amazon functionality' ,async({page})=>{
  3  | await page.goto("https://www.amazon.in/");
  4  | await page.locator('//input[@id="twotabsearchtextbox"]').fill("laptop");
  5  | await page.keyboard.press('Enter');
  6  | await page.waitForTimeout(2000);  
  7  | const pricesText = await page.locator ('//div[@data-component-type="s-search-result"]/descendant::span[@class="a-price-whole"] ').allTextContents();
  8  | // function to find the index of the minimum price               
  9  | const minval = pricesText.reduce((minIdx, curr, idx) => {
  10 | const mintext = parseFloat(pricesText[minIdx].replace(/[^\d.]/g, ''));
  11 | const currVal = parseFloat(curr.replace(/[^\d.]/g, ''));
  12 | return currVal < mintext ? idx : minIdx;
  13 | }, 0);
  14 | 
  15 | // const minPriceText = pricesText[minval];
  16 | console.log("Minimum price :", pricesText[minval]);
  17 | // console.log(pricesText);
  18 | const productLocator = page.locator('//span[@class="a-price-whole"]/ancestor::div[@role="listitem"]/descendant::div[@data-cy="title-recipe"]');
  19 | const [productPage] = await Promise.all([
  20 |   page.waitForEvent('popup'),
  21 |   productLocator.nth(minval).click(),
  22 | ]);
  23 | await productPage.waitForLoadState('domcontentloaded');
  24 | await productPage.locator('//div[@data-csa-c-slot-id="newAccordionRow_0"]/descendant::div[@class="a-button-stack"]/descendant::input[@id="add-to-cart-button"]').click();
  25 | 
  26 | const addToCartMessage = productPage.locator('//div[@data-csa-c-content-id="NATC_SMART_WAGON_CONF_MSG_SUCCESS_CONTENT"]');
  27 | try {
  28 |   await addToCartMessage.waitFor({ state: 'visible', timeout: 5000 });
  29 |   console.log('added to cart');
  30 | } catch (error) {
  31 |   console.log('add-to-cart confirmation message did not appear');
  32 | }
  33 | 
> 34 | await productPage.waitForTimeout(2000);
     |                   ^ Error: page.waitForTimeout: Target page, context or browser has been closed
  35 | await productPage.screenshot({ path: 'cart.png' });
  36 | 
  37 | });
```