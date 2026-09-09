import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const out = 'out';
const html = readFileSync(join(out, 'zh.html'), 'utf8');

const checks = {
  ad_sense_removed: !html.includes('adsbygoogle') && !html.includes('ca-pub'),
  consent_loader: html.includes('window.__applyConsent'),
  gtag_id: html.includes('googletagmanager.com/gtag/js?id=G-HXM22WWPKP'),
  ohs_block: html.includes('openingHoursSpecification'),
  streetAddress: html.includes('вулиця Глісерна, 1'),
  schema_types: html.includes('Park') && html.includes('TouristAttraction'),
  faq_page: html.includes('FAQPage'),
  rating: html.includes('4.2') && html.includes('11833'),
  maps_share: html.includes('WoyEp1gowNMDoEnNA'),
  new_embed: html.includes('!1d9525.070909876487'),
  old_embed_gone: !html.includes('!1d14667.911393817127'),
  canonical: html.includes('<link rel="canonical" href="https://dubovyyhay.com/zh'),
};

for (const [k, v] of Object.entries(checks)) console.log((v ? 'PASS' : 'FAIL'), k);
console.log('bytes:', html.length);

const manifest = readFileSync(join(out, 'manifest.webmanifest'), 'utf8');
console.log('manifest /zh:', manifest.includes('"start_url": "/zh"'));
const sw = readFileSync(join(out, 'sw.js'), 'utf8');
console.log('sw v2 + /zh/:', sw.includes('dubovyy-hay-v2') && sw.includes("'/zh/'"));

const count = (name) => {
  const files = readFileSync(join(out, name), 'utf8');
  return files.split('<url>').length - 1;
};
console.log('sitemap urls:', count('sitemap.xml'));
