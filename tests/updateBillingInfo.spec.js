// tests/updateBillingInfo.spec.js
const { test, expect } = require('@playwright/test');
test('Update Billing Information', async ({ page }) => {
  await page.goto('https://minimals.cc/');
  await page.click('text=Login');
  await page.fill('input[name="email"]', 'demo@minimals.cc');
  await page.fill('input[name="password"]', 'demo1234');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.click('text=User');
  await page.click('text=Account'); 
  await page.click('text=Billing'); 
  await expect(page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').first()).toHaveText('Jayvion Simon')
  await page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').first().click()
  let dropdowntext = await page.locator('.MuiButtonBase-root .MuiStack-root h6').allTextContents()
  for (let i = 0; i < dropdowntext.length; i++) {
    if (dropdowntext[i] == 'Deja Brady') {
      await page.locator('.MuiButtonBase-root .MuiStack-root h6').nth(i).click({ force: true })
    }
  }
  await expect(page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').first()).toHaveText('Deja Brady')
  await expect(page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').last()).toHaveText('**** **** **** 5678')
  await page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').last().click()
  let dropdowntext1 = await page.locator('[role="presentation"] .MuiPaper-elevation h6[class*="MuiTypography-subtitle2"] ').allTextContents()
  for (let i = 0; i < dropdowntext1.length; i++) {
    if (dropdowntext1[i] == '**** **** **** 1234') {   
      await page.locator('[role="presentation"] .MuiPaper-elevation h6[class*="MuiTypography-subtitle2"] ').nth(i).click({ force: true })
    }
  }
  await expect(page.locator('.MuiStack-root .MuiGrid2-root  button[type="button"]').last()).toHaveText('**** **** **** 1234')
 
});
