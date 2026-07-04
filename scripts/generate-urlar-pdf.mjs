import { chromium } from 'playwright';

const URL = process.env.URLAR_URL || 'http://localhost:3000/urlar?print=1';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1240, height: 1754 } });
await page.goto(URL, { waitUntil: 'networkidle' });
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(1000);
await page.pdf({
  path: 'public/urlar-poster.pdf',
  printBackground: true,
  width: '210mm',
  height: '297mm',
  pageRanges: '1',
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
await browser.close();
console.log('Wrote public/urlar-poster.pdf');
