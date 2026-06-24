import type { AbilityName } from '../constants/gameConstants';

export type VirtueScope = 'common' | 'bardings' | 'dwarves' | 'elves-lindon' | 'hobbits' | 'men-bree' | 'rangers';

export interface VirtueDefinition {
  id: string;
  name: string;
  namePt: string;
  scopes: VirtueScope[];
  /** Bônus fixo de atributo */
  abilityBonuses?: Partial<Record<AbilityName, number>>;
  /** Escolha um atributo da lista */
  abilityChoice?: AbilityName[];
  /** +1 CA (ex.: Nimbleness) */
  acBonus?: number;
  summaryPt: string;
}

export interface CraftDefinition {
  id: string;
  name: string;
  namePt: string;
  summaryPt: string;
}

export const COMMON_VIRTUES: VirtueDefinition[] = [
  {
    id: 'confidence',
    name: 'Confidence',
    namePt: 'Confiança',
    scopes: ['common'],
    abilityChoice: ['intelligence', 'wisdom', 'charisma'],
    summaryPt: 'Proficiência em save Int/Sab/Car à escolha.',
  },
  {
    id: 'dour-handed',
    name: 'Dour-handed',
    namePt: 'Mão Firme',
    scopes: ['common'],
    abilityBonuses: { strength: 1 },
    summaryPt: '+1 dano em ataques com Força.',
  },
  {
    id: 'hardiness',
    name: 'Hardiness',
    namePt: 'Robustez',
    scopes: ['common'],
    abilityBonuses: { constitution: 1 },
    summaryPt: '+1 PV máx. por nível.',
  },
  {
    id: 'mastery',
    name: 'Mastery',
    namePt: 'Maestria',
    scopes: ['common'],
    abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    summaryPt: 'Proficiência + perícia/ferramenta/arma; expertise em uma.',
  },
  {
    id: 'nimbleness',
    name: 'Nimbleness',
    namePt: 'Agilidade',
    scopes: ['common'],
    abilityBonuses: { dexterity: 1 },
    acBonus: 1,
    summaryPt: '+1 CA (exceto incapacitado).',
  },
  {
    id: 'prowess',
    name: 'Prowess',
    namePt: 'Proeza',
    scopes: ['common'],
    abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'],
    summaryPt: '+2 em um atributo OU +1 em dois (regra completa no livro).',
  },
];

