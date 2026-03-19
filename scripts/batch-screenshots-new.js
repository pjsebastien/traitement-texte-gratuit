require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SCREENSHOTS = [
  { url: "https://docs.google.com/document/u/0/", name: "soumettre-avis-home" },
  { url: "https://docs.google.com/document/u/0/", name: "traitement-texte-en-ligne-home" },
  { url: "https://fr.libreoffice.org/discover/writer/", name: "traitement-texte-windows-home" },
  { url: "https://originality.ai/", name: "detecteurs-ia-home" },
  { url: "https://www.referalio.com/", name: "referalio-home" },
  { url: "https://www.rocketlinks.com/", name: "rocketlinks-home" },
  { url: "https://haloscan.com/", name: "haloscan-home" },
  { url: "https://yourtext.guru/", name: "yourtextguru-home" },
  { url: "https://www.crakrevenue.com/", name: "crakrevenue-home" },
  { url: "https://www.semjuice.com/", name: "prix-backlink-netlinking" },
];

async function takeAndUpload(browser, { url, name }) {
  const localPath = `${name}.jpg`;
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 630 },
      locale: 'fr-FR',
      extraHTTPHeaders: { 'Accept-Language': 'fr-FR,fr;q=0.9' }
    });

    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    await page.waitForTimeout(4000);

    // Close cookie banners
    try {
      const selectors = [
        'button:has-text("Accepter")', 'button:has-text("Tout accepter")',
        'button:has-text("Accept")', 'button:has-text("J\'accepte")',
        'button:has-text("OK")', '[id*="cookie"] button',
        '.cookie-banner button', '[class*="consent"] button',
        '#onetrust-accept-btn-handler',
      ];
      for (const sel of selectors) {
        const btn = page.locator(sel).first();
        if (await btn.isVisible({ timeout: 500 }).catch(() => false)) {
          await btn.click();
          await page.waitForTimeout(500);
          break;
        }
      }
    } catch (e) {}

    await page.screenshot({ path: localPath, type: 'jpeg', quality: 75 });
    await page.close();

    const result = await cloudinary.uploader.upload(localPath, {
      folder: 'blog-screenshots',
      public_id: name,
      overwrite: true,
      resource_type: 'image',
    });

    fs.unlinkSync(localPath);
    console.log(`OK: ${name} (${(result.bytes / 1024).toFixed(0)} Ko)`);
    return { name, status: 'ok' };
  } catch (err) {
    console.error(`FAIL: ${name} - ${err.message}`);
    try { fs.unlinkSync(localPath); } catch (e) {}
    return { name, status: 'fail', error: err.message };
  }
}

async function main() {
  const browser = await chromium.launch();
  const results = [];

  for (let i = 0; i < SCREENSHOTS.length; i += 3) {
    const batch = SCREENSHOTS.slice(i, i + 3);
    console.log(`\n--- Batch ${Math.floor(i/3) + 1}/${Math.ceil(SCREENSHOTS.length/3)} ---`);
    const batchResults = await Promise.all(batch.map(s => takeAndUpload(browser, s)));
    results.push(...batchResults);
  }

  await browser.close();

  const failed = results.filter(r => r.status === 'fail');
  console.log(`\n=== DONE: ${results.length - failed.length}/${results.length} OK ===`);
  if (failed.length > 0) {
    console.log('Failed:', failed.map(f => f.name).join(', '));
  }
}

main().catch(console.error);
