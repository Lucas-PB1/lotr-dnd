export type SheetTabId = 'creation' | 'adventure' | 'inventory' | 'shop' | 'summary' | 'story';

export const SHEET_TAB_ORDER: SheetTabId[] = [
  'creation',
  'adventure',
  'inventory',
  'shop',
  'summary',
  'story',
];

export const SHEET_TAB_ICONS: Record<SheetTabId, string> = {
  creation: 'auto_fix_high',
  adventure: 'explore',
  inventory: 'backpack',
  shop: 'storefront',
  summary: 'description',
  story: 'history_edu',
};
