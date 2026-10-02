// presentacion.html -> presentacion-sin-metadatos.pdf (Chromium vía Playwright).
import { chromium } from 'playwright';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const dir = path.dirname(fileURLToPath(import.meta.url));
const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto(`file://${dir}/presentacion.html`);
await page.evaluate(() => document.fonts.ready);
await page.waitForTimeout(500);
await page.pdf({ path: `${dir}/presentacion-sin-metadatos.pdf`, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log('PDF generado');
