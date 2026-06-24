import type { CreationChoices } from '../../domain/services/CharacterCreationService';
import { getBackground, getCulture } from './characterCreationData';
import { getCallingEquipment } from './startingEquipmentData';

/** Armas simples corpo a corpo — tabela p. 74 */
export const SIMPLE_MELEE_WEAPON_IDS = [
  'axe',
  'club',
  'club-great',
  'dagger',
  'hammer',
  'hatchet',
  'spear',
  'spear-short',
  'staff',
] as const;

/** Armas marciais corpo a corpo — tabela p. 75 */
export const MARTIAL_MELEE_WEAPON_IDS = [
  'axe-battle',
  'axe-great',
  'hammer-heavy',
  'mattock',
  'spear-great',
  'sword',
  'sword-long',
  'sword-short',
] as const;

export const GAMING_SET_IDS = ['chess', 'bowls', 'darts-game', 'quoits'] as const;

export const INSTRUMENT_IDS = [
  'clarinet',
  'drum',
  'fiddle',
  'flute',
  'harp',
  'horn',
  'trumpet',
  'viol',
] as const;

export const SCHOLAR_TOOL_IDS = [
  'calligraphers-supplies',
  'cartographers-tools',
  'herbalism-kit',
  'navigators-tools',
  'pipe',
  ...INSTRUMENT_IDS,
] as const;

export const MESSENGER_TOOL_IDS = [
  'brewers-supplies',
  'calligraphers-supplies',
  'carpenters-tools',
  'cartographers-tools',
  'cobblers-tools',
  'cooks-utensils',
  'glassblowers-tools',
  'jewellers-tools',
  'leatherworkers-tools',
  'masons-tools',
  'painters-supplies',
  'potters-tools',
  'smiths-tools',
  'weavers-tools',
  'woodcarvers-tools',
  'herbalism-kit',
  'navigators-tools',
  'pipe',
  'thieves-tools',
  ...GAMING_SET_IDS,
  ...INSTRUMENT_IDS,
] as const;

export type StartingItemSlotGroup = 'origem' | 'chamado' | 'equipamento';

export interface StartingItemSlot {
  id: string;
  labelPt: string;
  hintPt?: string;
  group: StartingItemSlotGroup;
  allowedItemIds: readonly string[];
}

const EQUIPMENT_BUNDLE_ITEMS: Record<string, string[]> = {
  'ring-mail': ['ring-mail'],
  hide: ['hide'],
  'leather-greatbow': ['leather-shirt', 'great-bow', 'quiver', 'arrows-20'],
  bow: ['bow', 'quiver', 'arrows-20'],
  'short-sword': ['sword-short'],
  sword: ['sword'],
  'leather-shirt': ['leather-shirt'],
  'armor-ranged-bow': ['leather-shirt', 'bow', 'quiver', 'arrows-20'],
  'great-bow': ['great-bow', 'quiver', 'arrows-20'],
  'melee-martial-shield': ['shield'],
  'simple-melee': [],
};

const TOOL_PHRASE_MAP: Record<string, readonly string[]> = {
  "smith's tools": ['smiths-tools'],
  "smiths tools": ['smiths-tools'],
  'herbalism kit': ['herbalism-kit'],
  "brewer's supplies": ['brewers-supplies'],
  "brewers supplies": ['brewers-supplies'],
  "cook's utensils": ['cooks-utensils'],
  "cooks utensils": ['cooks-utensils'],
  "leatherworker's tools": ['leatherworkers-tools'],
  "leatherworkers tools": ['leatherworkers-tools'],
  "woodcarver's tools": ['woodcarvers-tools'],
  "woodcarvers tools": ['woodcarvers-tools'],
  'gaming set': GAMING_SET_IDS,
  "calligrapher's supplies": ['calligraphers-supplies'],
  "calligraphers supplies": ['calligraphers-supplies'],
  "carpenter's tools": ['carpenters-tools'],
  "carpenters tools": ['carpenters-tools'],
  "cartographer's tools": ['cartographers-tools'],
  "cartographers tools": ['cartographers-tools'],
  "cobbler's tools": ['cobblers-tools'],
  "cobblers tools": ['cobblers-tools'],
  "mason's tools": ['masons-tools'],
  "masons tools": ['masons-tools'],
  "potter's tools": ['potters-tools'],
  "potters tools": ['potters-tools'],
  pipes: ['pipe'],
  pipe: ['pipe'],
  'instrumento musical': INSTRUMENT_IDS,
  'instrumento': INSTRUMENT_IDS,
  "jeweller's tools": ['jewellers-tools'],
  "jewellers tools": ['jewellers-tools'],
  "thieves' tools": ['thieves-tools'],
  "thieves tools": ['thieves-tools'],
  "navigator's tools": ['navigators-tools'],
  "navigators tools": ['navigators-tools'],
};

