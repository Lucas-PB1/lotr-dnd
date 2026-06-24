import type { ItemDefinition } from '../../domain/value-objects/Item';
import {
  PDF_CATALOG_SOURCE,
  PDF_EQUIPMENT_CATALOG,
} from './lotrPdfEquipment';

export { PDF_CATALOG_SOURCE };

export const ITEM_CATALOG: ItemDefinition[] = PDF_EQUIPMENT_CATALOG;

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
