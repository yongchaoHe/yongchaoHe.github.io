const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8899';
const OUT_DIR = '/Users/heyongchao/Documents/code/yongchaoHe.github.io/screenshots-lm-head';
const VIEWPORT = { width: 1600, height: 1200 };

const VARIANTS = [
  { variant: 'untied', name: 'untied' },
  { variant: 'tied', name: 'tied' },
  { variant: 'moe_head', name: 'moe-head' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  for (const variant of VARIANTS) {
    const params = new URLSearchParams({ variant: variant.variant });
    const url = `${BASE}/#/component/lm-head?${params.toString()}`;
    console.log(`Capturing ${variant.name}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.rich-diagram svg', { timeout: 15000 });
    await page.waitForTimeout(800);
    const outPath = path.join(OUT_DIR, `lm-head-${variant.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
})();
