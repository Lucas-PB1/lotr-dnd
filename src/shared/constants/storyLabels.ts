/** Rótulos da aba História (visual Stitch). */

export const STORY_UI = {
  pageTitle: 'História & mesa',
  pageHint: 'Aparência, Comunidade e crônica — o essencial para roleplay, sem repetir a ficha mecânica.',
  progressLabel: 'Seções preenchidas',
  sectionAppearance: 'Aparência',
  sectionFellowship: 'Comunidade',
  sectionChronicle: 'Crônica',
  originTitle: 'Origem na criação',
  originEmpty: 'Defina cultura e chamado na Criação para ver o pano de fundo aqui.',
  originExpand: 'Ver antecedente completo',
  presetsKicker: 'Modelos',
  traitsLabel: 'Traços rápidos',
  portraitLabel: 'Retrato escrito',
  fellowshipIdentity: 'Identidade',
  fellowshipName: 'Nome da Comunidade',
  fellowshipHeir: 'Herdeiro',
  fellowshipPoints: 'Pontos',
  fellowshipNameSuggestions: 'Sugestões de nome',
  fellowshipPatrons: 'Refúgios & laços',
  fellowshipInvestment: 'Investimentos',
  fellowshipLoreTitle: 'Inspirar — Fase da Comunidade',
  chronicleLabel: 'História do herói',
  relicsLabel: 'Relíquias narrativas',
  relicsHint: 'Fora do Inventário — heranças e objetos únicos da crônica.',
  chronicleLoreTitle: 'Ganchos & motivações',
  applyStarter: 'Transcrever do antecedente',
  loreInspire: 'Inspirar com sugestões',
} as const;

export type StorySectionId = 'appearance' | 'fellowship' | 'chronicle';

export const STORY_SECTION_NUMERALS = ['I', 'II', 'III'] as const;
