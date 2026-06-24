export type MagicalTier =
  | 'reward'
  | 'marvellous'
  | 'wondrous'
  | 'famous_weapon'
  | 'famous_armour';

export type MagicalEffectKind =
  | 'ac_bonus'
  | 'attack_bonus'
  | 'damage_bonus'
  | 'save_bonus'
  | 'blessing_die'
  | 'magical_success'
  | 'narrative';

export interface MagicalEffect {
  kind: MagicalEffectKind;
  value?: number;
  skill?: string;
  textPt: string;
}

export interface MagicalQuality {
  id: string;
  order: number;
  namePt: string;
  effects: MagicalEffect[];
}

export interface MagicalItemDefinition {
  id: string;
  namePt: string;
  nameEn?: string;
  tier: MagicalTier;
  category: 'weapon' | 'armor' | 'shield' | 'wondrous';
  identifyDc?: number;
  baseItemId?: string;
  effects: MagicalEffect[];
  qualities?: MagicalQuality[];
  descriptionPt?: string;
  sourcePage?: number;
}

export interface OwnedMagicalItem {
  instanceId: string;
  definitionId: string;
  equipped: boolean;
  identified: boolean;
  linkedInventoryId?: string;
  activeQualityIds?: string[];
  notes?: string;
}

export function createOwnedMagicalItem(definitionId: string): OwnedMagicalItem {
  return {
    instanceId: crypto.randomUUID(),
    definitionId,
    equipped: false,
    identified: true,
  };
}

export function createCustomMagicalItem(namePt: string): OwnedMagicalItem {
  return {
    instanceId: crypto.randomUUID(),
    definitionId: 'custom-magical',
    equipped: false,
    identified: true,
    notes: namePt.trim(),
  };
}
