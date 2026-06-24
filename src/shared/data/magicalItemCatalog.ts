import type { MagicalItemDefinition } from '../../domain/value-objects/MagicalItem';
import {
  MAGICAL_CATALOG_GROUPS,
  MAGICAL_ITEMS_CATALOG,
  MAGICAL_TIER_LABELS,
} from './magicalItemsCatalog';

export { MAGICAL_TIER_LABELS, MAGICAL_CATALOG_GROUPS };

const byId = new Map(MAGICAL_ITEMS_CATALOG.map((d) => [d.id, d]));

export function getMagicalItemDefinition(id: string): MagicalItemDefinition | undefined {
  return byId.get(id);
}

export function getMagicalCatalogItems(): MagicalItemDefinition[] {
  return [...MAGICAL_ITEMS_CATALOG];
}

export function getMagicalCatalogByGroup(groupId: string): MagicalItemDefinition[] {
  const group = MAGICAL_CATALOG_GROUPS.find((g) => g.id === groupId);
  if (!group) return [];

  return MAGICAL_ITEMS_CATALOG.filter((d) => d.tier === group.tier);
}

export function searchMagicalCatalog(query: string): MagicalItemDefinition[] {
  const q = query.trim().toLowerCase();
  if (!q) return getMagicalCatalogItems();
  return MAGICAL_ITEMS_CATALOG.filter(
    (d) =>
      d.namePt.toLowerCase().includes(q) ||
      d.nameEn?.toLowerCase().includes(q) ||
      d.descriptionPt?.toLowerCase().includes(q),
  );
}