function parseToolProficiency(text: string): string[] {
  const normalized = text.toLowerCase();
  const parts = normalized.split(/\s+ou\s+|\s+or\s+|,\s*/);
  const ids = new Set<string>();

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;
    const mapped = TOOL_PHRASE_MAP[trimmed];
    if (mapped) {
      mapped.forEach((id) => ids.add(id));
      continue;
    }
    for (const [phrase, itemIds] of Object.entries(TOOL_PHRASE_MAP)) {
      if (trimmed.includes(phrase)) {
        itemIds.forEach((id) => ids.add(id));
      }
    }
  }

  return [...ids];
}

function optionId(choices: CreationChoices, groupId: string): string {
  const callingDef = getCallingEquipment(choices.callingId);
  const group = callingDef?.optionGroups.find((g) => g.id === groupId);
  return choices.equipmentOptions?.[groupId] ?? group?.options[0]?.id ?? '';
}

function addWeaponSlots(
  slots: StartingItemSlot[],
  choices: CreationChoices,
): void {
  const meleeOption = optionId(choices, 'weapons-melee');
  const rangedOption = optionId(choices, 'weapons-ranged');
  const extraOption = optionId(choices, 'weapons-extra');

  if (meleeOption === 'melee-martial-shield') {
    slots.push({
      id: 'pick-martial-melee',
      labelPt: 'Arma marcial corpo a corpo',
      group: 'equipamento',
      allowedItemIds: MARTIAL_MELEE_WEAPON_IDS,
    });
  }

  if (meleeOption === 'melee-martial-and-simple') {
    slots.push(
      {
        id: 'pick-martial-melee',
        labelPt: 'Arma marcial corpo a corpo',
        group: 'equipamento',
        allowedItemIds: MARTIAL_MELEE_WEAPON_IDS,
      },
      {
        id: 'pick-simple-with-martial',
        labelPt: 'Arma simples corpo a corpo (par)',
        group: 'equipamento',
        allowedItemIds: SIMPLE_MELEE_WEAPON_IDS,
      },
    );
  }

  if (rangedOption === 'two-simple-melee') {
    slots.push(
      {
        id: 'pick-simple-melee-a',
        labelPt: 'Arma simples corpo a corpo (1ª)',
        group: 'equipamento',
        allowedItemIds: SIMPLE_MELEE_WEAPON_IDS,
      },
      {
        id: 'pick-simple-melee-b',
        labelPt: 'Arma simples corpo a corpo (2ª)',
        group: 'equipamento',
        allowedItemIds: SIMPLE_MELEE_WEAPON_IDS,
      },
    );
  }

  if (extraOption === 'simple-melee') {
    slots.push({
      id: 'pick-extra-simple-melee',
      labelPt: 'Arma simples adicional',
      group: 'equipamento',
      allowedItemIds: SIMPLE_MELEE_WEAPON_IDS,
    });
  }
}

function addCallingFixedSlots(
  slots: StartingItemSlot[],
  choices: CreationChoices,
): void {
  const callingDef = getCallingEquipment(choices.callingId);
  if (!callingDef) return;

  for (const fixed of callingDef.fixedItems) {
    if (fixed.includes('arma simples')) {
      slots.push({
        id: 'fixed-simple-melee',
        labelPt: 'Arma simples corpo a corpo (chamado)',
        group: 'chamado',
        allowedItemIds: SIMPLE_MELEE_WEAPON_IDS,
      });
    }
    if (fixed.includes('ferramenta à escolha')) {
      slots.push({
        id: 'messenger-tool',
        labelPt: 'Ferramenta à escolha (mensageiro)',
        group: 'chamado',
        allowedItemIds: MESSENGER_TOOL_IDS,
      });
    }
  }

  if (choices.callingId === 'treasure-hunter') {
    slots.push({
      id: 'treasure-tool',
      labelPt: 'Ferramenta adicional (cartografia ou jogo)',
      group: 'chamado',
      allowedItemIds: ['cartographers-tools', ...GAMING_SET_IDS],
    });
  }
}

export function getStartingItemSlots(choices: CreationChoices): StartingItemSlot[] {
  const slots: StartingItemSlot[] = [];

  if (choices.cultureId && choices.backgroundId) {
    const background = getBackground(choices.cultureId, choices.backgroundId);
    if (background) {
      const toolIds = parseToolProficiency(background.toolProficiency);
      if (toolIds.length > 0) {
        slots.push({
          id: 'background-tool',
          labelPt: 'Ferramenta de antecedente',
          hintPt: background.name,
          group: 'origem',
          allowedItemIds: toolIds,
        });
      }
    }
  }

  addCallingFixedSlots(slots, choices);
  addWeaponSlots(slots, choices);

  return slots;
}

