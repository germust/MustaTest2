// placas.html -> png/MC-XX.png (1080 x 1080) y vista-general.png (las 12 juntas, para revisar).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
fs.mkdirSync(`${dir}/png`, { recursive: true });
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 1200 }, deviceScaleFactor: 1 });
await page.goto(`file://${dir}/placas.html`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(400);
const codes = await page.$$eval('.placa', (els) => els.map((e) => e.dataset.code));
for (const code of codes) {
  await page.locator(`.placa[data-code="${code}"]`).screenshot({ path: `${dir}/png/${code}.png` });
}
// Vista general: 4 columnas x 3 filas, a 360 px cada placa.
const imgs = codes.map((c) => `<img src="png/${c}.png">`).join('');
fs.writeFileSync(`${dir}/vista-general.html`, `<style>body{margin:0;padding:24px;background:#e6eeee;display:grid;grid-template-columns:repeat(4,360px);gap:24px}img{width:360px;height:360px;border-radius:18px;display:block}</style>${imgs}`);
await page.setViewportSize({ width: 4 * 360 + 5 * 24, height: 3 * 360 + 4 * 24 });
await page.goto(`file://${dir}/vista-general.html`);
await page.waitForTimeout(400);
await page.screenshot({ path: `${dir}/vista-general.png`, fullPage: true });
fs.unlinkSync(`${dir}/vista-general.html`);
await browser.close();
console.log(`${codes.length} placas generadas`);
