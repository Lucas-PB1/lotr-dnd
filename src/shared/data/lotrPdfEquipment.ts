/**
 * Catálogo de equipamento — exclusivamente do PDF oficial (Cap. 4).
 * Fonte: data/extracted/equipment-ocr.txt (OCR págs. 71–76).
 * Abreviações do livro: g = ouro, s = prata, c = cobre.
 */
import type { ItemDefinition } from '../../domain/value-objects/Item';

export const PDF_WEAPON_CATALOG: ItemDefinition[] = [
  // —— Armas simples corpo a corpo (p. 74) ——
  { id: 'axe', namePt: 'Machado (Axe)', category: 'weapon', equipSlot: 'mainHand', costSilver: 5, weight: 3, damage: '1d4', damageType: 'cortante', properties: ['versátil (1d8)'] },
  { id: 'club', namePt: 'Clava (Club)', category: 'weapon', equipSlot: 'mainHand', costCopper: 1, weight: 2, damage: '1d4', damageType: 'concussão', properties: ['leve'] },
  { id: 'club-great', namePt: 'Clava grande (Club, Great)', category: 'weapon', equipSlot: 'mainHand', costCopper: 2, weight: 10, damage: '1d8', damageType: 'concussão', properties: ['duas mãos'], twoHanded: true },
  { id: 'dagger', namePt: 'Adaga (Dagger)', category: 'weapon', equipSlot: 'mainHand', costSilver: 2, weight: 1, damage: '1d4', damageType: 'perfurante', properties: ['finesse', 'leve', 'arremesso (6/18 m)'] },
  { id: 'hammer', namePt: 'Martelo (Hammer)', category: 'weapon', equipSlot: 'mainHand', costSilver: 2, weight: 3, damage: '1d4', damageType: 'concussão' },
  { id: 'hatchet', namePt: 'Machadinha (Hatchet)', category: 'weapon', equipSlot: 'mainHand', costSilver: 5, weight: 2, damage: '1d4', damageType: 'cortante', properties: ['leve', 'arremesso (6/18 m)'] },
  { id: 'spear', namePt: 'Lança (Spear)', category: 'weapon', equipSlot: 'mainHand', costSilver: 1, weight: 3, damage: '1d6', damageType: 'perfurante', properties: ['arremesso (6/18 m)', 'versátil (1d8)'] },
  { id: 'spear-short', namePt: 'Lança curta (Spear, Short)', category: 'weapon', equipSlot: 'mainHand', costCopper: 5, weight: 2, damage: '1d6', damageType: 'perfurante', properties: ['arremesso (9/36 m)'] },
  { id: 'staff', namePt: 'Cajado (Staff)', category: 'weapon', equipSlot: 'mainHand', costCopper: 2, weight: 1, damage: '1d4', damageType: 'concussão', properties: ['versátil (1d6)'] },
  // —— Armas simples à distância (p. 74) ——
  { id: 'bow', namePt: 'Arco (Bow)', category: 'weapon', equipSlot: 'mainHand', costSilver: 25, weight: 2, damage: '1d6', damageType: 'perfurante', range: '24/96 m', properties: ['munição (24/96 m)', 'duas mãos'], twoHanded: true },
  // —— Armas marciais corpo a corpo (p. 75) ——
  { id: 'axe-battle', namePt: 'Machado de batalha (Axe, Battle)', category: 'weapon', equipSlot: 'mainHand', costSilver: 10, weight: 4, damage: '1d8', damageType: 'cortante', properties: ['pesada', 'versátil (1d10)'] },
  { id: 'axe-great', namePt: 'Machado grande (Axe, Great)', category: 'weapon', equipSlot: 'mainHand', costSilver: 30, weight: 7, damage: '1d12', damageType: 'cortante', properties: ['pesada', 'duas mãos'], twoHanded: true },
  { id: 'hammer-heavy', namePt: 'Martelo pesado (Hammer, Heavy)', category: 'weapon', equipSlot: 'mainHand', costSilver: 10, weight: 4, damage: '1d8', damageType: 'concussão', properties: ['pesada', 'versátil (1d10)'] },
  { id: 'mattock', namePt: 'Enxó (Mattock)', category: 'weapon', equipSlot: 'mainHand', costSilver: 10, weight: 10, damage: '1d12', damageType: 'perfurante', properties: ['pesada', 'duas mãos'], twoHanded: true },
  { id: 'spear-great', namePt: 'Lança grande (Spear, Great)', category: 'weapon', equipSlot: 'mainHand', costSilver: 20, weight: 6, damage: '1d10', damageType: 'perfurante', properties: ['pesada', 'alcance', 'duas mãos'], twoHanded: true },
  { id: 'sword', namePt: 'Espada (Sword)', category: 'weapon', equipSlot: 'mainHand', costSilver: 15, weight: 2, damage: '1d6', damageType: 'cortante', properties: ['finesse', 'versátil (1d8)'] },
  { id: 'sword-long', namePt: 'Espada longa (Sword, Long)', category: 'weapon', equipSlot: 'mainHand', costSilver: 20, weight: 3, damage: '1d8', damageType: 'cortante', properties: ['pesada', 'versátil (1d10)'] },
  { id: 'sword-short', namePt: 'Espada curta (Sword, Short)', category: 'weapon', equipSlot: 'mainHand', costSilver: 10, weight: 2, damage: '1d6', damageType: 'perfurante', properties: ['finesse', 'leve'] },
  // —— Armas marciais à distância (p. 75) ——
  { id: 'great-bow', namePt: 'Great Bow', category: 'weapon', equipSlot: 'mainHand', costSilver: 50, weight: 3, damage: '1d8', damageType: 'perfurante', range: '45/180 m', properties: ['munição (45/180 m)', 'pesada', 'duas mãos'], twoHanded: true },
  // —— Munição (p. 71) ——
  { id: 'arrows-20', namePt: 'Flechas (20)', category: 'ammo', costSilver: 1, weight: 1, stackable: true, description: 'Munição para arco ou great bow.' },
];

