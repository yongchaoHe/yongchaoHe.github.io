const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8888';
const OUT_DIR = '/Users/heyongchao/Documents/code/yongchaoHe.github.io/screenshots-moe-layer';
const VIEWPORT = { width: 1600, height: 1200 };

const VARIANTS = [
  { routing: 'token-choice', expert_type: 'standard-ffn', shared_experts: 0, name: 'token-standard' },
  { routing: 'token-choice', expert_type: 'swiglu', shared_experts: 1, name: 'token-swiglu-shared' },
  { routing: 'expert-choice', expert_type: 'standard-ffn', shared_experts: 0, name: 'expert-standard' },
  { routing: 'switch', expert_type: 'swiglu', shared_experts: 0, name: 'switch-swiglu' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  for (const variant of VARIANTS) {
    const params = new URLSearchParams({
      routing: variant.routing,
      expert_type: variant.expert_type,
      shared_experts: String(variant.shared_experts),
    });
    const url = `${BASE}/#/component/moe-layer?${params.toString()}`;
    console.log(`Capturing ${variant.name}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.rich-diagram svg', { timeout: 15000 });
    await page.waitForTimeout(800);
    const outPath = path.join(OUT_DIR, `moe-layer-${variant.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
})();
