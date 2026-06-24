/**
 * PDFs locais em doc/ (pasta ignorada pelo Git).
 * Coloque os arquivos com estes nomes antes de rodar os scripts de OCR.
 */
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const DOC_DIR = path.join(__dirname, '..', 'doc');

/** Livro de regras — The Lord of the Rings™ Roleplaying (Free League) */
export const PDF_RULEBOOK = 'senhor-dos-aneis-rpg-regras.pdf';
export const RULEBOOK_PATH = path.join(DOC_DIR, PDF_RULEBOOK);
/** Caminho relativo à raiz do projeto (metadados em JSON) */
export const RULEBOOK_REL = path.join('doc', PDF_RULEBOOK).replace(/\\/g, '/');

/** Ficha oficial em PDF (referência visual; não usada nos scripts de OCR) */
export const PDF_CHARACTER_SHEET = 'senhor-dos-aneis-ficha-oficial.pdf';
export const CHARACTER_SHEET_PATH = path.join(DOC_DIR, PDF_CHARACTER_SHEET);
export const CHARACTER_SHEET_REL = path.join('doc', PDF_CHARACTER_SHEET).replace(/\\/g, '/');