export const PDF_ARMOR_CATALOG: ItemDefinition[] = [
  // —— Armours (p. 73–74) ——
  { id: 'leather-shirt', namePt: 'Camisa de couro (Leather shirt)', category: 'armor', equipSlot: 'armor', costSilver: 10, weight: 10, baseAc: 11, armorCategory: 'light', description: 'CA 11 + mod. Destreza.' },
  { id: 'leather-corslet', namePt: 'Corselete de couro (Leather corslet)', category: 'armor', equipSlot: 'armor', costSilver: 45, weight: 13, baseAc: 12, armorCategory: 'light', description: 'CA 12 + mod. Destreza.' },
  { id: 'hide', namePt: 'Couro grosso (Hide)', category: 'armor', equipSlot: 'armor', costSilver: 10, weight: 12, baseAc: 12, armorCategory: 'medium', maxDexBonus: 2, description: 'CA 12 + mod. Destreza (máx. +2).' },
  { id: 'mail-shirt', namePt: 'Camisa de malha (Mail-shirt)', category: 'armor', equipSlot: 'armor', costSilver: 50, weight: 20, baseAc: 13, armorCategory: 'medium', maxDexBonus: 2, description: 'CA 13 + mod. Destreza (máx. +2).' },
  { id: 'scale-armour', namePt: 'Armadura de escamas (Scale Armour)', category: 'armor', equipSlot: 'armor', costSilver: 50, weight: 45, baseAc: 14, armorCategory: 'medium', maxDexBonus: 2, stealthDisadvantage: true, description: 'CA 14 + mod. Destreza (máx. +2). Desvantagem em Furtividade.' },
  { id: 'ring-mail', namePt: 'Cota de anéis (Ring-mail)', category: 'armor', equipSlot: 'armor', costSilver: 50, weight: 50, baseAc: 15, armorCategory: 'heavy', stealthDisadvantage: true, description: 'CA 15. Desvantagem em Furtividade.' },
  { id: 'coat-of-mail', namePt: 'Cota de malha (Coat of Mail)', category: 'armor', equipSlot: 'armor', costSilver: 75, weight: 55, baseAc: 16, armorCategory: 'heavy', stealthDisadvantage: true, description: 'CA 16. Desvantagem em Furtividade.' },
  { id: 'mail-hauberk', namePt: 'Hauberk de malha (Mail Hauberk)', category: 'armor', equipSlot: 'armor', costGold: 20, weight: 60, baseAc: 17, armorCategory: 'heavy', stealthDisadvantage: true, description: 'CA 17. Desvantagem em Furtividade.' },
  { id: 'shield', namePt: 'Escudo (Shield)', category: 'shield', equipSlot: 'offHand', costSilver: 10, weight: 6, armorCategory: 'shield', description: '+2 na CA enquanto equipado.' },
];

