/**
 * OCR — Rewards (p.78+) e Treasure Index (p.129+).
 * Páginas PDF: 78–85 e 125–140.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';
import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { RULEBOOK_PATH, RULEBOOK_REL } from './docPaths.mjs';

const OUT_DIR = path.join(__dirname, '../data/extracted');

const PAGE_RANGES = [
  { label: 'rewards', start: 78, end: 85 },
  { label: 'treasure_index', start: 125, end: 140 },
];

async function ocrPageImage(buffer) {
  const { data } = await Tesseract.recognize(buffer, 'eng', { logger: () => {} });
  return data.text.trim();
}

async function extractRange(buf, startPage, endPage, totalPages) {
  const end = Math.min(endPage, totalPages);
  const pageNums = [];
  for (let p = startPage; p <= end; p++) pageNums.push(p);

  const nativeParser = new PDFParse({ data: buf });
  const native = await nativeParser.getText({ partial: pageNums });
  await nativeParser.destroy();

  const pages = [];
  for (const pageNum of pageNums) {
    const nativePage = native.pages.find((p) => p.num === pageNum);
    const nativeText = nativePage?.text?.trim() ?? '';

    if (nativeText.length > 200) {
      console.log(`  Pág ${pageNum}: texto nativo (${nativeText.length} chars)`);
      pages.push({ page: pageNum, source: 'native', text: nativeText, chars: nativeText.length });
      continue;
    }

    console.log(`  Pág ${pageNum}: OCR...`);
    const screenshotParser = new PDFParse({ data: buf });
    const shot = await screenshotParser.getScreenshot({
      partial: [pageNum],
      desiredWidth: 2000,
      imageBuffer: true,
    });
    await screenshotParser.destroy();

    const pageShot = shot.pages[0];
    if (!pageShot?.data?.length) {
      pages.push({ page: pageNum, source: 'empty', text: '', chars: 0 });
      continue;
    }

    const ocrText = await ocrPageImage(Buffer.from(pageShot.data));
    console.log(`  Pág ${pageNum}: OCR ok (${ocrText.length} chars)`);
    pages.push({ page: pageNum, source: 'ocr', text: ocrText, chars: ocrText.length });
  }

  return pages;
}

async function main() {
  if (!fs.existsSync(RULEBOOK_PATH)) {
    console.error('PDF não encontrado:', RULEBOOK_PATH);
    console.error('Coloque o livro em doc/senhor-dos-aneis-rpg-regras.pdf (veja README).');
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const buf = fs.readFileSync(RULEBOOK_PATH);
  const parser = new PDFParse({ data: buf });
  const info = await parser.getInfo();
  const totalPages = info.total;
  await parser.destroy();

  console.log(`PDF: ${totalPages} páginas.`);

  const allPages = [];
  for (const range of PAGE_RANGES) {
    console.log(`\nExtraindo ${range.label} (${range.start}–${range.end})...`);
    const pages = await extractRange(buf, range.start, range.end, totalPages);
    allPages.push(...pages.map((p) => ({ ...p, section: range.label })));
  }

  const combined = allPages
    .map((p) => `\n\n===== PÁGINA ${p.page} [${p.section}] (${p.source}) =====\n\n${p.text}`)
    .join('\n');

  fs.writeFileSync(path.join(OUT_DIR, 'treasure-ocr.txt'), combined, 'utf8');
  fs.writeFileSync(
    path.join(OUT_DIR, 'treasure-ocr.json'),
    JSON.stringify({ pdfPath: RULEBOOK_REL, totalPages, pages: allPages }, null, 2),
    'utf8',
  );

  console.log('\nConcluído!');
  console.log(`Total chars: ${allPages.reduce((s, p) => s + p.chars, 0)}`);
  console.log(`→ ${path.join(OUT_DIR, 'treasure-ocr.txt')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
