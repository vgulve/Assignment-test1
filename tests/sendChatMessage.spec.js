// tests/sendChatMessage.spec.js
const { test, expect } = require('@playwright/test');
test('Send Chat Message', async ({ page }) => {
  await page.goto('https://minimals.cc/');
  await page.click('text=Login');
  await page.fill('input[name="email"]', 'demo@minimals.cc');
  await page.fill('input[name="password"]', 'demo1234');
  await page.click('button[type="submit"]');
  await page.waitForNavigation();
  await page.click('text=Chat'); 
  await page.click('text=Deja Brady'); 
  const messageInput = await page.$('input[name="message"]');
  if (messageInput) {
    await messageInput.fill('Hello, how are you?');
    await page.click('button[type="submit"]');
const sentMessage = await page.waitForSelector('.message.sent', { state: 'attached' });
const sentMessageText = await sentMessage.textContent();
expect(sentMessageText).toContain('Hello, how are you?');
  }
});