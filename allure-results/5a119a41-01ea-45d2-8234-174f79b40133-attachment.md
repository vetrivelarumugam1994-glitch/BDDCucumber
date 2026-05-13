# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: minprice.spec.js >> myntra price
- Location: test\minprice.spec.js:2:5

# Error details

```
Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.myntra.com/
Call log:
  - navigating to "https://www.myntra.com/", waiting until "load"

```

# Test source

```ts
  1  | import { test } from '@playwright/test';
  2  | test('myntra price',async({page}) => {
  3  | 
> 4  | await page.goto("https://www.myntra.com/");
     |            ^ Error: page.goto: net::ERR_HTTP2_PROTOCOL_ERROR at https://www.myntra.com/
  5  | await page.waitForTimeout(5000); 
  6  | // m
  7  | await page.locator('//div[@data-reactid="20"]').hover();
  8  | await page.waitForTimeout(5000);
  9  | //t-shirt option click
  10 | await page.locator('//div[@data-reactid="20"]/descendant::li[@data-reactid="30"]').click();
  11 | await page.waitForTimeout(5000);
  12 |  
  13 | // /descendant:: /ancestor:: /following::
  14 | // to count all t-shirt
  15 | const cou =  await page.locator('//li[@class = "product-base"]').count();
  16 | console.log('number of t.shirt :' +cou);
  17 | 
  18 | //cout of all price of tshirt
  19 | 
  20 | const totalprices = await page.locator('.product-price').count();    
  21 | console.log('Total prices: '+totalprices);
  22 | 
  23 | const namesText = await page.locator('.product-discountedPrice').count();
  24 | console.log("count Of discount prices:",+namesText);
  25 | 
  26 | const pricesText = await page.locator('.product-discountedPrice').allTextContents();
  27 | 
  28 | const minval = pricesText.reduce((minIdx, curr, idx) => {
  29 | const mintext = parseFloat(pricesText[minIdx].replace(/[^\d.]/g, ''));
  30 | const currVal = parseFloat(curr.replace(/[^\d.]/g, ''));
  31 | return currVal < mintext ? idx : minIdx;
  32 | }, 0);
  33 | 
  34 | const minPriceText = pricesText[minval];
  35 | console.log("Minimum price (original format):", minPriceText);
  36 | 
  37 | const productName = await page.locator('//span[@class="product-discountedPrice"]/ancestor::li[@class="product-base"]/descendant::h3[@class="product-brand"]').nth(minval).textContent();
  38 | 
  39 | 
  40 | console.log("Product name:", productName);  
  41 |  });
```