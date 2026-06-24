import type { ItemDefinition } from '../../../domain/value-objects/Item';
import type { AbilityBonusSource } from '../../../domain/services/AbilityBonusService';
import {
  previewWeaponForCreation,
  type WeaponCreationPreview,
} from '../../../domain/services/AttackRollService';
import type { CreationChoices } from '../../../domain/services/CharacterCreationService';
import { ABILITY_LABELS } from '../../../shared/constants/gameConstants';
import type { AbilityScoresProps } from '../../../domain/value-objects/CharacterValues';

export type EquipmentCombatContext = {
  baseAbilities: AbilityScoresProps;
  abilityBonusSources: AbilityBonusSource[];
  proficiencyBonus: number;
  choices: CreationChoices;
};

export type EquipmentItemPreviewData = {
  kind: 'weapon' | 'armor' | 'shield' | 'tool' | 'other';
  damageLine?: string;
  propertiesLine?: string;
  rangeLine?: string;
  armorLine?: string;
  attackLine?: string;
  damageRollLine?: string;
  abilityLine?: string;
  notes: string[];
};

function formatMod(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}

function buildWeaponAbilityLine(preview: WeaponCreationPreview): string {
  const primary = `${ABILITY_LABELS[preview.ability]} ${formatMod(preview.abilityMod)}`;
  if (
    preview.abilityAlt
    && preview.abilityAltMod != null
    && preview.abilityAltMod !== preview.abilityMod
  ) {
    return `${primary} ou ${ABILITY_LABELS[preview.abilityAlt]} ${formatMod(preview.abilityAltMod)}`;
  }
  return primary;
}

function buildWeaponAttackLine(preview: WeaponCreationPreview): string {
  const prof = preview.proficient ? `, Prof ${formatMod(preview.proficiencyBonus)}` : '';
  return `d20 ${formatMod(preview.attackBonus)} (${buildWeaponAbilityLine(preview)}${prof})`;
}

export function buildEquipmentItemPreview(
  def: ItemDefinition,
  ctx: EquipmentCombatContext,
): EquipmentItemPreviewData {
  if (def.category === 'weapon') {
    const preview = previewWeaponForCreation(def, {
      abilities: ctx.baseAbilities,
      abilityBonusSources: ctx.abilityBonusSources,
      proficiencyBonus: ctx.proficiencyBonus,
      creationChoices: ctx.choices,
    });

    const damageLine = [def.damage, def.damageType].filter(Boolean).join(' ');
    const propertiesLine = def.properties?.join(' · ') || undefined;

    return {
      kind: 'weapon',
      damageLine: damageLine || undefined,
      propertiesLine,
      rangeLine: def.range,
      attackLine: preview ? buildWeaponAttackLine(preview) : undefined,
      damageRollLine: preview?.damageFormula,
      abilityLine: preview ? buildWeaponAbilityLine(preview) : undefined,
      notes: preview?.notes ?? [],
    };
  }

  if (def.category === 'armor' && def.baseAc != null) {
    const dexPart = def.maxDexBonus != null
      ? ` + Des (máx. ${formatMod(def.maxDexBonus)})`
      : ' + Des';
    const notes: string[] = [];
    if (def.stealthDisadvantage) notes.push('Desvantagem em Furtividade');

    return {
      kind: 'armor',
      armorLine: `CA ${def.baseAc}${dexPart}`,
      notes,
    };
  }

  if (def.category === 'shield') {
    return {
      kind: 'shield',
      armorLine: '+2 CA',
      notes: [],
    };
  }

  if (def.category === 'tool') {
    return {
      kind: 'tool',
      propertiesLine: def.description,
      notes: [],
    };
  }

  return {
    kind: 'other',
    propertiesLine: def.description,
    notes: [],
  };
}

export function buildWeaponPreviewLines(
  def: ItemDefinition,
  ctx: EquipmentCombatContext,
): string[] {
  const preview = buildEquipmentItemPreview(def, ctx);
  const lines: string[] = [];

  if (preview.damageLine) lines.push(`Dano ${preview.damageLine}`);
  if (preview.propertiesLine) lines.push(preview.propertiesLine);
  if (preview.rangeLine) lines.push(`Alcance ${preview.rangeLine}`);
  if (preview.attackLine) lines.push(`Ataque ${preview.attackLine}`);
  if (preview.damageRollLine) lines.push(`Rolagem ${preview.damageRollLine}`);

  return lines;
}
