import { getCulture } from './characterCreationData';

export interface EquipmentOptionGroup {
  id: string;
  labelPt: string;
  options: { id: string; labelPt: string }[];
}

export interface CallingEquipmentDefinition {
  callingId: string;
  fixedItems: string[];
  optionGroups: EquipmentOptionGroup[];
  /** Ferramentas fixas ou escolha do jogador */
  toolNote?: string;
}

const STANDARD_OF_LIVING_GEAR: Record<string, { labelPt: string; items: string[]; silver: number }> = {
  Frugal: {
    labelPt: 'Frugal',
    items: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      '10 tochas', '5 dias de rações', 'Odre',
    ],
    silver: 10,
  },
  Comum: {
    labelPt: 'Comum',
    items: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      '10 tochas', '10 dias de rações', 'Odre', 'Corda de cânhamo (15 m)',
    ],
    silver: 15,
  },
  Próspero: {
    labelPt: 'Próspero',
    items: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      'Lanterna com capuz', '3 frascos de óleo', '10 dias de cram', 'Odre',
      'Corda de seda (15 m)', 'Tenda',
    ],
    silver: 20,
  },
};

export const CALLING_EQUIPMENT: CallingEquipmentDefinition[] = [
  {
    callingId: 'captain',
    fixedItems: [],
    optionGroups: [
      {
        id: 'armor',
        labelPt: 'Armadura',
        options: [
          { id: 'ring-mail', labelPt: 'Cota de anéis (ring-mail)' },
          { id: 'hide', labelPt: 'Armadura de couro grosso (hide)' },
        ],
      },
      {
        id: 'weapons-melee',
        labelPt: 'Armas corpo a corpo',
        options: [
          { id: 'martial-shield', labelPt: 'Arma marcial + escudo' },
          { id: 'martial-simple', labelPt: 'Arma marcial + arma simples' },
        ],
      },
      {
        id: 'weapons-ranged',
        labelPt: 'Armas à distância',
        options: [
          { id: 'bow', labelPt: 'Arco + aljava (20 flechas)' },
          { id: 'two-simple', labelPt: 'Duas armas simples corpo a corpo' },
        ],
      },
    ],
  },
  {
    callingId: 'champion',
    fixedItems: [],
    optionGroups: [
      {
        id: 'armor',
        labelPt: 'Armadura',
        options: [
          { id: 'ring-mail', labelPt: 'Cota de anéis' },
          { id: 'hide', labelPt: 'Couro grosso (hide)' },
          { id: 'leather-greatbow', labelPt: 'Camisa de couro + great bow + 20 flechas' },
        ],
      },
      {
        id: 'weapons-melee',
        labelPt: 'Armas corpo a corpo',
        options: [
          { id: 'martial-shield', labelPt: 'Arma marcial + escudo' },
          { id: 'martial-simple', labelPt: 'Arma marcial + arma simples' },
        ],
      },
      {
        id: 'weapons-ranged',
        labelPt: 'Armas à distância',
        options: [
          { id: 'bow', labelPt: 'Arco + aljava (20 flechas)' },
          { id: 'two-simple', labelPt: 'Duas armas simples' },
        ],
      },
    ],
  },
  {
    callingId: 'messenger',
    fixedItems: ['1 ferramenta à escolha', '1 arma simples corpo a corpo'],
    optionGroups: [
      {
        id: 'blade',
        labelPt: 'Lâmina',
        options: [
          { id: 'short-sword', labelPt: 'Espada curta (short sword)' },
          { id: 'sword', labelPt: 'Espada (sword)' },
        ],
      },
      {
        id: 'armor-ranged',
        labelPt: 'Proteção',
        options: [
          { id: 'leather-shirt', labelPt: 'Camisa de couro (leather shirt)' },
          { id: 'bow', labelPt: 'Arco + aljava (20 flechas)' },
        ],
      },
    ],
  },
  {
    callingId: 'scholar',
    fixedItems: ['Kit de curandeiro', '1 arma simples corpo a corpo', '2 ferramentas à escolha'],
    optionGroups: [
      {
        id: 'armor-ranged',
        labelPt: 'Proteção',
        options: [
          { id: 'leather-shirt', labelPt: 'Camisa de couro' },
          { id: 'bow', labelPt: 'Arco + aljava (20 flechas)' },
        ],
      },
    ],
    toolNote: 'Ferramentas: caligrafia, cartografia, herbalismo, instrumento musical, navegação ou cachimbo (escolha 2)',
  },
  {
    callingId: 'treasure-hunter',
    fixedItems: ['Camisa de couro', '1 arma simples corpo a corpo', 'Ferramentas de ladrão'],
    optionGroups: [
      {
        id: 'blade',
        labelPt: 'Lâmina',
        options: [
          { id: 'short-sword', labelPt: 'Espada curta' },
          { id: 'sword', labelPt: 'Espada' },
        ],
      },
      {
        id: 'weapons-extra',
        labelPt: 'Arma adicional',
        options: [
          { id: 'bow', labelPt: 'Arco + aljava (20 flechas)' },
          { id: 'simple-melee', labelPt: 'Arma simples corpo a corpo' },
        ],
      },
    ],
  },
  {
    callingId: 'warden',
    fixedItems: [],
    optionGroups: [
      {
        id: 'armor',
        labelPt: 'Armadura',
        options: [
          { id: 'hide', labelPt: 'Couro grosso (hide)' },
          { id: 'leather-shirt', labelPt: 'Camisa de couro' },
        ],
      },
      {
        id: 'weapons-melee',
        labelPt: 'Armas corpo a corpo',
        options: [
          { id: 'martial-shield', labelPt: 'Arma marcial + escudo' },
          { id: 'martial-simple', labelPt: 'Arma marcial + arma simples' },
        ],
      },
      {
        id: 'weapons-ranged',
        labelPt: 'Armas à distância',
        options: [
          { id: 'great-bow', labelPt: 'Great bow + aljava (20 flechas)' },
          { id: 'two-simple', labelPt: 'Duas armas simples' },
        ],
      },
    ],
  },
];

