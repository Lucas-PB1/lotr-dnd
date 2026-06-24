import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { PDFParse } from 'pdf-parse';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PDF_PATH = path.join(__dirname, '../Lord Of The Rings Roleplay.pdf');

if (!fs.existsSync(PDF_PATH)) {
  console.error('PDF não encontrado:', PDF_PATH);
  console.error('Coloque o arquivo do livro na raiz do projeto (uso local, não versionado).');
  process.exit(1);
}

const buf = fs.readFileSync(PDF_PATH);
const parser = new PDFParse({ data: buf });
const result = await parser.getText();
const text = result.text;
await parser.destroy();

const keywords = [
  'Creating Your Character',
  'CREATING YOUR CHARACTER',
  'Choose a Culture',
  'Choose a Calling',
  'Determine Ability Scores',
  'Distinctive Features',
  'Cultural Blessing',
  'Shadow Path',
  'Virtues',
  'Advantages',
  'Fellowship',
  'Hope',
  'Level 1',
  'Point Buy',
  'Standard Array',
];

const out = [];
for (const k of keywords) {
  let idx = 0;
  while ((idx = text.indexOf(k, idx)) !== -1) {
    out.push({ keyword: k, index: idx, context: text.slice(idx, idx + 120) });
    idx += k.length;
  }
}

const outPath = path.join(__dirname, 'pdf-extract.txt');
fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
console.log(`Encontradas ${out.length} ocorrências → ${outPath}`);
