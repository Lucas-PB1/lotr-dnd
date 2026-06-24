import type { ItemDefinition } from '../../domain/value-objects/Item';
import { ARMOR_CATALOG } from './catalog/armor';
import { GEAR_CATALOG } from './catalog/gear';
import { TOOL_CATALOG } from './catalog/tools';
import { WEAPON_CATALOG } from './catalog/weapons';

const CUSTOM_ITEM: ItemDefinition = {
  id: 'custom',
  namePt: 'Item personalizado',
  category: 'treasure',
  description: 'Item adicionado manualmente pelo jogador.',
};

export const ITEM_CATALOG: ItemDefinition[] = [
  ...WEAPON_CATALOG,
  ...ARMOR_CATALOG,
  ...GEAR_CATALOG,
  ...TOOL_CATALOG,
  CUSTOM_ITEM,
];

const catalogMap = new Map(ITEM_CATALOG.map((item) => [item.id, item]));

export function getItemDefinition(id: string): ItemDefinition | undefined {
  return catalogMap.get(id);
}

export function getAllCatalogItems(): ItemDefinition[] {
  return ITEM_CATALOG.filter((i) => i.id !== 'custom');
}

export function getShopItems(): ItemDefinition[] {
  return getAllCatalogItems()
    .filter(
      (item) =>
        (item.costCopper ?? 0) > 0 ||
        (item.costSilver ?? 0) > 0 ||
        (item.costGold ?? 0) > 0,
    )
    .sort((a, b) => a.namePt.localeCompare(b.namePt, 'pt'));
}

export function getCatalogByCategory(
  category: ItemDefinition['category'],
): ItemDefinition[] {
  return getAllCatalogItems().filter((i) => i.category === category);
}

export function searchCatalogItems(query: string): ItemDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return getShopItems();
  return getShopItems().filter(
    (item) =>
      item.namePt.toLowerCase().includes(q) ||
      item.description?.toLowerCase().includes(q) ||
      item.properties?.some((p) => p.toLowerCase().includes(q)),
  );
}

export function itemCostInCopper(item: ItemDefinition): number {
  return (item.costCopper ?? 0) + (item.costSilver ?? 0) * 10 + (item.costGold ?? 0) * 100;
}

export function formatItemCost(item: ItemDefinition): string {
  const parts: string[] = [];
  if (item.costGold) parts.push(`${item.costGold} ouro`);
  if (item.costSilver) parts.push(`${item.costSilver} prata`);
  if (item.costCopper) parts.push(`${item.costCopper} cobre`);
  return parts.join(', ') || '—';
}

export const CATEGORY_LABELS: Record<ItemDefinition['category'], string> = {
  weapon: 'Arma',
  armor: 'Armadura',
  shield: 'Escudo',
  ammo: 'Munição',
  gear: 'Equipamento',
  tool: 'Ferramenta',
  consumable: 'Consumível',
  treasure: 'Tesouro',
};

export const SHOP_CATEGORY_FILTERS: { id: ItemDefinition['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'weapon', label: 'Armas' },
  { id: 'armor', label: 'Armaduras' },
  { id: 'shield', label: 'Escudos' },
  { id: 'ammo', label: 'Munição' },
  { id: 'gear', label: 'Equipamento' },
  { id: 'tool', label: 'Ferramentas' },
  { id: 'consumable', label: 'Consumíveis' },
];
