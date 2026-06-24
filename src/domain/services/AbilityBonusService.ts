import type { AbilityName } from '../../shared/constants/gameConstants';
import { ABILITY_NAMES } from '../../shared/constants/gameConstants';
import type { AbilityScoresProps } from '../value-objects/CharacterValues';

export interface AbilityBonusSource {
  id: string;
  label: string;
  bonuses: Partial<Record<AbilityName, number>>;
}

export const BONUS_SOURCE_PRESETS = [
  'Cultura / Raça',
  'Chamado / Classe',
  'Característica',
  'Virtude',
  'Item Mágico',
  'Outro',
] as const;

export function createEmptyBonusSource(label = 'Cultura / Raça'): AbilityBonusSource {
  return {
    id: crypto.randomUUID(),
    label,
    bonuses: {},
  };
}

export function createZeroBonuses(): Record<AbilityName, number> {
  return {
    strength: 0,
    dexterity: 0,
    constitution: 0,
    intelligence: 0,
    wisdom: 0,
    charisma: 0,
  };
}

export class AbilityBonusService {
  static getBonusForAbility(
    sources: AbilityBonusSource[],
    ability: AbilityName,
  ): number {
    return sources.reduce((sum, source) => sum + (source.bonuses[ability] ?? 0), 0);
  }

  static getAllBonuses(sources: AbilityBonusSource[]): Record<AbilityName, number> {
    const totals = createZeroBonuses();
    for (const ability of ABILITY_NAMES) {
      totals[ability] = this.getBonusForAbility(sources, ability);
    }
    return totals;
  }

  static getEffectiveAbilities(
    base: AbilityScoresProps,
    sources: AbilityBonusSource[],
  ): AbilityScoresProps {
    const result = { ...base };
    for (const ability of ABILITY_NAMES) {
      result[ability] = base[ability] + this.getBonusForAbility(sources, ability);
    }
    return result;
  }
}
