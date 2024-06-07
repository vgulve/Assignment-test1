// tests/deleteFiles.spec.js
const { test, expect } = require('@playwright/test');
test('Delete Files', async ({ page }) => {
  try {
    
    await page.goto('https://minimals.cc/');
    await page.click('text=Login');
    await page.fill('input[name="email"]', 'demo@minimals.cc');
    await page.fill('input[name="password"]', 'demo1234');
    await page.click('button[type="submit"]');
    await page.waitForNavigation();
    await page.click('text=File Manager');
    await page.waitForSelector('input[type="checkbox"]');
    await page.click('input[type="checkbox"]');
    await page.click('button[aria-label="Delete"]'); 
    const confirmButtonSelector = 'button:has-text("Confirm")';
    const isConfirmVisible = await page.isVisible(confirmButtonSelector);
    if (isConfirmVisible) {
      await page.click(confirmButtonSelector);
    }
    const noFilesSelector = 'text=No files found';
    const fileItemSelector = '.file-item'; 
    await Promise.race([
      page.waitForSelector(noFilesSelector, { timeout: 60000 }),
      page.waitForSelector(fileItemSelector, { timeout: 60000, state: 'hidden' })
    ]);
    const fileItems = await page.$$(fileItemSelector);
    expect(fileItems.length).toBe(0);
    console.log('Test passed: All selected items are successfully deleted');
  } catch (error) {
    console.error('Error during test execution:', error);
    throw error;
  }
});