export const PDF_GEAR_CATALOG: ItemDefinition[] = [
  // —— Adventuring Gear (p. 71–73) ——
  { id: 'backpack', namePt: 'Mochila (Backpack)', category: 'gear', costSilver: 2, weight: 5 },
  { id: 'barrel', namePt: 'Barril (Barrel)', category: 'gear', costSilver: 2, weight: 70 },
  { id: 'basket', namePt: 'Cesta (Basket)', category: 'gear', costSilver: 2, weight: 2 },
  { id: 'bedroll', namePt: 'Saco de dormir (Bedroll)', category: 'gear', costSilver: 1, weight: 7 },
  { id: 'bell', namePt: 'Sino (Bell)', category: 'gear', costSilver: 1, weight: 0 },
  { id: 'blanket', namePt: 'Cobertor (Blanket)', category: 'gear', costCopper: 5, weight: 3 },
  { id: 'block-and-tackle', namePt: 'Roldana e talha (Block and tackle)', category: 'gear', costSilver: 1, weight: 5 },
  { id: 'book', namePt: 'Livro (Book)', category: 'gear', costSilver: 25, weight: 5 },
  { id: 'bottle-glass', namePt: 'Garrafa de vidro (Bottle, glass)', category: 'gear', costSilver: 2, weight: 2 },
  { id: 'bucket', namePt: 'Balde (Bucket)', category: 'gear', costCopper: 1, weight: 2 },
  { id: 'candle-set-10', namePt: 'Velas (10) (Candle, set of 10)', category: 'gear', costCopper: 1, weight: 0, stackable: true },
  { id: 'chalk-10', namePt: 'Giz (10 peças) (Chalk, 10 pieces)', category: 'gear', costCopper: 1, weight: 0, stackable: true },
  { id: 'case-map-scroll', namePt: 'Estojo de mapa ou pergaminho (Case, map or scroll)', category: 'gear', costSilver: 1, weight: 1 },
  { id: 'chain-10ft', namePt: 'Corrente (3 m) (Chain, 10 feet)', category: 'gear', costSilver: 5, weight: 10 },
  { id: 'chest', namePt: 'Baú (Chest)', category: 'gear', costSilver: 5, weight: 25 },
  { id: 'climbers-kit', namePt: 'Kit de escalada (Climber\'s kit)', category: 'gear', costSilver: 25, weight: 12 },
  { id: 'clothes-common', namePt: 'Roupas comuns (Clothes, common)', category: 'gear', costCopper: 5, weight: 3 },
  { id: 'clothes-fine', namePt: 'Roupas finas (Clothes, fine)', category: 'gear', costSilver: 15, weight: 6 },
  { id: 'clothes-travellers', namePt: 'Roupas de viagem (Clothes, traveller\'s)', category: 'gear', costSilver: 2, weight: 4 },
  { id: 'fishing-tackle', namePt: 'Kit de pesca (Fishing tackle)', category: 'gear', costSilver: 1, weight: 4 },
  { id: 'flask-or-tankard', namePt: 'Cantil ou caneca (Flask or tankard)', category: 'gear', costCopper: 1, weight: 1 },
  { id: 'healers-kit', namePt: 'Kit de curandeiro (Healer\'s kit)', category: 'gear', costSilver: 5, weight: 3 },
  { id: 'hourglass', namePt: 'Ampulheta (Hourglass)', category: 'gear', costSilver: 25, weight: 1 },
  { id: 'ink-bottle', namePt: 'Tinta (frasco) (Ink, 1 ounce bottle)', category: 'gear', costSilver: 10, weight: 0 },
  { id: 'ink-pen', namePt: 'Pena de tinta (Ink pen)', category: 'gear', costCopper: 1, weight: 0 },
  { id: 'jug-pitcher', namePt: 'Jarra (Jug or pitcher)', category: 'gear', costCopper: 1, weight: 4 },
  { id: 'ladder-10ft', namePt: 'Escada (3 m) (Ladder, 10 feet)', category: 'gear', costCopper: 1, weight: 25 },
  { id: 'lamp', namePt: 'Lâmpada (Lamp)', category: 'gear', costCopper: 5, weight: 1 },
  { id: 'lantern-bullseye', namePt: 'Lanterna direcional (Lantern, bullseye)', category: 'gear', costSilver: 10, weight: 2 },
  { id: 'lantern-hooded', namePt: 'Lanterna com capuz (Lantern, hooded)', category: 'gear', costSilver: 5, weight: 2 },
  { id: 'lock', namePt: 'Fechadura (Lock)', category: 'gear', costSilver: 10, weight: 1 },
  { id: 'magnifying-glass', namePt: 'Lupa (Magnifying glass)', category: 'gear', costGold: 10, weight: 0 },
  { id: 'manacles', namePt: 'Algemas (Manacles)', category: 'gear', costSilver: 2, weight: 6 },
  { id: 'mess-kit', namePt: 'Kit de refeição (Mess kit)', category: 'gear', costCopper: 2, weight: 1 },
  { id: 'mirror-steel', namePt: 'Espelho de aço (Mirror, steel)', category: 'gear', costSilver: 5, weight: 0.5 },
  { id: 'oil-flask', namePt: 'Óleo (frasco) (Oil, flask)', category: 'consumable', costSilver: 1, weight: 1, stackable: true },
  { id: 'pick-miners', namePt: 'Picareta de mineiro (Pick, miner\'s)', category: 'gear', costSilver: 2, weight: 10 },
  { id: 'pole-10ft', namePt: 'Vara (3 m) (Pole, 10-foot)', category: 'gear', costCopper: 1, weight: 7 },
  { id: 'pocket-handkerchief', namePt: 'Lenço de bolso (Pocket-handkerchief)', category: 'gear', costCopper: 1, weight: 0 },
  { id: 'pot-iron', namePt: 'Panela de ferro (Pot or pan, iron)', category: 'gear', costSilver: 2, weight: 10 },
  { id: 'pouch', namePt: 'Bolsa (Pouch)', category: 'gear', costCopper: 5, weight: 1 },
  { id: 'quiver', namePt: 'Aljava (Quiver)', category: 'gear', costSilver: 1, weight: 1 },
  { id: 'rations-1-day', namePt: 'Rações (1 dia) (Rations, 1 day)', category: 'consumable', costCopper: 5, weight: 2, stackable: true },
  { id: 'rations-cram-1-day', namePt: 'Cram (1 dia) (Rations, cram)', category: 'consumable', costSilver: 1, weight: 1, stackable: true, description: 'Biscoito nutritivo dos Bardings.' },
  { id: 'robes', namePt: 'Vestes (Robes)', category: 'gear', costSilver: 1, weight: 4 },
  { id: 'rope-hempen-50', namePt: 'Corda de cânhamo (15 m) (Rope, hempen, 50 feet)', category: 'gear', costSilver: 1, weight: 10 },
  { id: 'rope-silk-50', namePt: 'Corda de seda (15 m) (Rope, silk, 50 feet)', category: 'gear', costSilver: 10, weight: 5 },
  { id: 'sack', namePt: 'Saco (Sack)', category: 'gear', costCopper: 1, weight: 0.5 },
  { id: 'saddle', namePt: 'Sela (Saddle)', category: 'gear', costSilver: 5, weight: 15 },
  { id: 'saddlebags', namePt: 'Alforjes (Saddlebags)', category: 'gear', costSilver: 4, weight: 8 },
  { id: 'scale-merchants', namePt: 'Balança de comerciante (Scale, merchant\'s)', category: 'gear', costSilver: 5, weight: 3 },
  { id: 'sealing-wax', namePt: 'Cera de lacre (Sealing wax)', category: 'gear', costCopper: 5, weight: 0 },
  { id: 'shovel', namePt: 'Pá (Shovel)', category: 'gear', costSilver: 2, weight: 5 },
  { id: 'signal-whistle', namePt: 'Apito (Signal whistle)', category: 'gear', costCopper: 1, weight: 0 },
  { id: 'signet-ring', namePt: 'Anel de sinete (Signet ring)', category: 'gear', costSilver: 5, weight: 0 },
  { id: 'soap', namePt: 'Sabonete (Soap)', category: 'gear', costCopper: 1, weight: 0 },
  { id: 'tent-two-person', namePt: 'Tenda (2 pessoas) (Tent, two-person)', category: 'gear', costSilver: 2, weight: 20 },
  { id: 'tinderbox', namePt: 'Pederneira (Tinderbox)', category: 'gear', costCopper: 5, weight: 1 },
  { id: 'torches-10', namePt: 'Tochas (10) (Torches, bundle of 10)', category: 'gear', costCopper: 1, weight: 10, stackable: true },
  { id: 'vial', namePt: 'Frasco (Vial)', category: 'gear', costSilver: 1, weight: 0 },
  { id: 'waterskin', namePt: 'Odre (Waterskin)', category: 'gear', costCopper: 2, weight: 5, description: 'Cheio.' },
  { id: 'whetstone', namePt: 'Pedra de amolar (Whetstone)', category: 'gear', costCopper: 1, weight: 1 },
  // —— Pipe-weed (p. 73) ——
  { id: 'pipe-weed-longbottom', namePt: 'Fumo para cachimbo, Longbottom Leaf (10 usos)', category: 'consumable', costSilver: 3, weight: 0, stackable: true },
  { id: 'pipe-weed-old-toby', namePt: 'Fumo para cachimbo, Old Toby (10 usos)', category: 'consumable', costSilver: 2, weight: 0, stackable: true },
  { id: 'pipe-weed-southern-star', namePt: 'Fumo para cachimbo, Southern Star (10 usos)', category: 'consumable', costSilver: 2, weight: 0, stackable: true },
  { id: 'pipe-weed-southlinch', namePt: 'Fumo para cachimbo, Southlinch (10 usos)', category: 'consumable', costSilver: 1, weight: 0, stackable: true },
  // —— Montarias (p. 76) ——
  { id: 'horse-draught', namePt: 'Cavalo de tração (Horse, draught)', category: 'gear', costSilver: 50, weight: 0, description: 'Velocidade 12 m, carga 245 kg, Constituição 13 (+1).' },
  { id: 'horse-riding', namePt: 'Cavalo de montaria (Horse, riding)', category: 'gear', costSilver: 75, weight: 0, description: 'Velocidade 12 m, carga 218 kg, Constituição 12 (+1).' },
  { id: 'pony', namePt: 'Pônei (Pony)', category: 'gear', costSilver: 12, weight: 0, description: 'Velocidade 12 m, carga 102 kg, Constituição 13 (+1).' },
];

