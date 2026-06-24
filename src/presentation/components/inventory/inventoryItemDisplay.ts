import type { InventoryItem, ItemDefinition } from '../../../domain/value-objects/Item';
import { CATEGORY_LABELS, formatItemCost, getItemDefinition } from '../../../shared/data/itemCatalog';

export const CATEGORY_ICONS: Record<ItemDefinition['category'], string> = {
  weapon: '⚔',
  armor: '🛡',
  shield: '🔰',
  ammo: '🏹',
  gear: '🎒',
  tool: '🔧',
  consumable: '🍞',
  treasure: '💎',
};

export function itemLabel(item: InventoryItem): string {
  if (item.definitionId === 'custom') return item.notes ?? 'Item personalizado';
  return getItemDefinition(item.definitionId)?.namePt ?? item.definitionId;
}

export function countOwned(inventory: InventoryItem[], definitionId: string): number {
  return inventory
    .filter((i) => i.definitionId === definitionId)
    .reduce((sum, i) => sum + i.quantity, 0);
}

export function buildItemStatLines(def: ItemDefinition): string[] {
  const lines: string[] = [];

  if (def.damage) {
    const dmg = [def.damage, def.damageType].filter(Boolean).join(' ');
    lines.push(dmg);
  }
  if (def.range) lines.push(`Alcance: ${def.range}`);
  if (def.baseAc != null) {
    const dex = def.maxDexBonus != null ? ` + Des (máx. +${def.maxDexBonus})` : ' + Des';
    lines.push(`CA ${def.baseAc}${dex}`);
  }
  if (def.category === 'shield') lines.push('+2 CA');
  if (def.properties?.length) lines.push(def.properties.join(', '));
  if (def.stealthDisadvantage) lines.push('Desvantagem em Furtividade');
  if (def.twoHanded) lines.push('Duas mãos');
  if (def.weight != null) lines.push(`${def.weight} lb`);
  if (def.description && !def.damage && def.baseAc == null) lines.push(def.description);

  return lines;
}

export function itemDescription(item: InventoryItem): string | undefined {
  const def = getItemDefinition(item.definitionId);
  if (item.definitionId === 'custom') return item.notes;
  if (def?.description) return def.description;
  if (!def) return undefined;
  const stats = buildItemStatLines(def);
  return stats.length > 0 ? stats.join(' · ') : undefined;
}

export function itemMetaShort(item: InventoryItem): string {
  const def = getItemDefinition(item.definitionId);
  if (!def) return '';
  const parts: string[] = [CATEGORY_LABELS[def.category]];
  if (def.damage) parts.push(def.damage);
  if (def.baseAc != null) parts.push(`CA ${def.baseAc}`);
  if (def.category === 'shield') parts.push('+2 CA');
  if (def.weight) parts.push(`${def.weight} lb`);
  return parts.join(' · ');
}

export function walletTotalCopper(currency: {
  copper: number;
  silver: number;
  gold: number;
}): number {
  return currency.copper + currency.silver * 10 + currency.gold * 100;
}

export function formatWallet(currency: {
  copper: number;
  silver: number;
  gold: number;
}): string {
  const parts: string[] = [];
  if (currency.gold) parts.push(`${currency.gold} ouro`);
  if (currency.silver) parts.push(`${currency.silver} prata`);
  if (currency.copper) parts.push(`${currency.copper} cobre`);
  return parts.join(' · ') || '0 cobre';
}

export { CATEGORY_LABELS, formatItemCost };
