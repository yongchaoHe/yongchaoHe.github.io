const { chromium } = require('playwright');
const path = require('path');

const BASE = 'http://localhost:8899';
const OUT_DIR = '/Users/heyongchao/Documents/code/yongchaoHe.github.io/screenshots-transformer-block';
const VIEWPORT = { width: 1600, height: 1200 };

const VARIANTS = [
  { variant: 'pre-norm',      attention_type: 'mha', mlp_variant: 'standard', norm_type: 'LayerNorm', name: 'pre-norm-mha-standard' },
  { variant: 'post-norm',     attention_type: 'mha', mlp_variant: 'standard', norm_type: 'LayerNorm', name: 'post-norm-mha-standard' },
  { variant: 'parallel',      attention_type: 'mha', mlp_variant: 'swiglu',   norm_type: 'RMSNorm',   name: 'parallel-mha-swiglu' },
  { variant: 'sandwich-norm', attention_type: 'gqa', mlp_variant: 'geglu',    norm_type: 'LayerNorm', name: 'sandwich-gqa-geglu' },
  { variant: 'deepnorm',      attention_type: 'mqa', mlp_variant: 'swiglu',   norm_type: 'RMSNorm',   name: 'deepnorm-mqa-swiglu' },
];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: VIEWPORT });
  const page = await context.newPage();

  for (const v of VARIANTS) {
    const params = new URLSearchParams({
      variant: v.variant,
      attention_type: v.attention_type,
      mlp_variant: v.mlp_variant,
      norm_type: v.norm_type,
    });
    const url = `${BASE}/#/component/transformer-block?${params.toString()}`;
    console.log(`Capturing ${v.name}: ${url}`);
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.waitForSelector('.rich-diagram svg', { timeout: 15000 });
    await page.waitForTimeout(800);
    const outPath = path.join(OUT_DIR, `transformer-block-${v.name}.png`);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`Saved ${outPath}`);
  }

  await browser.close();
})();
