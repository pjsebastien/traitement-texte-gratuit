require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Config Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function takeScreenshot(url, fileName, options = {}) {
  const localPath = path.resolve(fileName);
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: options.width || 1200, height: options.height || 630 },
    locale: 'fr-FR',
    extraHTTPHeaders: { 'Accept-Language': 'fr-FR,fr;q=0.9' }
  });

  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(4000);

  // Fermer popups/cookies
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

  // Scroll vers une section si demandé
  if (options.scrollTo) {
    await page.evaluate((selector) => {
      const el = document.querySelector(selector);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, options.scrollTo);
    await page.waitForTimeout(1000);
  }

  // Capture locale
  await page.screenshot({
    path: localPath,
    fullPage: options.fullPage || false,
    type: localPath.endsWith('.png') ? 'png' : 'jpeg',
    quality: localPath.endsWith('.png') ? undefined : (options.quality || 75),
  });

  // Métadonnées pour vérification
  const title = await page.title();
  const metaDesc = await page.$eval('meta[name="description"]', el => el.content).catch(() => '');
  const h1 = await page.$eval('h1', el => el.textContent.trim()).catch(() => '');
  const lang = await page.$eval('html', el => el.getAttribute('lang') || '').catch(() => '');

  await browser.close();

  // Upload sur Cloudinary
  const folder = options.folder || 'blog-screenshots';
  const publicId = path.basename(fileName, path.extname(fileName));

  const uploadResult = await cloudinary.uploader.upload(localPath, {
    folder: folder,
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });

  // Supprimer le fichier local après upload
  fs.unlinkSync(localPath);

  return {
    url,
    title,
    h1,
    lang,
    metaDesc: metaDesc.substring(0, 200),
    cloudinary_url: uploadResult.secure_url,
    public_id: uploadResult.public_id,
    fileSize: `${(uploadResult.bytes / 1024).toFixed(0)} Ko`,
    format: uploadResult.format,
    dimensions: `${uploadResult.width}x${uploadResult.height}`,
  };
}

// --- CLI ---
const args = process.argv.slice(2);
if (args.length === 0) {
  console.log('Usage: node screenshot.js <url> [nom-fichier.jpg] [--full] [--folder=blog-screenshots] [--width=1200] [--height=630]');
  process.exit(1);
}

const url = args[0];
const flags = args.filter(a => a.startsWith('--'));
const outputArg = args.find((a, i) => i > 0 && !a.startsWith('--'));
const output = outputArg || 'screenshot.jpg';

const options = {
  fullPage: flags.includes('--full'),
  width: parseInt((flags.find(f => f.startsWith('--width=')) || '').split('=')[1]) || 1200,
  height: parseInt((flags.find(f => f.startsWith('--height=')) || '').split('=')[1]) || 630,
  quality: parseInt((flags.find(f => f.startsWith('--quality=')) || '').split('=')[1]) || 75,
  folder: (flags.find(f => f.startsWith('--folder=')) || '').split('=')[1] || 'blog-screenshots',
  scrollTo: (flags.find(f => f.startsWith('--scroll=')) || '').split('=')[1] || null,
};

takeScreenshot(url, output, options)
  .then(info => console.log(JSON.stringify(info, null, 2)))
  .catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
