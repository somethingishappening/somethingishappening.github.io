import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const baseUrl = process.env.BASE_URL || 'http://127.0.0.1:4173';
const requestedEntry = (process.env.ENTRY_PATH || '').trim();

// These are the desktop/laptop/TV checkpoints used for Harri.la responsive testing.
// Mobile is intentionally excluded because the mobile navigation is a separate design.
const viewports = [
  [1024, 768, '1024×768'],
  [1280, 720, '1280×720'],
  [1366, 768, '1366×768'],
  [1440, 900, '1440×900'],
  [1512, 982, '1512×982'],
  [1680, 900, '1680×900'],
  [1680, 1050, '1680×1050'],
  [1728, 1117, 'MacBook Pro 16″ — 1728×1117'],
  [1920, 1080, '1920×1080'],
  [1920, 1200, '1920×1200'],
  [2560, 1440, '2560×1440'],
  [3440, 1440, '3440×1440'],
  [3840, 2160, '3840×2160'],
  [4096, 2304, '4096×2304'],
  [5120, 2880, '5120×2880'],
];

function researchUrlFromEntry(entryPath) {
  const normalized = entryPath.replaceAll('\\', '/');
  if (!normalized.startsWith('_research/')) {
    throw new Error(`Expected a Research entry path under _research/, received: ${entryPath}`);
  }
  const slug = path.basename(normalized).replace(/\.(md|markdown|html)$/i, '');
  return `/research/${encodeURIComponent(slug)}/`;
}

function discoverResearchEntries() {
  return fs.readdirSync('_research')
    .filter((name) => /\.(md|markdown|html)$/i.test(name))
    .map((name) => `_research/${name}`)
    .sort();
}

const entries = requestedEntry ? [requestedEntry] : discoverResearchEntries();
const browser = await chromium.launch({ headless: true });
let failures = [];
let checked = 0;

try {
  for (const entry of entries) {
    const researchPath = researchUrlFromEntry(entry);

    for (const [width, height, viewportName] of viewports) {
      const context = await browser.newContext({ viewport: { width, height } });
      const page = await context.newPage();

      // Visit About first in the SAME browser context. This lets the site's existing
      // Mini-CV/Research fit logic establish the exact viewport-specific typography
      // multiplier in sessionStorage, just as it does for a visitor entering via About.
      await page.goto(`${baseUrl}/about/`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; });
      await page.waitForTimeout(60);

      await page.goto(`${baseUrl}${researchPath}`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => { await document.fonts.ready; });
      await page.waitForTimeout(120);

      const result = await page.evaluate(() => {
        const toc = document.querySelector('.toc');
        if (!toc) return { error: 'Research navigation (.toc) was not found.' };

        const links = [...toc.querySelectorAll('a[data-section]')];
        return {
          tocWidth: toc.getBoundingClientRect().width,
          labels: links.map((el) => {
            const range = document.createRange();
            range.selectNodeContents(el);
            const textWidth = range.getBoundingClientRect().width;
            const availableWidth = el.getBoundingClientRect().width;
            const cs = getComputedStyle(el);
            return {
              text: (el.textContent || '').trim(),
              section: el.getAttribute('data-section') || '',
              textWidth,
              availableWidth,
              fontSize: cs.fontSize,
              fontWeight: cs.fontWeight,
              overflow: textWidth > availableWidth + 0.5,
            };
          }),
        };
      });

      if (result.error) {
        failures.push({ entry, viewportName, error: result.error });
      } else {
        checked += result.labels.length;
        for (const label of result.labels) {
          if (label.overflow) {
            failures.push({
              entry,
              viewportName,
              width,
              height,
              ...label,
            });
          }
        }
      }

      await context.close();
    }
  }
} finally {
  await browser.close();
}

const uniqueFailures = [];
const seen = new Set();
for (const f of failures) {
  const key = `${f.entry}|${f.viewportName}|${f.section}|${f.text}|${f.error || ''}`;
  if (!seen.has(key)) {
    seen.add(key);
    uniqueFailures.push(f);
  }
}

const summaryPath = process.env.GITHUB_STEP_SUMMARY;
const lines = [];
lines.push('# Research navigation label check');
lines.push('');
lines.push(`Checked **${entries.length}** Research project(s) at **${viewports.length}** laptop/desktop/TV resolutions.`);
lines.push('');

if (uniqueFailures.length === 0) {
  lines.push('✅ **All navigation labels fit inside their columns at every tested resolution.**');
  lines.push('');
  lines.push(`Measured ${checked} rendered label instances using the actual Research page, Geist font, current three-column rail, and viewport-specific site/CV scaling.`);
  console.log('PASS: all Research navigation labels fit at every supported desktop resolution.');
} else {
  lines.push('❌ **One or more navigation labels exceed the available navigation-column width.**');
  lines.push('');
  lines.push('| Project | Resolution | Label | Needs | Available |');
  lines.push('|---|---:|---|---:|---:|');
  for (const f of uniqueFailures) {
    if (f.error) {
      lines.push(`| ${f.entry} | ${f.viewportName} | ${f.error} | — | — |`);
      console.error(`ERROR ${f.entry} @ ${f.viewportName}: ${f.error}`);
      continue;
    }
    const need = `${f.textWidth.toFixed(1)}px`;
    const have = `${f.availableWidth.toFixed(1)}px`;
    lines.push(`| ${f.entry} | ${f.viewportName} | ${String(f.text).replaceAll('|', '\\|')} | ${need} | ${have} |`);
    console.error(
      `TOO WIDE: "${f.text}" in ${f.entry} at ${f.viewportName} ` +
      `(needs ${need}, column ${have})`
    );
    console.log(
      `::error title=Research nav label too wide::${f.entry} — "${f.text}" ` +
      `needs ${need}, but its column is ${have} at ${f.viewportName}. ` +
      `Use the CMS Navigation label field to shorten it.`
    );
  }
  lines.push('');
  lines.push('Shorten the flagged item using **Navigation label (optional)** in the Research article section. The article heading itself can remain unchanged.');
}

if (summaryPath) fs.appendFileSync(summaryPath, `${lines.join('\n')}\n`);
else console.log(lines.join('\n'));

if (uniqueFailures.length > 0) process.exit(1);
