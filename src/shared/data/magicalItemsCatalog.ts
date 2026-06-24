import type { MagicalItemDefinition } from '../../domain/value-objects/MagicalItem';

/** Catálogo curado a partir do OCR (Rewards p.78–81, Treasure Index p.129–136). */
export const MAGICAL_ITEMS_CATALOG: MagicalItemDefinition[] = [
  // ── Recompensas (war gear upgrades, p.81) ──
  {
    id: 'reward-keen',
    namePt: 'Afiado (Keen)',
    tier: 'reward',
    category: 'weapon',
    descriptionPt: 'Recompensa de nível. Crítico em 19–20.',
    effects: [{ kind: 'narrative', textPt: 'Ataques com esta arma marcam crítico em 19–20.' }],
    sourcePage: 81,
  },
  {
    id: 'reward-fell',
    namePt: 'Cruel (Fell)',
    tier: 'reward',
    category: 'weapon',
    descriptionPt: 'Recompensa de nível. Críticos mais letais.',
    effects: [{ kind: 'narrative', textPt: 'Em crítico, role dois dados de dano adicionais da arma.' }],
    sourcePage: 81,
  },
  {
    id: 'reward-grievous',
    namePt: 'Penetrante (Grievous)',
    tier: 'reward',
    category: 'weapon',
    descriptionPt: 'Recompensa de nível.',
    effects: [{ kind: 'damage_bonus', value: 1, textPt: '+1 em rolagens de dano com esta arma.' }],
    sourcePage: 81,
  },
  {
    id: 'reward-close-fitting',
    namePt: 'Justa (Close-fitting)',
    tier: 'reward',
    category: 'armor',
    descriptionPt: 'Recompensa de nível para armadura.',
    effects: [{ kind: 'narrative', textPt: 'Críticos contra você tornam-se acertos normais.' }],
    sourcePage: 81,
  },
  {
    id: 'reward-cunning-make',
    namePt: 'Obra Habilidosa (Cunning-make)',
    tier: 'reward',
    category: 'armor',
    descriptionPt: 'Armadura ou escudo. Metade do peso.',
    effects: [{ kind: 'narrative', textPt: 'Metade do peso; sem desvantagem em saves de fadiga, se aplicável.' }],
    sourcePage: 81,
  },
  {
    id: 'reward-reinforced',
    namePt: 'Reforçado (Reinforced)',
    tier: 'reward',
    category: 'shield',
    descriptionPt: 'Recompensa para escudo.',
    effects: [{ kind: 'ac_bonus', value: 1, textPt: '+1 CA além do bônus normal do escudo.' }],
    sourcePage: 81,
  },

  // ── Armas/Armaduras famosas (Enchanted Rewards, p.133+) ──
  {
    id: 'enchanted-superior',
    namePt: 'Obra Superior (Superior Craftsmanship)',
    nameEn: 'Superior Craftsmanship',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    descriptionPt: 'Arma encantada de artesão anão ou númenóreano.',
    effects: [
      { kind: 'attack_bonus', value: 1, textPt: '+1 em ataques e dano.' },
      { kind: 'narrative', textPt: 'Anã: +2 dano. Númenóreana: +3 dano vs. criaturas bane.' },
    ],
    sourcePage: 133,
  },
  {
    id: 'enchanted-foe-slaying',
    namePt: 'Matadora de Inimigos (Foe-slaying)',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    descriptionPt: 'Artesanato élfico ou númenóreano.',
    effects: [
      { kind: 'narrative', textPt: 'Ao acertar criatura bane, role um dado de dano extra (dois se élfica).' },
      { kind: 'narrative', textPt: 'Criaturas bane a 30 pés: você e aliados não podem ser surpreendidos; vantagem em iniciativa.' },
    ],
    sourcePage: 133,
  },
  {
    id: 'enchanted-luminescence',
    namePt: 'Luminescência',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    descriptionPt: 'Arma élfica que brilha perto de criaturas bane.',
    effects: [
      { kind: 'attack_bonus', value: 1, textPt: '+1 em ataques e dano.' },
      { kind: 'narrative', textPt: 'Brilho fraco quando bane está a 500 pés; luz fraca no alcance da arma.' },
    ],
    sourcePage: 133,
  },
  {
    id: 'mithril-armour',
    namePt: 'Cota de Mithril',
    nameEn: 'Mithril Armour',
    tier: 'famous_armour',
    category: 'armor',
    identifyDc: 20,
    baseItemId: 'mail-shirt',
    descriptionPt: 'Metade do peso; pode ser usada sob roupas.',
    effects: [
      { kind: 'narrative', textPt: 'CA base 14 + mod. Destreza (proficiência em armadura leve).' },
      { kind: 'narrative', textPt: 'Peso reduzido à metade.' },
    ],
    sourcePage: 133,
  },
  {
    id: 'rune-scored-armour',
    namePt: 'Armadura Rúnica',
    tier: 'famous_armour',
    category: 'armor',
    identifyDc: 20,
    descriptionPt: 'Artesanato anão.',
    effects: [
      { kind: 'ac_bonus', value: 1, textPt: '+1 CA e +1 em salvaguardas enquanto vestir.' },
      { kind: 'save_bonus', value: 1, textPt: '+1 em todas as salvaguardas.' },
    ],
    sourcePage: 136,
  },
  {
    id: 'rune-scored-shield',
    namePt: 'Escudo Rúnico',
    tier: 'famous_armour',
    category: 'shield',
    identifyDc: 20,
    effects: [
      { kind: 'ac_bonus', value: 1, textPt: '+1 CA (além do escudo) e +1 em salvaguardas.' },
      { kind: 'save_bonus', value: 1, textPt: '+1 em salvaguardas enquanto empunhar.' },
    ],
    sourcePage: 136,
  },
  {
    id: 'rune-scored-weapon',
    namePt: 'Arma Rúnica',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    effects: [
      { kind: 'attack_bonus', value: 1, textPt: '+1 em ataques e dano.' },
      { kind: 'save_bonus', value: 1, textPt: '+1 em salvaguardas enquanto a arma estiver em você.' },
    ],
    sourcePage: 136,
  },

  // ── Armas famosas nomeadas (exemplos do livro) ──
  {
    id: 'sting',
    namePt: 'Ferroada (Sting)',
    nameEn: 'Sting',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    baseItemId: 'sword-short',
    descriptionPt: 'Lâmina élfica; brilha perto de Orcs e Goblins.',
    effects: [],
    qualities: [
      {
        id: 'glow',
        order: 1,
        namePt: 'Brilho azul',
        effects: [{ kind: 'narrative', textPt: 'Emite luz azul perto de Orcs e Goblins.' }],
      },
      {
        id: 'finesse',
        order: 2,
        namePt: 'Finesse élfica',
        effects: [{ kind: 'narrative', textPt: 'Usa Força ou Destreza (o maior) em ataques e dano.' }],
      },
      {
        id: 'bane',
        order: 3,
        namePt: 'Bane',
        effects: [{ kind: 'narrative', textPt: 'Eficaz contra criaturas bane (Orcs, Goblins).' }],
      },
    ],
    sourcePage: 129,
  },
  {
    id: 'glamdring',
    namePt: 'Glamdring',
    tier: 'famous_weapon',
    category: 'weapon',
    identifyDc: 20,
    baseItemId: 'sword-long',
    descriptionPt: 'Espada élfica forjada em Gondolin.',
    effects: [],
    qualities: [
      {
        id: 'glow',
        order: 1,
        namePt: 'Brilho azul',
        effects: [{ kind: 'narrative', textPt: 'Brilha perto de inimigos élficos ou criaturas bane.' }],
      },
      {
        id: 'superior',
        order: 2,
        namePt: 'Obra superior',
        effects: [
          { kind: 'attack_bonus', value: 1, textPt: '+1 em ataques e dano.' },
          { kind: 'narrative', textPt: 'Crítico em 18–20 contra criaturas bane (obra élfica).' },
        ],
      },
    ],
    sourcePage: 129,
  },

  // ── Maravilhosos / Wondrous ──
  {
    id: 'phial-galadriel',
    namePt: 'Frasco de Galadriel',
    nameEn: 'Phial of Galadriel',
    tier: 'wondrous',
    category: 'wondrous',
    identifyDc: 15,
    descriptionPt: 'Luz da Estrela de Eärendil.',
    effects: [
      { kind: 'magical_success', textPt: 'Pode conceder sucesso mágico em testes contra escuridão e medo.' },
      { kind: 'narrative', textPt: 'Emite luz equivalente a tocha; repele criaturas das trevas.' },
    ],
    sourcePage: 130,
  },
  {
    id: 'cloak-lorien',
    namePt: 'Manto de Lórien',
    tier: 'wondrous',
    category: 'wondrous',
    identifyDc: 15,
    descriptionPt: 'Manto élfico que ajuda a passar despercebido.',
    effects: [
      {
        kind: 'blessing_die',
        skill: 'stealth',
        textPt: 'Dado de benção em testes de Furtividade (Marvellous: metade do prof.; Wondrous: prof. completo).',
      },
      { kind: 'narrative', textPt: 'Cor adapta-se ao ambiente; ajuda a ocultar o portador.' },
    ],
    sourcePage: 131,
  },
  {
    id: 'barrow-blade',
    namePt: 'Lâmina dos Túmulos',
    tier: 'marvellous',
    category: 'weapon',
    identifyDc: 10,
    baseItemId: 'sword-short',
    descriptionPt: 'Espada das Barrow-downs.',
    effects: [
      { kind: 'narrative', textPt: 'Eficaz contra Espíritos e Mortos-vivos.' },
      { kind: 'magical_success', textPt: 'Pode conceder sucesso mágico contra o Inimigo das trevas.' },
    ],
    sourcePage: 131,
  },
];

export const MAGICAL_TIER_LABELS: Record<MagicalItemDefinition['tier'], string> = {
  reward: 'Recompensa',
  marvellous: 'Artefato Maravilhoso',
  wondrous: 'Item Maravilhoso',
  famous_weapon: 'Arma Famosa',
  famous_armour: 'Armadura Famosa',
};

export const MAGICAL_CATALOG_GROUPS = [
  { id: 'rewards', icon: '⚔', title: 'Recompensas', tier: 'reward' as const },
  { id: 'famous_weapon', icon: '🗡', title: 'Armas famosas', tier: 'famous_weapon' as const },
  { id: 'famous_armour', icon: '🛡', title: 'Armaduras famosas', tier: 'famous_armour' as const },
  { id: 'wondrous', icon: '✨', title: 'Maravilhosos', tier: ['marvellous', 'wondrous'] as const },
];
