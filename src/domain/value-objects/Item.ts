export type ItemCategory =
  | 'weapon'
  | 'armor'
  | 'shield'
  | 'ammo'
  | 'gear'
  | 'tool'
  | 'consumable'
  | 'treasure';

export type ArmorCategory = 'light' | 'medium' | 'heavy' | 'shield';

export type EquipSlot = 'mainHand' | 'offHand' | 'armor';

export interface ItemDefinition {
  id: string;
  namePt: string;
  category: ItemCategory;
  /** Slot ao equipar; omitido = não equipável */
  equipSlot?: EquipSlot;
  weight?: number;
  costCopper?: number;
  costSilver?: number;
  costGold?: number;
  damage?: string;
  damageType?: string;
  range?: string;
  properties?: string[];
  /** CA base da armadura (sem mod. Destreza) */
  baseAc?: number;
  armorCategory?: ArmorCategory;
  maxDexBonus?: number;
  /** Arma requer duas mãos */
  twoHanded?: boolean;
  stackable?: boolean;
  description?: string;
}

export interface InventoryItem {
  instanceId: string;
  definitionId: string;
  quantity: number;
  equipped: boolean;
  notes?: string;
}

export function createInventoryItem(
  definitionId: string,
  quantity = 1,
  equipped = false,
): InventoryItem {
  return {
    instanceId: crypto.randomUUID(),
    definitionId,
    quantity,
    equipped,
  };
}
