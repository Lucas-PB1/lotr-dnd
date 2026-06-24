import {
  ABILITY_NAMES,
  type AbilityName,
} from '../../shared/constants/gameConstants';
import type { AbilityScoresProps } from '../value-objects/CharacterValues';
import { AbilityScore } from '../value-objects/CharacterValues';

/** Array padrão D&D 5e / O Senhor dos Anéis — soma 72 */
export const STANDARD_ABILITY_ARRAY = [15, 14, 13, 12, 10, 8] as const;

export const STANDARD_ABILITY_ARRAY_TOTAL = STANDARD_ABILITY_ARRAY.reduce((a, b) => a + b, 0);

export type AbilityRollDetail = {
  value: number;
  dice: [number, number, number, number];
  dropped: number;
};

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function roll4d6DropLowest(): AbilityRollDetail {
  const dice: [number, number, number, number] = [
    rollDie(6),
    rollDie(6),
    rollDie(6),
    rollDie(6),
  ];
  const sorted = [...dice].sort((a, b) => a - b);
  const dropped = sorted[0];
  const value = sorted[1] + sorted[2] + sorted[3];
  return { value, dice, dropped };
}

export function rollSixAbilities(): AbilityRollDetail[] {
  return ABILITY_NAMES.map(() => roll4d6DropLowest());
}

export function abilityModifier(score: number): number {
  return new AbilityScore(score).modifier;
}

export function formatModifier(mod: number): string {
  return mod >= 0 ? `+${mod}` : `${mod}`;
}

export function sumAbilities(abilities: AbilityScoresProps): number {
  return ABILITY_NAMES.reduce((sum, name) => sum + abilities[name], 0);
}

export function createEmptyAssignment(): Record<AbilityName, number | null> {
  return Object.fromEntries(ABILITY_NAMES.map((name) => [name, null])) as Record<
    AbilityName,
    number | null
  >;
}

export function assignmentToAbilities(
  assigned: Record<AbilityName, number | null>,
): AbilityScoresProps | null {
  const values = ABILITY_NAMES.map((name) => assigned[name]);
  if (values.some((v) => v == null)) return null;
  return {
    strength: assigned.strength!,
    dexterity: assigned.dexterity!,
    constitution: assigned.constitution!,
    intelligence: assigned.intelligence!,
    wisdom: assigned.wisdom!,
    charisma: assigned.charisma!,
  };
}

export function isAssignmentComplete(assigned: Record<AbilityName, number | null>): boolean {
  return ABILITY_NAMES.every((name) => assigned[name] != null);
}

/** Opções do select — o pool já contém só valores não atribuídos (suporta duplicatas nas rolagens). */
export function abilityAssignmentOptions(
  ability: AbilityName,
  assigned: Record<AbilityName, number | null>,
  pool: number[],
): number[] {
  const current = assigned[ability];
  const fromPool = [...new Set(pool)].sort((a, b) => b - a);
  if (current != null && !fromPool.includes(current)) {
    return [current, ...fromPool].sort((a, b) => b - a);
  }
  return fromPool;
}
