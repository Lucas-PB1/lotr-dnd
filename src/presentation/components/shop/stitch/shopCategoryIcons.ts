import type { ItemDefinition } from '../../../../domain/value-objects/Item';

/** Nomes válidos em Material Symbols Outlined (evitar ícones inexistentes que viram texto). */
export const SHOP_CATEGORY_MATERIAL_ICONS: Record<ItemDefinition['category'], string> = {
  weapon: 'swords',
  armor: 'shield',
  shield: 'shield',
  ammo: 'arrow_forward',
  gear: 'backpack',
  tool: 'hardware',
  consumable: 'bakery_dining',
  treasure: 'diamond',
};
