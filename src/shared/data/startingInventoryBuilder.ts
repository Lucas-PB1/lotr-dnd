import { createInventoryItem, type InventoryItem } from '../../domain/value-objects/Item';
import type { CreationChoices } from '../../domain/services/CharacterCreationService';
import { getItemDefinition } from './itemCatalog';
import { getCulture } from './characterCreationData';
import { resolveCallingItemIds } from './startingItemSlots';

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

export function buildStartingInventory(choices: CreationChoices): InventoryItem[] {
  const inventory: InventoryItem[] = [];

  const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
  const living = culture?.standardOfLiving ?? 'Comum';
  const gearEntries = CULTURE_GEAR[living] ?? CULTURE_GEAR.Comum;
  addGearEntries(inventory, gearEntries);

  for (const id of resolveCallingItemIds(choices)) {
    addItem(inventory, id);
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