export const CULTURAL_VIRTUES: Record<Exclude<VirtueScope, 'common'>, VirtueDefinition[]> = {
  bardings: [
    { id: 'dragon-slayer', name: 'Dragon-slayer', namePt: 'Matador de Dragões', scopes: ['bardings'], abilityChoice: ['strength', 'dexterity'], summaryPt: 'Vantagem vs. criaturas Grande+.' },
    { id: 'dwarf-friend', name: 'Dwarf-friend', namePt: 'Amigo dos Anões', scopes: ['bardings'], abilityBonuses: { charisma: 1 }, summaryPt: 'Persuasão dobrada; vantagem com Anões.' },
    { id: 'fierce-shot', name: 'Fierce Shot', namePt: 'Tiro Feroz', scopes: ['bardings'], abilityChoice: ['strength', 'dexterity'], summaryPt: 'Ataques à distância com For ou Des.' },
    { id: 'high-destiny', name: 'High Destiny', namePt: 'Alto Destino', scopes: ['bardings'], abilityBonuses: { constitution: 1 }, summaryPt: 'Vantagem em salvaguardas contra morte.' },
    { id: 'stout-hearted', name: 'Stout-hearted', namePt: 'Coração Valente', scopes: ['bardings'], abilityChoice: ['wisdom', 'charisma'], summaryPt: 'Vantagem em saves de Carisma; imune a medo (não-Mortos-vivos).' },
    { id: 'language-of-birds', name: 'Language of Birds', namePt: 'Linguagem das Aves', scopes: ['bardings'], abilityChoice: ['intelligence', 'wisdom'], summaryPt: 'Fala com aves; vantagem em testes ao ar livre.' },
  ],
  dwarves: [
    { id: 'baruk-khazad', name: 'Baruk Khazâd!', namePt: 'Baruk Khazâd!', scopes: ['dwarves'], abilityChoice: ['strength', 'charisma'], summaryPt: 'Grito de batalha que assusta inimigos.' },
    { id: 'broken-spells', name: 'Broken Spells', namePt: 'Feitiços Quebrados', scopes: ['dwarves'], abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], summaryPt: 'Sucessos mágicos em 3 perícias/ferramentas.' },
    { id: 'dark-for-dark-business', name: 'Dark for Dark Business', namePt: 'Escuro para Negócios Sombrios', scopes: ['dwarves'], abilityBonuses: { wisdom: 1 }, summaryPt: 'Vantagem em penumbra/escuridão/subterrâneo.' },
    { id: 'durins-way', name: "Durin's Way", namePt: 'Caminho de Durin', scopes: ['dwarves'], abilityChoice: ['dexterity', 'constitution'], summaryPt: 'Cobertura melhorada; invisíveis não têm vantagem.' },
    { id: 'stone-hard', name: 'Stone-hard', namePt: 'Duro como Pedra', scopes: ['dwarves'], abilityBonuses: { constitution: 1 }, summaryPt: 'Cai a 1 PV em vez de 0 (descanso curto/longo).' },
    { id: 'untameable-spirit', name: 'Untameable Spirit', namePt: 'Espírito Indomável', scopes: ['dwarves'], abilityChoice: ['intelligence', 'wisdom'], summaryPt: 'Imune a encantamento; vantagem em saves de Int.' },
  ],
  'elves-lindon': [
    { id: 'against-the-unseen', name: 'Against the Unseen', namePt: 'Contra o Invisível', scopes: ['elves-lindon'], abilityChoice: ['wisdom', 'charisma'], summaryPt: 'Imune a medo de Mortos-vivos.' },
    { id: 'deadly-archery', name: 'Deadly Archery', namePt: 'Arquearia Mortal', scopes: ['elves-lindon'], abilityBonuses: { dexterity: 1 }, summaryPt: 'Vantagem em ataque à distância sem mover.' },
    { id: 'elbereth-gilthoniel', name: 'Elbereth Gilthoniel!', namePt: 'Elbereth Gilthoniel!', scopes: ['elves-lindon'], abilityChoice: ['intelligence', 'wisdom', 'charisma'], summaryPt: 'Vantagem em testes se não estiver miserável.' },
    { id: 'elvish-spirit', name: 'Elvish Spirit', namePt: 'Espírito Élfico', scopes: ['elves-lindon'], abilityBonuses: { constitution: 1 }, summaryPt: 'Meditação recupera exaustão e PV.' },
    { id: 'gleam-of-wrath', name: 'Gleam of Wrath', namePt: 'Brilho da Ira', scopes: ['elves-lindon'], abilityChoice: ['strength', 'dexterity'], summaryPt: 'Arma emite luz solar; dano radiante em crítico.' },
    { id: 'memory-of-ancient-days', name: 'Memory of Ancient Days', namePt: 'Memória dos Dias Antigos', scopes: ['elves-lindon'], abilityChoice: ['intelligence', 'wisdom'], summaryPt: 'Bônus em pathfinding e Explore em Eriador.' },
  ],
  hobbits: [
    { id: 'art-of-disappearing', name: 'Art of Disappearing', namePt: 'Arte de Desaparecer', scopes: ['hobbits'], abilityBonuses: { dexterity: 1 }, summaryPt: 'Stealth dobrado; esconder-se levemente obscurecido.' },
    { id: 'brave-at-a-pinch', name: 'Brave at a Pinch', namePt: 'Valente na Aperto', scopes: ['hobbits'], abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], summaryPt: 'Ganha inspiração em situações difíceis.' },
    { id: 'small-folk', name: 'Small Folk', namePt: 'Povo Pequeno', scopes: ['hobbits'], abilityBonuses: { dexterity: 1 }, summaryPt: 'Criaturas Médias+ sem vantagem; sem ataques de oportunidade.' },
    { id: 'sure-at-the-mark', name: 'Sure at the Mark', namePt: 'Certeiro na Mira', scopes: ['hobbits'], abilityBonuses: { dexterity: 1 }, summaryPt: 'Proficiência com armas improvisadas à distância.' },
    { id: 'three-is-company', name: 'Three is Company', namePt: 'Três é Companhia', scopes: ['hobbits'], abilityBonuses: { charisma: 1 }, summaryPt: '+1 Fellowship; inspiração ao gastar pontos.' },
    { id: 'tough-as-old-tree-roots', name: 'Tough as Old Tree-roots', namePt: 'Duro como Raízes', scopes: ['hobbits'], abilityBonuses: { constitution: 1 }, summaryPt: 'Dados de vida sempre no máximo ao curar.' },
  ],
  'men-bree': [
    { id: 'bree-pony', name: 'Bree-pony', namePt: 'Pônei de Bree', scopes: ['men-bree'], abilityBonuses: { wisdom: 1 }, summaryPt: 'Pônei companheiro corajoso.' },
    { id: 'defiance', name: 'Defiance', namePt: 'Desafio', scopes: ['men-bree'], abilityBonuses: { constitution: 1 }, summaryPt: 'Cura com ação bônus gastando dado de vida.' },
    { id: 'desperate-courage', name: 'Desperate Courage', namePt: 'Coragem Desesperada', scopes: ['men-bree'], abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], summaryPt: 'Inspiração ao ganhar pontos de Sombra.' },
    { id: 'friendly-and-familiar', name: 'Friendly and Familiar', namePt: 'Amigável e Familiar', scopes: ['men-bree'], abilityBonuses: { charisma: 1 }, summaryPt: 'Insight dobrado; vantagem em Persuasão com outros povos.' },
    { id: 'strange-as-news-from-bree', name: 'Strange as News from Bree', namePt: 'Estranho como Notícias de Bree', scopes: ['men-bree'], abilityChoice: ['intelligence', 'wisdom'], summaryPt: 'Proficiência em Investigação; rumor na Fase da Comunidade.' },
    { id: 'the-art-of-smoking', name: 'The Art of Smoking', namePt: 'Arte de Fumar', scopes: ['men-bree'], abilityChoice: ['intelligence', 'wisdom', 'charisma'], summaryPt: 'Expertise com cachimbo; mais usos de inspiração.' },
  ],
  rangers: [
    { id: 'endurance-of-the-ranger', name: 'Endurance of the Ranger', namePt: 'Resistência do Patrulheiro', scopes: ['rangers'], abilityBonuses: { constitution: 1 }, summaryPt: 'Vantagem em saves de Constituição.' },
    { id: 'foresight-of-their-kindred', name: 'Foresight of their Kindred', namePt: 'Previsão dos Antepassados', scopes: ['rangers'], abilityBonuses: { wisdom: 1 }, summaryPt: 'Pontos de previsão para rerrolar d20.' },
    { id: 'heir-of-arnor', name: 'Heir of Arnor', namePt: 'Herdeiro de Arnor', scopes: ['rangers'], abilityChoice: ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'], summaryPt: 'Artefato familiar númenóreano.' },
    { id: 'royalty-revealed', name: 'Royalty Revealed', namePt: 'Realeza Revelada', scopes: ['rangers'], abilityChoice: ['strength', 'charisma'], summaryPt: 'Revelar linhagem: vantagem e PV temporários para aliados.' },
    { id: 'strength-of-will', name: 'Strength of Will', namePt: 'Força de Vontade', scopes: ['rangers'], abilityChoice: ['wisdom', 'charisma'], summaryPt: 'Vantagem em saves de Carisma + bônus de Sabedoria.' },
    { id: 'ways-of-the-wild', name: 'Ways of the Wild', namePt: 'Caminhos do Selvagem', scopes: ['rangers'], abilityBonuses: { wisdom: 1 }, summaryPt: 'Múltiplos papéis em jornada; sucessos mágicos em perícias.' },
  ],
};

