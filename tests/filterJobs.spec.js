// tests/filterJobs.spec.js
const { test, expect } = require('@playwright/test');
test('Filter Jobs by "On Demand" employment type', async ({ page }) => {
  await page.goto('https://minimals.cc/');
  await page.click('text=Login');
  await page.fill('input[name="email"]', 'demo@minimals.cc');
  await page.fill('input[name="password"]', 'demo1234');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.click('text=Job'); 
  await page.click('text=List'); 
  await page.click('text=Filters'); 
  await page.locator('label:has-text("On Demand") input[type="checkbox"]').click();
  await page.locator('.MuiDrawer-root .MuiBackdrop-root').click();
  const jobCards = await page.$$('.job-card'); 
  for (const jobCard of jobCards) {
    const employmentType = await jobCard.$eval('.employment-type', el => el.textContent.trim());
    expect(employmentType).toBe('On Demand');
  }
  const otherEmploymentTypes = await page.$$('.job-card:not(.employment-type:has-text("On Demand"))');
  expect(otherEmploymentTypes.length).toBe(0);
});