export function getCallingEquipment(callingId: string | null): CallingEquipmentDefinition | null {
  if (!callingId) return null;
  return CALLING_EQUIPMENT.find((c) => c.callingId === callingId) ?? null;
}

export function getDefaultEquipmentOptions(callingId: string | null): Record<string, string> {
  const def = getCallingEquipment(callingId);
  if (!def) return {};
  return Object.fromEntries(
    def.optionGroups.map((g) => [g.id, g.options[0]?.id ?? '']),
  );
}

export function buildStartingEquipmentText(
  cultureId: string | null,
  callingId: string | null,
  equipmentOptions: Record<string, string>,
  scholarTools: string[],
): { equipment: string; silver: number } {
  const culture = cultureId ? getCulture(cultureId) : null;
  const living = culture?.standardOfLiving ?? 'Comum';
  const cultureGear = STANDARD_OF_LIVING_GEAR[living] ?? STANDARD_OF_LIVING_GEAR.Comum;

  const lines: string[] = [
    `=== Equipamento da cultura (${cultureGear.labelPt}) ===`,
    ...cultureGear.items.map((i) => `• ${i}`),
    `• Bolsa com ${cultureGear.silver} peças de prata`,
  ];

  const callingDef = getCallingEquipment(callingId);
  if (callingDef) {
    lines.push('', `=== Equipamento do chamado ===`);
    for (const item of callingDef.fixedItems) {
      if (callingId === 'scholar' && item.includes('2 ferramentas')) {
        const tools = scholarTools.length > 0 ? scholarTools.join(', ') : '— escolha na criação —';
        lines.push(`• 2 ferramentas: ${tools}`);
      } else {
        lines.push(`• ${item}`);
      }
    }
    for (const group of callingDef.optionGroups) {
      const chosen = equipmentOptions[group.id] ?? group.options[0]?.id;
      const option = group.options.find((o) => o.id === chosen);
      lines.push(`• ${group.labelPt}: ${option?.labelPt ?? chosen}`);
    }
    if (callingDef.toolNote && callingId !== 'scholar') {
      lines.push(`• ${callingDef.toolNote}`);
    }
  }

  return { equipment: lines.join('\n'), silver: cultureGear.silver };
}

export const SCHOLAR_TOOL_OPTIONS = [
  'Suprimentos de calígrafo',
  'Ferramentas de cartógrafo',
  'Kit de herbalismo',
  'Ferramentas de navegador',
  'Cachimbo',
  'Flauta',
  'Violino',
  'Harpa',
  'Trombeta',
  'Clarinete',
  'Tambor',
  'Trompa',
  'Viola',
];
