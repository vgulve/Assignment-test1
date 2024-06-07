
const { test, expect } = require('@playwright/test');
test('Search Order', async ({ page }) => {
    await page.goto('https://minimals.cc/');
    await page.locator('text=Login').waitFor({state:'visible'})
    await page.locator('text=Login').click({force:true});
    await page.locator('input[name="email"]').waitFor({state:'visible'})
    await page.fill('input[name="email"]', 'demo@minimals.cc');
    await page.fill('input[name="password"]', 'demo1234');
    await page.click('button[type="submit"]');
    await page.getByRole('button', { name: 'order' }).waitFor({state:'visible'}
    )
    await page.getByRole('button', { name: 'order' }).click();
    await page.getByRole('button', { name: 'list' }).click();
    await page.getByPlaceholder('Search customer or order').waitFor({state:'visible'})
    await expect(page.locator('table tbody tr[class*="MuiTableRow-hover"]')).toHaveCount(5)
    await page.getByPlaceholder('Search customer or order').pressSequentially('Cor');
    await expect(page.locator('table tbody tr[class*="MuiTableRow-hover"]')).toHaveCount(1)
})