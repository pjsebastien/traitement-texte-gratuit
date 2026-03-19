require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Design config per category
const CATEGORY_STYLES = {
  'ia': {
    gradient: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 100%)',
    accent: '#818cf8',
    icon: '🧠',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(129,140,248,0.15) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(168,85,247,0.1) 0%, transparent 50%)',
    badge: 'Intelligence Artificielle',
  },
  'alternatives': {
    gradient: 'linear-gradient(135deg, #0c4a6e 0%, #075985 40%, #0369a1 100%)',
    accent: '#38bdf8',
    icon: '🔄',
    pattern: 'radial-gradient(circle at 75% 25%, rgba(56,189,248,0.12) 0%, transparent 50%), radial-gradient(circle at 25% 75%, rgba(14,165,233,0.1) 0%, transparent 50%)',
    badge: 'Alternatives',
  },
  'traitement-de-texte': {
    gradient: 'linear-gradient(135deg, #14532d 0%, #166534 40%, #15803d 100%)',
    accent: '#4ade80',
    icon: '📝',
    pattern: 'radial-gradient(circle at 70% 30%, rgba(74,222,128,0.12) 0%, transparent 50%), radial-gradient(circle at 30% 70%, rgba(34,197,94,0.1) 0%, transparent 50%)',
    badge: 'Traitement de texte',
  },
  'outils-seo': {
    gradient: 'linear-gradient(135deg, #7c2d12 0%, #9a3412 40%, #c2410c 100%)',
    accent: '#fb923c',
    icon: '🔍',
    pattern: 'radial-gradient(circle at 80% 20%, rgba(251,146,60,0.12) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(249,115,22,0.1) 0%, transparent 50%)',
    badge: 'Outils SEO',
  },
  'productivite': {
    gradient: 'linear-gradient(135deg, #581c87 0%, #6b21a8 40%, #7e22ce 100%)',
    accent: '#c084fc',
    icon: '⚡',
    pattern: 'radial-gradient(circle at 75% 25%, rgba(192,132,252,0.12) 0%, transparent 50%), radial-gradient(circle at 25% 75%, rgba(168,85,247,0.1) 0%, transparent 50%)',
    badge: 'Productivité',
  },
};

