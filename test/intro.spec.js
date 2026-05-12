    import {test} from '@playwright/test';
  test('locating the element',async({page})=>{
  await page.goto('https://www.amazon.in/');
  await searchBar.fill('Laptop')
  
})  