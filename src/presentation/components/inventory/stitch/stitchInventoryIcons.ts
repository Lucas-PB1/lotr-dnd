import type { ItemDefinition } from '../../../../domain/value-objects/Item';

export const MATERIAL_SLOT_ICONS = {
  mainHand: 'swords',
  offHand: 'shield',
  armor: 'shield_with_heart',
  empty: 'inventory_2',
} as const;

export const MATERIAL_CATEGORY_ICONS: Record<ItemDefinition['category'] | 'custom', string> = {
  weapon: 'swords',
  armor: 'shield_with_heart',
  shield: 'shield',
  ammo: 'target',
  gear: 'backpack',
  tool: 'handyman',
  consumable: 'restaurant',
  treasure: 'diamond',
  custom: 'star',
};
