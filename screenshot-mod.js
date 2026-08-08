const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8899';
const OUT_DIR = '/Users/heyongchao/Documents/code/yongchaoHe.github.io/screenshots-mod';
const VIEWPORT = { width: 1600, height: 1200 };

const VARIANTS = [
  { capacity_factor: 0.5, name: 'default' },
  { capacity_factor: 0.2, name: 'low-capacity' },
  { capacity_factor: 0.8, name: 'high-capacity' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  for (const variant of VARIANTS) {
    const params = new URLSearchParams({
      capacity_factor: String(variant.capacity_factor),
    });
    const url = `${BASE}/#/component/mixture-of-depths?${params.toString()}`;
    console.log(`Capturing ${variant.name}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.rich-diagram svg', { timeout: 15000 });
    await page.waitForTimeout(800);
    const outPath = path.join(OUT_DIR, `mod-${variant.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
})();
