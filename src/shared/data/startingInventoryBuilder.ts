import { createInventoryItem, type InventoryItem } from '../../domain/value-objects/Item';
import { getItemDefinition } from './itemCatalog';
import { getCulture } from './characterCreationData';
import {
  getCallingEquipment,
  type CallingEquipmentDefinition,
} from './startingEquipmentData';

type GearEntry = { id: string; quantity?: number };

/** Starting Gear — tabela p. 71 do PDF */
const CULTURE_GEAR: Record<string, GearEntry[]> = {
  Frugal: [
    { id: 'backpack' },
    { id: 'bedroll' },
    { id: 'mess-kit' },
    { id: 'tinderbox' },
    { id: 'torches-10' },
    { id: 'rations-1-day', quantity: 5 },
    { id: 'waterskin' },
  ],
  Comum: [
    { id: 'backpack' },
    { id: 'bedroll' },
    { id: 'mess-kit' },
    { id: 'tinderbox' },
    { id: 'torches-10' },
    { id: 'rations-1-day', quantity: 10 },
    { id: 'waterskin' },
    { id: 'rope-hempen-50' },
  ],
  Próspero: [
    { id: 'backpack' },
    { id: 'bedroll' },
    { id: 'mess-kit' },
    { id: 'tinderbox' },
    { id: 'lantern-hooded' },
    { id: 'oil-flask', quantity: 3 },
    { id: 'rations-cram-1-day', quantity: 10 },
    { id: 'waterskin' },
    { id: 'rope-silk-50' },
    { id: 'tent-two-person' },
  ],
};

const SCHOLAR_TOOL_MAP: Record<string, string> = {
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

/** Opções de equipamento do chamado → itens do PDF */
const EQUIPMENT_OPTION_ITEMS: Record<string, string[]> = {
  'ring-mail': ['ring-mail'],
  hide: ['hide'],
  'leather-greatbow': ['leather-shirt', 'great-bow', 'quiver', 'arrows-20'],
  'melee-martial-shield': ['sword', 'shield'],
  'melee-martial-and-simple': ['sword', 'axe'],
  bow: ['bow', 'quiver', 'arrows-20'],
  'two-simple-melee': ['spear', 'club'],
  'short-sword': ['sword-short'],
  sword: ['sword'],
  'leather-shirt': ['leather-shirt'],
  'armor-ranged-bow': ['leather-shirt', 'bow', 'quiver', 'arrows-20'],
  'great-bow': ['great-bow', 'quiver', 'arrows-20'],
  'simple-melee': ['spear'],
};

function itemsFromOption(optionId: string): string[] {
  return EQUIPMENT_OPTION_ITEMS[optionId] ?? [];
}

function addItem(
  inventory: InventoryItem[],
  definitionId: string,
  quantity = 1,
): void {
  const def = getItemDefinition(definitionId);
  if (!def) return;

  if (def.stackable) {
    const existing = inventory.find(
      (i) => i.definitionId === definitionId && !i.equipped,
    );
    if (existing) {
      existing.quantity += quantity;
      return;
    }
    inventory.push({ ...createInventoryItem(definitionId), quantity });
    return;
  }

  for (let i = 0; i < quantity; i++) {
    inventory.push(createInventoryItem(definitionId));
  }
}

function addGearEntries(inventory: InventoryItem[], entries: GearEntry[]): void {
  for (const entry of entries) {
    addItem(inventory, entry.id, entry.quantity ?? 1);
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
    if (fixed.includes('arma simples')) ids.push('spear');
    if (fixed.includes('Camisa de couro')) ids.push('leather-shirt');
    if (fixed.includes('Ferramentas de ladrão')) ids.push('thieves-tools');
    if (fixed.includes('ferramenta à escolha')) ids.push('hatchet');
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
  const gearEntries = CULTURE_GEAR[living] ?? CULTURE_GEAR.Comum;
  addGearEntries(inventory, gearEntries);

  if (callingId) {
    const callingDef = getCallingEquipment(callingId);
    if (callingDef) {
      for (const id of resolveCallingItems(
        callingId,
        callingDef,
        equipmentOptions,
        scholarTools,
      )) {
        addItem(inventory, id);
      }
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
