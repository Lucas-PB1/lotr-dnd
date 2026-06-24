/**
 * Gera rascunho JSON a partir de treasure-ocr.txt.
 * Curadoria manual necessária antes de usar no app.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OCR_PATH = path.join(__dirname, '../data/extracted/treasure-ocr.txt');
const OUT_PATH = path.join(__dirname, '../data/extracted/treasure-index-draft.json');

const TIER_HINTS = [
  { pattern: /FAMOUS\s+WEAPON/i, tier: 'famous_weapon', identifyDc: 20 },
  { pattern: /FAMOUS\s+ARMOUR|FAMOUS\s+ARMOR/i, tier: 'famous_armour', identifyDc: 20 },
  { pattern: /WONDROUS\s+ITEM/i, tier: 'wondrous', identifyDc: 15 },
  { pattern: /MARVELLOUS\s+ARTEFACT|MARVELOUS\s+ARTIFACT/i, tier: 'marvellous', identifyDc: 10 },
  { pattern: /REWARD/i, tier: 'reward', identifyDc: undefined },
];

const EFFECT_PATTERNS = [
  { regex: /\+\s*(\d+)\s*(?:bonus\s+)?to\s+AC|\+(\d+)\s+AC|CA\s*\+\s*(\d+)/i, kind: 'ac_bonus' },
  { regex: /\+\s*(\d+)\s*(?:bonus\s+)?to\s+attack/i, kind: 'attack_bonus' },
  { regex: /\+\s*(\d+)\s*(?:bonus\s+)?to\s+damage/i, kind: 'damage_bonus' },
  { regex: /\+\s*(\d+)\s*(?:bonus\s+)?to\s+(?:all\s+)?saving\s+throws?/i, kind: 'save_bonus' },
  { regex: /Blessing\s+die|Blessing\s+dic/i, kind: 'blessing_die' },
  { regex: /magical\s+success/i, kind: 'magical_success' },
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}

function parseEffects(text) {
  const effects = [];
  for (const { regex, kind } of EFFECT_PATTERNS) {
    const m = text.match(regex);
    if (!m) continue;
    const value = m[1] ? Number(m[1]) : m[2] ? Number(m[2]) : undefined;
    effects.push({
      kind,
      value: value && !Number.isNaN(value) ? value : undefined,
      textPt: m[0],
    });
  }
  if (effects.length === 0 && text.trim().length > 20) {
    effects.push({ kind: 'narrative', textPt: text.trim().slice(0, 300) });
  }
  return effects;
}

function guessTier(block) {
  for (const hint of TIER_HINTS) {
    if (hint.pattern.test(block)) return hint;
  }
  if (/weapon|sword|blade|bow|axe|spear|dagger/i.test(block)) {
    return { tier: 'famous_weapon', identifyDc: 20 };
  }
  if (/armou?r|mail|shield|coat/i.test(block)) {
    return { tier: 'famous_armour', identifyDc: 20 };
  }
  return { tier: 'wondrous', identifyDc: 15 };
}

function parseOcr(text) {
  const items = [];
  const blocks = text.split(/(?=^[A-Z][A-Z0-9 '&\-–—]{3,}$)/m);

  for (const block of blocks) {
    const lines = block.trim().split('\n').filter(Boolean);
    if (lines.length < 2) continue;

    const titleLine = lines.find((l) => /^[A-Z][A-Z0-9 '&\-–—]{3,}$/.test(l.trim()));
    if (!titleLine) continue;

    const name = titleLine.trim();
    if (name.length > 80 || name.length < 4) continue;
    if (/^(PAGE|PÁGINA|CHAPTER|THE|AND|FOR)$/i.test(name)) continue;

    const body = lines.slice(lines.indexOf(titleLine) + 1).join('\n');
    const tierInfo = guessTier(block);
    const qualityMatches = [...body.matchAll(/(\d+)\.\s*([^\n]+)/g)];

    const qualities = qualityMatches.map((m, i) => ({
      id: `q${i + 1}`,
      order: Number(m[1]),
      namePt: m[2].trim(),
      effects: parseEffects(m[2]),
    }));

    items.push({
      id: slugify(name),
      namePt: name,
      nameEn: name,
      tier: tierInfo.tier,
      category: tierInfo.tier.includes('armour') ? 'armor' : tierInfo.tier.includes('weapon') ? 'weapon' : 'wondrous',
      identifyDc: tierInfo.identifyDc,
      effects: qualities.length === 0 ? parseEffects(body) : [],
      qualities: qualities.length > 0 ? qualities : undefined,
      rawExcerpt: body.slice(0, 500),
      needsCuration: true,
    });
  }

  return items;
}

function main() {
  if (!fs.existsSync(OCR_PATH)) {
    console.error('Execute primeiro: node scripts/extract-treasure-ocr.mjs');
    process.exit(1);
  }

  const text = fs.readFileSync(OCR_PATH, 'utf8');
  const treasureSection = text.split('treasure_index').pop() ?? text;
  const items = parseOcr(treasureSection);

  const unique = [];
  const seen = new Set();
  for (const item of items) {
    if (seen.has(item.id)) continue;
    seen.add(item.id);
    unique.push(item);
  }

  fs.writeFileSync(
    OUT_PATH,
    JSON.stringify(
      {
        generatedAt: new Date().toISOString(),
        source: OCR_PATH,
        itemCount: unique.length,
        items: unique,
      },
      null,
      2,
    ),
    'utf8',
  );

  console.log(`Rascunho: ${unique.length} itens → ${OUT_PATH}`);
}

main();
