const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8768';
const OUT_DIR = '/Users/heyongchao/Documents/code/yongchaoHe.github.io/screenshots-moe';
const VIEWPORT = { width: 1600, height: 1200 };
const VARIANTS = ['token-choice', 'expert-choice', 'switch'];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  for (const variant of VARIANTS) {
    const url = `${BASE}/#/component/moe-router?routing=${variant}`;
    console.log(`Capturing ${variant}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.rich-diagram svg', { timeout: 15000 });
    await page.waitForTimeout(800);
    const outPath = path.join(OUT_DIR, `moe-router-${variant}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
})();