function generateHTML(title, category) {
  const style = CATEGORY_STYLES[category] || CATEGORY_STYLES['alternatives'];

  // Adaptive font size based on title length
  let fontSize = '88px';
  let lineHeight = '1.1';

  if (title.length > 70) {
    fontSize = '62px';
    lineHeight = '1.15';
  } else if (title.length > 55) {
    fontSize = '70px';
    lineHeight = '1.12';
  } else if (title.length > 40) {
    fontSize = '80px';
    lineHeight = '1.1';
  }

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: 1200px;
    height: 630px;
    font-family: 'Inter', -apple-system, sans-serif;
    overflow: hidden;
  }

  .container {
    width: 100%;
    height: 100%;
    background: ${style.gradient};
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 60px 80px;
  }

  .pattern {
    position: absolute;
    inset: 0;
    background: ${style.pattern};
  }

  /* Decorative grid lines */
  .grid-lines {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
  }

  /* Decorative circles */
  .circle-1 {
    position: absolute;
    right: -80px;
    top: -80px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.06);
  }
  .circle-2 {
    position: absolute;
    right: -30px;
    top: -30px;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.04);
  }
  .circle-3 {
    position: absolute;
    left: -100px;
    bottom: -100px;
    width: 350px;
    height: 350px;
    border-radius: 50%;
    border: 1px solid rgba(255,255,255,0.05);
  }

  .content {
    position: relative;
    z-index: 2;
    max-width: 1000px;
    text-align: center;
  }

  .badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(255,255,255,0.1);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.15);
    border-radius: 50px;
    padding: 10px 22px;
    font-size: 16px;
    font-weight: 600;
    color: ${style.accent};
    margin-bottom: 30px;
    letter-spacing: 0.02em;
  }

  .badge-icon {
    font-size: 20px;
  }

  .title {
    font-size: ${fontSize};
    font-weight: 800;
    color: #ffffff;
    line-height: ${lineHeight};
    letter-spacing: -0.02em;
    text-shadow: 0 2px 20px rgba(0,0,0,0.3);
    max-width: 850px;
  }

  .accent-line {
    width: 80px;
    height: 4px;
    background: ${style.accent};
    border-radius: 2px;
    margin: 30px auto 0;
  }

  .site-name {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 12px;
    z-index: 2;
  }

  .site-logo {
    width: 36px;
    height: 36px;
    background: linear-gradient(135deg, #3b82f6, #7c3aed);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .site-logo svg {
    width: 20px;
    height: 20px;
  }

  .site-text {
    font-size: 15px;
    font-weight: 600;
    color: rgba(255,255,255,0.6);
    letter-spacing: 0.01em;
  }
</style>
</head>
<body>
  <div class="container">
    <div class="pattern"></div>
    <div class="grid-lines"></div>
    <div class="circle-1"></div>
    <div class="circle-2"></div>
    <div class="circle-3"></div>

    <div class="content">
      <div class="badge">
        <span class="badge-icon">${style.icon}</span>
        ${style.badge}
      </div>
      <h1 class="title">${title}</h1>
      <div class="accent-line"></div>
    </div>

    <div class="site-name">
      <div class="site-logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
          <polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      </div>
      <span class="site-text">traitement-de-texte-gratuit.fr</span>
    </div>
  </div>
</body>
</html>`;
}

async function generateThumbnail(slug) {
  // Read article frontmatter
  const articlePath = path.join(process.cwd(), 'content', 'articles', `${slug}.mdx`);
  if (!fs.existsSync(articlePath)) {
    console.error(`Article not found: ${slug}`);
    process.exit(1);
  }

  const raw = fs.readFileSync(articlePath, 'utf-8');
  const { data } = matter(raw);
  const title = data.title;
  const category = data.category;

  console.log(`Generating thumbnail for: "${title}" [${category}]`);

  const html = generateHTML(title, category);
  const htmlPath = path.join(process.cwd(), `_thumb_${slug}.html`);
  const imgPath = path.join(process.cwd(), `_thumb_${slug}.jpg`);

  fs.writeFileSync(htmlPath, html);

  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1200, height: 630 },
  });

  await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000); // Wait for font loading

  await page.screenshot({
    path: imgPath,
    type: 'jpeg',
    quality: 90,
  });

  await browser.close();
  fs.unlinkSync(htmlPath);

  // Upload to Cloudinary
  const publicId = `thumb-${slug}`;
  const result = await cloudinary.uploader.upload(imgPath, {
    folder: 'blog-thumbnails',
    public_id: publicId,
    overwrite: true,
    resource_type: 'image',
  });

  fs.unlinkSync(imgPath);

  console.log(`Uploaded: ${result.secure_url}`);
  console.log(`Size: ${(result.bytes / 1024).toFixed(0)} Ko`);
  console.log(`Public ID: ${result.public_id}`);

  return result;
}

// CLI
const slug = process.argv[2];
if (!slug) {
  console.log('Usage: node generate-thumbnail.js <article-slug>');
  console.log('       node generate-thumbnail.js --all');
  process.exit(1);
}

if (slug === '--all') {
  const articlesDir = path.join(process.cwd(), 'content', 'articles');
  const slugs = fs.readdirSync(articlesDir)
    .filter(f => f.endsWith('.mdx'))
    .map(f => f.replace(/\.mdx$/, ''));

  (async () => {
    const browser = await chromium.launch();
    let ok = 0, fail = 0;

    for (const s of slugs) {
      try {
        const articlePath = path.join(articlesDir, `${s}.mdx`);
        const raw = fs.readFileSync(articlePath, 'utf-8');
        const { data } = matter(raw);

        const html = generateHTML(data.title, data.category);
        const htmlPath = path.join(process.cwd(), `_thumb_${s}.html`);
        const imgPath = path.join(process.cwd(), `_thumb_${s}.jpg`);

        fs.writeFileSync(htmlPath, html);

        const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
        await page.goto(`file://${htmlPath.replace(/\\/g, '/')}`, { waitUntil: 'networkidle' });
        await page.waitForTimeout(800);
        await page.screenshot({ path: imgPath, type: 'jpeg', quality: 90 });
        await page.close();
        fs.unlinkSync(htmlPath);

        const result = await cloudinary.uploader.upload(imgPath, {
          folder: 'blog-thumbnails',
          public_id: `thumb-${s}`,
          overwrite: true,
          resource_type: 'image',
        });

        fs.unlinkSync(imgPath);
        ok++;
        console.log(`OK: ${s} (${(result.bytes / 1024).toFixed(0)} Ko)`);
      } catch (err) {
        fail++;
        console.error(`FAIL: ${s} - ${err.message}`);
      }
    }

    await browser.close();
    console.log(`\n=== DONE: ${ok}/${ok + fail} OK ===`);
  })();
} else {
  generateThumbnail(slug).catch(err => {
    console.error('Error:', err.message);
    process.exit(1);
  });
}
