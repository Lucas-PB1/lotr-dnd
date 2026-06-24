/**
 * Gera character-creation-data.json a partir dos dados TypeScript
 * e valida presença de termos-chave no OCR extraído.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.join(__dirname, '../data/extracted/character-creation-data.json');
const OCR_PATH = path.join(__dirname, '../data/extracted/character-creation-ocr.txt');

const dataModule = await import(
  pathToFileURL(path.join(__dirname, '../src/shared/data/characterCreationData.ts')).href
);

const { HEROIC_CULTURES, CALLINGS } = dataModule;

const payload = {
  source: 'Lord Of The Rings Roleplay — Cap. 3 (validado com OCR pág. 20–75)',
  extractedAt: new Date().toISOString(),
  cultures: HEROIC_CULTURES,
  callings: CALLINGS,
  creationOrder: ['culture', 'subculture', 'background', 'calling', 'abilityScores', 'equipment'],
};

fs.writeFileSync(OUT, JSON.stringify(payload, null, 2), 'utf8');

let ocrValidation = { found: [], missing: [] };
if (fs.existsSync(OCR_PATH)) {
  const ocr = fs.readFileSync(OCR_PATH, 'utf8').toLowerCase();
  const terms = [
    'bardings',
    'dwarves',
    'hobbits',
    'rangers',
    'captain',
    'champion',
    'messenger',
    'scholar',
    'treasure hunter',
    'warden',
    'ability score increase',
    'backgrounds',
    'shadow path',
  ];
  for (const t of terms) {
    (ocr.includes(t) ? ocrValidation.found : ocrValidation.missing).push(t);
  }
  fs.writeFileSync(
    path.join(__dirname, '../data/extracted/ocr-validation.json'),
    JSON.stringify(ocrValidation, null, 2),
    'utf8',
  );
}

console.log('Gerado:', OUT);
console.log('Culturas:', HEROIC_CULTURES.length, '| Chamados:', CALLINGS.length);
console.log('OCR validação — encontrados:', ocrValidation.found.length, '| ausentes:', ocrValidation.missing.length);
