require('dotenv').config({ path: '.env.local' });
const { chromium } = require('playwright');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const SCREENSHOTS = [
  { url: "https://1password.com/fr", name: "1password-home" },
  { url: "https://www.activecampaign.com/fr", name: "activecampaign-home" },
  { url: "https://bigbluebutton.org/", name: "bigbluebutton-home" },
  { url: "https://briarproject.org/", name: "briar-home" },
  { url: "https://chromeenterprise.google/os/chromeosflex/", name: "chromeos-flex-home" },
  { url: "https://copilot.microsoft.com/", name: "copilot-home" },
  { url: "https://discord.com/", name: "discord-home" },
  { url: "https://element.io/", name: "element-home" },
  { url: "https://www.emclient.com/", name: "em-client-home" },
  { url: "https://galliumos.org/", name: "galliumos-home" },
  { url: "https://gemini.google.com/", name: "gemini-home" },
  { url: "https://mail.google.com/", name: "gmail-home" },
  { url: "https://workspace.google.com/products/chat/", name: "google-chat-home" },
  { url: "https://meet.google.com/", name: "google-meet-home" },
  { url: "https://grapheneos.org/", name: "grapheneos-home" },
  { url: "https://www.ilovepdf.com/fr", name: "ilovepdf-home" },
  { url: "https://www.apple.com/fr/ios/", name: "ios-home" },
  { url: "https://www.jasper.ai/", name: "jasper-home" },
  { url: "https://www.atlassian.com/fr/software/jira", name: "jira-home" },
  { url: "https://jitsi.org/", name: "jitsi-home" },
  { url: "https://joplinapp.org/", name: "joplin-home" },
  { url: "https://keepass.info/", name: "keepass-home" },
  { url: "https://fr.libreoffice.org/", name: "libreoffice-home" },
  { url: "https://listmonk.app/", name: "listmonk-home" },
  { url: "https://lubuntu.me/", name: "lubuntu-home" },
  { url: "https://www.getmailspring.com/", name: "mailspring-home" },
  { url: "https://mattermost.com/", name: "mattermost-home" },
  { url: "https://mega.io/fr", name: "mega-home" },
  { url: "https://chat.mistral.ai/", name: "mistral-home" },
  { url: "https://www.pcloud.com/fr/", name: "pcloud-home" },
  { url: "https://www.pennylane.com/fr", name: "pennylane-home" },
  { url: "https://penpot.app/", name: "penpot-home" },
  { url: "https://peppermintos.com/", name: "peppermintos-home" },
  { url: "https://www.pipedrive.com/fr", name: "pipedrive-home" },
  { url: "https://www.microsoft.com/fr-fr/microsoft-365/powerpoint", name: "powerpoint-home" },
  { url: "https://www.prestashop.com/fr", name: "prestashop-home" },
  { url: "https://proton.me/fr/pass", name: "protonpass-home" },
  { url: "https://quickbooks.intuit.com/fr/", name: "quickbooks-home" },
  { url: "https://www.rocket.chat/", name: "rocketchat-home" },
  { url: "https://sendgrid.com/", name: "sendgrid-home" },
  { url: "https://getsession.org/", name: "session-home" },
  { url: "https://threema.ch/fr", name: "threema-home" },
  { url: "https://www.thunderbird.net/fr/", name: "thunderbird-home" },
  { url: "https://todoist.com/fr", name: "todoist-home" },
  { url: "https://tresorit.com/fr", name: "tresorit-home" },
  { url: "https://tuta.com/fr", name: "tutanota-home" },
  { url: "https://whereby.com/", name: "whereby-home" },
  { url: "https://wire.com/", name: "wire-home" },
  { url: "https://fr.wix.com/", name: "wix-home" },
  { url: "https://woocommerce.com/fr-fr/", name: "woocommerce-home" },
  { url: "https://wordpress.org/", name: "wordpress-home" },
  { url: "https://writesonic.com/", name: "writesonic-home" },
  { url: "https://www.zoho.com/fr/crm/", name: "zoho-crm-home" },
  { url: "https://www.zoho.com/fr/mail/", name: "zoho-mail-home" },
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

  // Process 3 at a time to avoid overloading
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