/** Ferramentas, jogos e instrumentos (p. 75–76) */
export const PDF_TOOL_CATALOG: ItemDefinition[] = [
  { id: 'brewers-supplies', namePt: 'Suprimentos de cervejeiro (Brewer\'s supplies)', category: 'tool', costSilver: 20, weight: 9 },
  { id: 'calligraphers-supplies', namePt: 'Suprimentos de calígrafo (Calligrapher\'s supplies)', category: 'tool', costSilver: 10, weight: 5 },
  { id: 'carpenters-tools', namePt: 'Ferramentas de carpinteiro (Carpenter\'s tools)', category: 'tool', costSilver: 8, weight: 4 },
  { id: 'cartographers-tools', namePt: 'Ferramentas de cartógrafo (Cartographer\'s tools)', category: 'tool', costSilver: 15, weight: 6 },
  { id: 'cobblers-tools', namePt: 'Ferramentas de sapateiro (Cobbler\'s tools)', category: 'tool', costSilver: 5, weight: 5 },
  { id: 'cooks-utensils', namePt: 'Utensílios de cozinheiro (Cook\'s utensils)', category: 'tool', costSilver: 1, weight: 8 },
  { id: 'glassblowers-tools', namePt: 'Ferramentas de vidreiro (Glassblower\'s tools)', category: 'tool', costSilver: 30, weight: 5 },
  { id: 'jewellers-tools', namePt: 'Ferramentas de joalheiro (Jeweller\'s tools)', category: 'tool', costSilver: 25, weight: 2 },
  { id: 'leatherworkers-tools', namePt: 'Ferramentas de coureiro (Leatherworker\'s tools)', category: 'tool', costSilver: 5, weight: 5 },
  { id: 'masons-tools', namePt: 'Ferramentas de pedreiro (Mason\'s tools)', category: 'tool', costSilver: 10, weight: 8 },
  { id: 'painters-supplies', namePt: 'Suprimentos de pintor (Painter\'s supplies)', category: 'tool', costSilver: 10, weight: 5 },
  { id: 'potters-tools', namePt: 'Ferramentas de oleiro (Potter\'s tools)', category: 'tool', costSilver: 10, weight: 3 },
  { id: 'smiths-tools', namePt: 'Ferramentas de ferreiro (Smith\'s tools)', category: 'tool', costSilver: 20, weight: 8 },
  { id: 'weavers-tools', namePt: 'Ferramentas de tecelão (Weaver\'s tools)', category: 'tool', costSilver: 1, weight: 5 },
  { id: 'woodcarvers-tools', namePt: 'Ferramentas de entalhador (Woodcarver\'s tools)', category: 'tool', costSilver: 1, weight: 5 },
  { id: 'herbalism-kit', namePt: 'Kit de herbalismo (Herbalism kit)', category: 'tool', costSilver: 5, weight: 3 },
  { id: 'navigators-tools', namePt: 'Ferramentas de navegador (Navigator\'s tools)', category: 'tool', costSilver: 25, weight: 2 },
  { id: 'pipe', namePt: 'Cachimbo (Pipe)', category: 'tool', costSilver: 1, weight: 0.5, description: 'Fumar concede inspiração (ver livro p. 76).' },
  { id: 'thieves-tools', namePt: 'Ferramentas de ladrão (Thieves\' tools)', category: 'tool', costSilver: 25, weight: 1 },
  // —— Gaming sets (p. 76) ——
  { id: 'chess', namePt: 'Xadrez (Chess)', category: 'tool', costSilver: 1, weight: 0.5 },
  { id: 'bowls', namePt: 'Bolas (Bowls)', category: 'tool', costCopper: 1, weight: 8 },
  { id: 'darts-game', namePt: 'Dardos — jogo (Darts)', category: 'tool', costCopper: 3, weight: 1.5, description: 'Jogo de salão, não arma.' },
  { id: 'quoits', namePt: 'Argolas (Quoits)', category: 'tool', costCopper: 2, weight: 4 },
  // —— Musical instruments (p. 76) ——
  { id: 'clarinet', namePt: 'Clarinete (Clarinet)', category: 'tool', costSilver: 12, weight: 2 },
  { id: 'drum', namePt: 'Tambor (Drum)', category: 'tool', costSilver: 6, weight: 3 },
  { id: 'fiddle', namePt: 'Violino (Fiddle)', category: 'tool', costSilver: 25, weight: 1 },
  { id: 'flute', namePt: 'Flauta (Flute)', category: 'tool', costSilver: 2, weight: 1 },
  { id: 'harp', namePt: 'Harpa (Harp)', category: 'tool', costSilver: 30, weight: 2 },
  { id: 'horn', namePt: 'Trompa (Horn)', category: 'tool', costSilver: 3, weight: 2 },
  { id: 'trumpet', namePt: 'Trompete (Trumpet)', category: 'tool', costSilver: 35, weight: 2 },
  { id: 'viol', namePt: 'Viola (Viol)', category: 'tool', costSilver: 30, weight: 1 },
];

export const PDF_CUSTOM_ITEM: ItemDefinition = {
  id: 'custom',
  namePt: 'Item personalizado',
  category: 'treasure',
  description: 'Tesouro ou loot fora das tabelas do livro.',
};

export const PDF_EQUIPMENT_CATALOG: ItemDefinition[] = [
  ...PDF_WEAPON_CATALOG,
  ...PDF_ARMOR_CATALOG,
  ...PDF_GEAR_CATALOG,
  ...PDF_TOOL_CATALOG,
  PDF_CUSTOM_ITEM,
];

/** Metadados da extração — para referência na UI */
export const PDF_CATALOG_SOURCE = {
  pdf: 'doc/senhor-dos-aneis-rpg-regras.pdf',
  chapter: 'Capítulo 4 — Equipment',
  pages: '71–76 (OCR)',
  ocrFile: 'data/extracted/equipment-ocr.txt',
  note: 'Catálogo completo das tabelas do capítulo. Despesas de taverna (Out-of-pocket) não são itens.',
} as const;
