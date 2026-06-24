import type { ItemDefinition } from '../../../domain/value-objects/Item';
import { previewWeaponForCreation } from '../../../domain/services/AttackRollService';
import {
  buildEquipmentItemPreview,
  type EquipmentCombatContext,
} from './equipmentItemDisplay';

function formatMod(value: number): string {
  return value >= 0 ? `+${value}` : `${value}`;
}

export function buildCompactEquipmentPreview(
  def: ItemDefinition,
  ctx: EquipmentCombatContext,
): { line: string; note?: string } | null {
  const preview = buildEquipmentItemPreview(def, ctx);

  if (preview.kind === 'weapon') {
    const weaponRoll = previewWeaponForCreation(def, {
      abilities: ctx.baseAbilities,
      abilityBonusSources: ctx.abilityBonusSources,
      proficiencyBonus: ctx.proficiencyBonus,
      creationChoices: ctx.choices,
    });

    const parts: string[] = [];
    if (preview.damageLine) parts.push(preview.damageLine);
    if (preview.propertiesLine) parts.push(preview.propertiesLine);
    if (preview.rangeLine) parts.push(preview.rangeLine);
    if (weaponRoll) {
      parts.push(`atq ${formatMod(weaponRoll.attackBonus)}`);
      parts.push(`dano ${weaponRoll.damageFormula}`);
    }

    const note = preview.notes.find((n) => n.includes('proficiência'));
    return parts.length > 0 ? { line: parts.join(' · '), note } : null;
  }

  if (preview.kind === 'armor' || preview.kind === 'shield') {
    return preview.armorLine ? { line: preview.armorLine } : null;
  }

  if (preview.kind === 'tool' && preview.propertiesLine) {
    const line = preview.propertiesLine.length > 72
      ? `${preview.propertiesLine.slice(0, 69)}…`
      : preview.propertiesLine;
    return { line };
  }

  return null;
}