export const SCHOLAR_CRAFTS: CraftDefinition[] = [
  { id: 'beast-craft', name: 'Beast-craft', namePt: 'Ofício das Feras', summaryPt: 'Comunicar e domar bestas.' },
  { id: 'hand-craft', name: 'Hand-craft', namePt: 'Ofício das Mãos', summaryPt: 'Aprimorar itens com recompensas.' },
  { id: 'leech-craft', name: 'Leech-craft', namePt: 'Ofício Curativo', summaryPt: 'Curar feridas e doenças.' },
  { id: 'rune-craft', name: 'Rune-craft', namePt: 'Ofício das Runas', summaryPt: 'Runas de proteção e identificar artefatos.' },
  { id: 'song-craft', name: 'Song-craft', namePt: 'Ofício do Canto', summaryPt: 'Música que influencia emoções.' },
  { id: 'speech-craft', name: 'Speech-craft', namePt: 'Ofício da Fala', summaryPt: 'Vantagem com Elfos e Dúnedain; comandos.' },
  { id: 'weapon-craft', name: 'Weapon-craft', namePt: 'Ofício das Armas', summaryPt: 'Maestria com arma escolhida.' },
  { id: 'wood-craft', name: 'Wood-craft', namePt: 'Ofício da Floresta', summaryPt: 'Explore, caça e sobrevivência.' },
];

export const CULTURES_WITH_STARTING_VIRTUE = new Set(['bardings', 'men-bree']);

export function getVirtuesForCulture(cultureId: string | null): VirtueDefinition[] {
  if (!cultureId) return [...COMMON_VIRTUES];
  const cultural = CULTURAL_VIRTUES[cultureId as Exclude<VirtueScope, 'common'>] ?? [];
  return [...COMMON_VIRTUES, ...cultural];
}

export function getVirtueById(id: string): VirtueDefinition | undefined {
  return [...COMMON_VIRTUES, ...Object.values(CULTURAL_VIRTUES).flat()].find((v) => v.id === id);
}

export function getCraftById(id: string): CraftDefinition | undefined {
  return SCHOLAR_CRAFTS.find((c) => c.id === id);
}

export function cultureExpectsStartingVirtue(cultureId: string | null): boolean {
  return cultureId != null && CULTURES_WITH_STARTING_VIRTUE.has(cultureId);
}

export function callingExpectsStartingCraft(callingId: string | null): boolean {
  return callingId === 'scholar';
}
