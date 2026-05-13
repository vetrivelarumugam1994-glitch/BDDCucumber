# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: intro.spec.js >> locating the element
- Location: test\intro.spec.js:2:7

# Error details

```
ReferenceError: searchBar is not defined
```

# Test source

```ts
  1 |     import {test} from '@playwright/test';
  2 |   test('locating the element',async({page})=>{
  3 |   await page.goto('https://www.amazon.in/');
> 4 |   await searchBar.fill('Laptop')
    |   ^ ReferenceError: searchBar is not defined
  5 |   
  6 | })  
```