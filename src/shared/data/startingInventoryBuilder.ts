import { createInventoryItem, type InventoryItem } from '../../domain/value-objects/Item';
import { getItemDefinition } from './itemCatalog';
import { getCulture } from './characterCreationData';
import {
  getCallingEquipment,
  type CallingEquipmentDefinition,
} from './startingEquipmentData';

const CULTURE_GEAR: Record<string, string[]> = {
  Frugal: [
    'backpack',
    'sleeping-bag',
    'mess-kit',
    'tinderbox',
    'torches-10',
    'rations-5',
    'waterskin',
  ],
  Comum: [
    'backpack',
    'sleeping-bag',
    'mess-kit',
    'tinderbox',
    'torches-10',
    'rations-10',
    'waterskin',
    'hemp-rope',
  ],
  Próspero: [
    'backpack',
    'sleeping-bag',
    'mess-kit',
    'tinderbox',
    'hooded-lantern',
    'oil-flask',
    'cram-10',
    'waterskin',
    'silk-rope',
    'tent',
  ],
};

const SCHOLAR_TOOL_MAP: Record<string, string> = {
  'Suprimentos de calígrafo': 'calligraphy-supplies',
  'Ferramentas de cartógrafo': 'cartographers-tools',
  'Kit de herbalismo': 'herbalism-kit',
  'Instrumento musical': 'musical-instrument',
  'Ferramentas de navegador': 'navigators-tools',
  Cachimbo: 'pipe',
};

/** Opções de equipamento do chamado → IDs do catálogo */
const EQUIPMENT_OPTION_ITEMS: Record<string, string[]> = {
  'ring-mail': ['ring-mail'],
  hide: ['hide'],
  'leather-greatbow': ['leather-shirt', 'great-bow', 'quiver', 'arrows-20'],
  'martial-shield': ['martial-weapon', 'shield'],
  'martial-simple': ['martial-weapon', 'simple-weapon'],
  bow: ['bow', 'quiver', 'arrows-20'],
  'two-simple': ['simple-weapon', 'simple-weapon'],
  'short-sword': ['short-sword'],
  sword: ['sword'],
  'leather-shirt': ['leather-shirt'],
  'armor-ranged-bow': ['leather-shirt', 'bow', 'quiver', 'arrows-20'],
  'great-bow': ['great-bow', 'quiver', 'arrows-20'],
  'simple-melee': ['simple-weapon'],
};

function itemsFromOption(optionId: string): string[] {
  return EQUIPMENT_OPTION_ITEMS[optionId] ?? [];
}

function addItems(inventory: InventoryItem[], definitionIds: string[]): void {
  for (const definitionId of definitionIds) {
    const def = getItemDefinition(definitionId);
    if (def?.stackable) {
      const existing = inventory.find(
        (i) => i.definitionId === definitionId && !i.equipped,
      );
      if (existing) {
        existing.quantity += 1;
        continue;
      }
    }
    inventory.push(createInventoryItem(definitionId));
  }
}

function resolveCallingItems(
  callingId: string,
  callingDef: CallingEquipmentDefinition,
  equipmentOptions: Record<string, string>,
  scholarTools: string[],
): string[] {
  const ids: string[] = [];

  for (const fixed of callingDef.fixedItems) {
    if (callingId === 'scholar' && fixed.includes('2 ferramentas')) {
      for (const tool of scholarTools) {
        const id = SCHOLAR_TOOL_MAP[tool];
        if (id) ids.push(id);
      }
      continue;
    }
    if (fixed.includes('Kit de curandeiro')) ids.push('healers-kit');
    if (fixed.includes('arma simples')) ids.push('simple-weapon');
    if (fixed.includes('Camisa de couro')) ids.push('leather-shirt');
    if (fixed.includes('Ferramentas de ladrão')) ids.push('thieves-tools');
    if (fixed.includes('ferramenta à escolha')) ids.push('simple-weapon');
  }

  for (const group of callingDef.optionGroups) {
    const chosen = equipmentOptions[group.id] ?? group.options[0]?.id ?? '';
    const groupKey =
      group.id === 'armor-ranged' && chosen === 'bow'
        ? 'armor-ranged-bow'
        : chosen;
    ids.push(...itemsFromOption(groupKey));
  }

  return ids;
}

export function buildStartingInventory(
  cultureId: string | null,
  callingId: string | null,
  equipmentOptions: Record<string, string>,
  scholarTools: string[],
): InventoryItem[] {
  const inventory: InventoryItem[] = [];

  const culture = cultureId ? getCulture(cultureId) : null;
  const living = culture?.standardOfLiving ?? 'Comum';
  const gearIds = CULTURE_GEAR[living] ?? CULTURE_GEAR.Comum;
  addItems(inventory, gearIds);

  if (callingId) {
    const callingDef = getCallingEquipment(callingId);
    if (callingDef) {
      addItems(
        inventory,
        resolveCallingItems(callingId, callingDef, equipmentOptions, scholarTools),
      );
    }
  }

  return inventory;
}

export function inventoryToSummaryText(inventory: InventoryItem[]): string {
  const lines: string[] = [];
  const equipped = inventory.filter((i) => i.equipped);
  const carried = inventory.filter((i) => !i.equipped);

  if (equipped.length > 0) {
    lines.push('=== Equipado ===');
    for (const item of equipped) {
      const def = getItemDefinition(item.definitionId);
      const qty = item.quantity > 1 ? ` ×${item.quantity}` : '';
      lines.push(`• ${def?.namePt ?? item.definitionId}${qty}`);
    }
  }

  if (carried.length > 0) {
    if (lines.length) lines.push('');
    lines.push('=== Inventário ===');
    for (const item of carried) {
      const def = getItemDefinition(item.definitionId);
      const qty = item.quantity > 1 ? ` ×${item.quantity}` : '';
      lines.push(`• ${def?.namePt ?? item.definitionId}${qty}`);
    }
  }

  return lines.join('\n');
}
