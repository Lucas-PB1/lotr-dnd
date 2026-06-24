/**
 * OCR do Cap. 4 — Equipment (PDF págs. 71–79).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';
import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.join(__dirname, '../Lord Of The Rings Roleplay.pdf');
const OUT_DIR = path.join(__dirname, '../data/extracted');

const START_PAGE = 71;
const END_PAGE = 79;

async function ocrPageImage(buffer) {
  const { data } = await Tesseract.recognize(buffer, 'eng', { logger: () => {} });
  return data.text.trim();
}

async function main() {
  if (!fs.existsSync(PDF_PATH)) {
    console.error('PDF não encontrado:', PDF_PATH);
    process.exit(1);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const buf = fs.readFileSync(PDF_PATH);
  const parser = new PDFParse({ data: buf });
  const info = await parser.getInfo();
  const totalPages = info.total;
  const endPage = Math.min(END_PAGE, totalPages);

  console.log(`PDF: ${totalPages} páginas. Equipment OCR ${START_PAGE}–${endPage}...`);

  const nativeParser = new PDFParse({ data: buf });
  const native = await nativeParser.getText({
    partial: Array.from({ length: endPage - START_PAGE + 1 }, (_, i) => START_PAGE + i),
  });
  await nativeParser.destroy();

  const pages = [];
  for (let pageNum = START_PAGE; pageNum <= endPage; pageNum++) {
    const nativePage = native.pages.find((p) => p.num === pageNum);
    const nativeText = nativePage?.text?.trim() ?? '';

    if (nativeText.length > 200) {
      console.log(`Pág ${pageNum}: texto nativo (${nativeText.length} chars)`);
      pages.push({ page: pageNum, source: 'native', text: nativeText, chars: nativeText.length });
      continue;
    }

    console.log(`Pág ${pageNum}: OCR...`);
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
    console.log(`Pág ${pageNum}: OCR ok (${ocrText.length} chars)`);
    pages.push({ page: pageNum, source: 'ocr', text: ocrText, chars: ocrText.length });
  }

  await parser.destroy();

  const combined = pages
    .map((p) => `\n\n===== PÁGINA ${p.page} (${p.source}) =====\n\n${p.text}`)
    .join('\n');

  fs.writeFileSync(path.join(OUT_DIR, 'equipment-ocr.txt'), combined, 'utf8');
  fs.writeFileSync(
    path.join(OUT_DIR, 'equipment-ocr.json'),
    JSON.stringify(
      { pdfPath: PDF_PATH, startPage: START_PAGE, endPage: endPage, totalPages, pages },
      null,
      2,
    ),
    'utf8',
  );

  console.log('\nConcluído!');
  console.log(`Total chars: ${pages.reduce((s, p) => s + p.chars, 0)}`);
  console.log(`→ ${path.join(OUT_DIR, 'equipment-ocr.txt')}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
