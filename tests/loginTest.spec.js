// tests/loginTest.spec.js
const { test, expect } = require('@playwright/test');
test('Login test for minimals.cc', async ({ page }) => {
  await page.goto('https://minimals.cc/');
  await page.click('text=Login'); 
  await page.fill('input[name="email"]', 'demo@minimals.cc'); 
  await page.fill('input[name="password"]', 'demo1234'); 
  await page.click('button[type="submit"]'); 
  await page.waitForNavigation();
  await expect(page).toHaveURL('https://minimals.cc/dashboard'); 
  await expect(page.locator('text=Welcome')).toBeVisible(); 
});
