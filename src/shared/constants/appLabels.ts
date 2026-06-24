/** Rótulos visíveis na ficha — nomes claros para o jogador. */

export const APP_TITLE = 'O Senhor dos Anéis RPG';
export const APP_SUBTITLE = 'Ficha digital de personagem';

export const SHEET_TABS = {
  creation: 'Criação',
  dice: 'Atributos',
  inventory: 'Inventário',
  shop: 'Mercado',
  summary: 'Ficha',
  story: 'História',
} as const;

export const SHEET_SECTIONS = {
  equipmentVirtues: 'Equipamento & virtudes',
  equipmentSummary: 'Equipamento & virtudes',
  magicalTreasures: 'Tesouros & recompensas',
  storyChronicle: 'Crônica do herói',
  fellowship: 'Comunidade & herdeiro',
  summaryTitle: 'Ficha do herói',
  summaryHint: 'Visão completa do personagem — consulta na mesa e impressão (Ctrl+P).',
} as const;

export const MAGICAL_UI = {
  panelTitle: 'Tesouros & recompensas',
  panelSubtitle: 'Itens do livro, melhorias de nível e objetos únicos da campanha.',
  catalogTitle: 'Adicionar do livro',
  catalogHint: 'Clique em um item para incluir na ficha.',
  legacyNotes: 'Anotações antigas (campo de texto anterior)',
} as const;

export const INVENTORY_UI = {
  pageEyebrow: 'Ficha de personagem',
  pageTitle: 'Inventário & equipamento',
  wornEquipment: 'Equipamento vestido',
  packContents: 'Conteúdo da mochila',
  loadBurden: 'Carga',
  totalValue: 'Valor total',
  openMarket: 'Abrir mercado',
  goToMarket: 'Ir ao mercado',
  sortInventory: 'Ordenar inventário',
  selectedItem: 'Item selecionado',
  treasuryOverview: 'Tesouraria',
  treasuryHint: 'Moedas da Terra-média',
  viewLedger: 'Ver detalhes da carteira',
  emptyPack: 'Mochila vazia.',
  addCustomPlaceholder: 'Item personalizado…',
  goldLabel: 'Ouro',
  silverLabel: 'Prata',
  copperLabel: 'Cobre',
  slotMainHand: 'Arma',
  slotOffHand: 'Mão sec.',
  slotArmor: 'Torso',
  useItem: 'Usar',
  sellItem: 'Vender',
  equipItem: 'Equipar',
  unequipItem: 'Desequipar',
  removeItem: 'Remover',
  quantity: 'Quantidade',
  noDescription: 'Sem descrição no catálogo — veja as estatísticas abaixo.',
  statsTitle: 'Estatísticas',
  descriptionTitle: 'Descrição',
} as const;

export const SHOP_UI = {
  pageTitle: 'Mercador da Terra-média',
  pageSubtitle: 'Equipamentos e provisões — Cap. 4 do livro',
  wallet: 'Carteira',
  walletTotal: 'Equivalente total',
  searchPlaceholder: 'Buscar por nome, propriedade ou descrição…',
  itemCount: 'itens no catálogo',
  buy: 'Comprar',
  receive: 'Receber',
  receiveHint: 'Sem custo — presente do mestre ou loot narrativo',
  shortfall: 'Faltam {n} cobre',
  insufficientGold: 'Moedas insuficientes',
  owned: 'Na mochila',
  sortName: 'Nome A–Z',
  sortPriceAsc: 'Preço: menor',
  sortPriceDesc: 'Preço: maior',
  clearFilters: 'Limpar filtros',
  empty: 'Nenhum item encontrado.',
  quantity: 'Quantidade',
  catalogSource: 'Catálogo das tabelas do livro (págs. 71–76). Despesas de estalagem não são itens.',
} as const;