export function normalizeStartingItemChoices(
  choices: CreationChoices,
): Record<string, string> {
  const slots = getStartingItemSlots(choices);
  const validIds = new Set(slots.map((s) => s.id));
  const next: Record<string, string> = {};

  for (const slot of slots) {
    const current = choices.startingItemChoices?.[slot.id];
    next[slot.id] =
      current && slot.allowedItemIds.includes(current)
        ? current
        : slot.allowedItemIds[0];
  }

  for (const [key, value] of Object.entries(choices.startingItemChoices ?? {})) {
    if (!validIds.has(key)) continue;
    const slot = slots.find((s) => s.id === key);
    if (slot?.allowedItemIds.includes(value)) {
      next[key] = value;
    }
  }

  return next;
}

function bundleItems(choices: CreationChoices): string[] {
  const callingDef = getCallingEquipment(choices.callingId);
  if (!callingDef) return [];

  const ids: string[] = [];

  for (const fixed of callingDef.fixedItems) {
    if (fixed.includes('Kit de curandeiro')) ids.push('healers-kit');
    if (fixed.includes('Camisa de couro')) ids.push('leather-shirt');
    if (fixed.includes('Ferramentas de ladrão')) ids.push('thieves-tools');
  }

  if (choices.callingId === 'scholar') {
    for (const label of choices.scholarToolChoices ?? []) {
      const map: Record<string, string> = {
        'Suprimentos de calígrafo': 'calligraphers-supplies',
        'Ferramentas de cartógrafo': 'cartographers-tools',
        'Kit de herbalismo': 'herbalism-kit',
        'Ferramentas de navegador': 'navigators-tools',
        Cachimbo: 'pipe',
        Flauta: 'flute',
        Violino: 'fiddle',
        Harpa: 'harp',
        Trombeta: 'trumpet',
        Clarinete: 'clarinet',
        Tambor: 'drum',
        Trompa: 'horn',
        Viola: 'viol',
      };
      const id = map[label];
      if (id) ids.push(id);
    }
  }

  for (const group of callingDef.optionGroups) {
    const chosen = optionId(choices, group.id);
    const groupKey =
      group.id === 'armor-ranged' && chosen === 'bow' ? 'armor-ranged-bow' : chosen;
    const bundle = EQUIPMENT_BUNDLE_ITEMS[groupKey];
    if (bundle) ids.push(...bundle);

    if (groupKey === 'melee-martial-and-simple') {
      const martial = choices.startingItemChoices?.['pick-martial-melee'];
      const simple = choices.startingItemChoices?.['pick-simple-with-martial'];
      if (martial) ids.push(martial);
      if (simple) ids.push(simple);
      continue;
    }

    if (groupKey === 'melee-martial-shield') {
      const martial = choices.startingItemChoices?.['pick-martial-melee'];
      if (martial) ids.push(martial);
      continue;
    }

    if (groupKey === 'two-simple-melee') {
      const a = choices.startingItemChoices?.['pick-simple-melee-a'];
      const b = choices.startingItemChoices?.['pick-simple-melee-b'];
      if (a) ids.push(a);
      if (b) ids.push(b);
    }
  }

  const extraOption = optionId(choices, 'weapons-extra');
  if (extraOption === 'simple-melee') {
    const extra = choices.startingItemChoices?.['pick-extra-simple-melee'];
    if (extra) ids.push(extra);
  }

  return ids;
}

/** Todos os definitionIds do equipamento inicial (chamado + escolhas; sem kit cultural). */
export function resolveCallingItemIds(choices: CreationChoices): string[] {
  const itemChoices = normalizeStartingItemChoices(choices);
  const ids: string[] = [...bundleItems({ ...choices, startingItemChoices: itemChoices })];

  for (const slot of getStartingItemSlots(choices)) {
    if (
      slot.id === 'pick-martial-melee' ||
      slot.id === 'pick-simple-with-martial' ||
      slot.id === 'pick-simple-melee-a' ||
      slot.id === 'pick-simple-melee-b' ||
      slot.id === 'pick-extra-simple-melee'
    ) {
      continue;
    }
    const picked = itemChoices[slot.id];
    if (picked) ids.push(picked);
  }

  return ids;
}

export function resolveStartingItemIds(choices: CreationChoices): string[] {
  return resolveCallingItemIds(choices);
}

export function getCultureGearPreview(choices: CreationChoices): string[] {
  const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
  const living = culture?.standardOfLiving ?? 'Comum';
  const labels: Record<string, string[]> = {
    Frugal: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      'Tochas (10)', 'Rações (5 dias)', 'Odre',
    ],
    Comum: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      'Tochas (10)', 'Rações (10 dias)', 'Odre', 'Corda de cânhamo (15 m)',
    ],
    Próspero: [
      'Mochila', 'Saco de dormir', 'Kit de refeição', 'Pederneira',
      'Lanterna com capuz', 'Óleo (3)', 'Cram (10 dias)', 'Odre',
      'Corda de seda (15 m)', 'Tenda',
    ],
  };
  return labels[living] ?? labels.Comum;
}
