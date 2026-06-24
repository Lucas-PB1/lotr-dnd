import fs from 'fs';
import { PDFParse } from 'pdf-parse';

const buf = fs.readFileSync('d:/Projetos/senhor dos aneis/Lord Of The Rings Roleplay.pdf');
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
  let count = 0;
  while (count < 2) {
    const i = text.indexOf(k, idx);
    if (i < 0) break;
    out.push(`\n========== ${k} (#${count + 1}) ==========\n`);
    out.push(text.slice(Math.max(0, i - 100), i + 3000));
    idx = i + k.length;
    count++;
  }
}

out.push(`\n\nTOTAL CHARS: ${text.length}, PAGES: ${result.pages?.length ?? '?'}`);

// Also dump table of contents area
const tocIdx = text.indexOf('Contents');
if (tocIdx >= 0) {
  out.push('\n========== CONTENTS ==========\n');
  out.push(text.slice(tocIdx, tocIdx + 4000));
}

fs.writeFileSync('scripts/pdf-extract.txt', out.join('\n'), 'utf8');
console.log('Written scripts/pdf-extract.txt, chars:', text.length);
