/**
 * Extrai texto do PDF escaneado via OCR (Tesseract.js).
 * Foco: Capítulo 3 — Criação de Personagem (páginas do livro ~25–68).
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';
import Tesseract from 'tesseract.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
import { RULEBOOK_PATH, RULEBOOK_REL } from './docPaths.mjs';

const OUT_DIR = path.join(__dirname, '../data/extracted');

// Intervalo inicial: páginas do PDF (ajustável após mapeamento)
const START_PAGE = 20;
const END_PAGE = 75;

async function ocrPageImage(buffer) {
  const { data } = await Tesseract.recognize(buffer, 'eng', {
    logger: () => {},
  });
  return data.text.trim();
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

  console.log(`PDF: ${totalPages} páginas. OCR de ${START_PAGE} a ${END_PAGE}...`);

  const pageStats = [];
  const textResult = await parser.getText({ first: 0, last: 0, partial: [] });
  // get per-page native text first
  const nativeParser = new PDFParse({ data: buf });
  const native = await nativeParser.getText({
    partial: Array.from({ length: END_PAGE - START_PAGE + 1 }, (_, i) => START_PAGE + i),
  });
  await nativeParser.destroy();

  const pages = [];
  for (let pageNum = START_PAGE; pageNum <= END_PAGE; pageNum++) {
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
      desiredWidth: 1800,
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

  const combined = pages.map((p) => `\n\n===== PÁGINA ${p.page} (${p.source}) =====\n\n${p.text}`).join('\n');

  fs.writeFileSync(path.join(OUT_DIR, 'character-creation-ocr.txt'), combined, 'utf8');
  fs.writeFileSync(
    path.join(OUT_DIR, 'character-creation-ocr.json'),
    JSON.stringify({ pdfPath: RULEBOOK_REL, startPage: START_PAGE, endPage: END_PAGE, totalPages, pages }, null, 2),
    'utf8',
  );

  const stats = pages.map((p) => ({ page: p.page, source: p.source, chars: p.chars }));
  fs.writeFileSync(path.join(OUT_DIR, 'page-stats.json'), JSON.stringify(stats, null, 2), 'utf8');

  console.log('\nConcluído!');
  console.log(`Total chars: ${pages.reduce((s, p) => s + p.chars, 0)}`);
  console.log(`Arquivos em: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
