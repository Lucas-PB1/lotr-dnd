import type { AbilityName } from '../../shared/constants/gameConstants';
import { ABILITY_NAMES } from '../../shared/constants/gameConstants';
import {
  POINT_BUY_COSTS,
  POINT_BUY_MAX_SCORE,
  POINT_BUY_MIN_SCORE,
  POINT_BUY_TOTAL,
} from '../../shared/constants/pointBuyConstants';
import type { AbilityScoresProps } from '../value-objects/CharacterValues';

export class PointBuyService {
  static getCost(score: number): number {
    return POINT_BUY_COSTS[score] ?? 0;
  }

  static getTotalSpent(abilities: AbilityScoresProps): number {
    return ABILITY_NAMES.reduce((sum, name) => sum + this.getCost(abilities[name]), 0);
  }

  static getRemainingPoints(abilities: AbilityScoresProps): number {
    return POINT_BUY_TOTAL - this.getTotalSpent(abilities);
  }

  static canIncrease(abilities: AbilityScoresProps, ability: AbilityName): boolean {
    const current = abilities[ability];
    if (current >= POINT_BUY_MAX_SCORE) return false;
    const costDelta = this.getCost(current + 1) - this.getCost(current);
    return this.getRemainingPoints(abilities) >= costDelta;
  }

  static canDecrease(abilities: AbilityScoresProps, ability: AbilityName): boolean {
    return abilities[ability] > POINT_BUY_MIN_SCORE;
  }

  static increase(
    abilities: AbilityScoresProps,
    ability: AbilityName,
  ): AbilityScoresProps | null {
    if (!this.canIncrease(abilities, ability)) return null;
    return { ...abilities, [ability]: abilities[ability] + 1 };
  }

  static decrease(
    abilities: AbilityScoresProps,
    ability: AbilityName,
  ): AbilityScoresProps | null {
    if (!this.canDecrease(abilities, ability)) return null;
    return { ...abilities, [ability]: abilities[ability] - 1 };
  }

  static clampToPointBuyRange(abilities: AbilityScoresProps): AbilityScoresProps {
    const result = { ...abilities };
    for (const name of ABILITY_NAMES) {
      result[name] = Math.min(
        POINT_BUY_MAX_SCORE,
        Math.max(POINT_BUY_MIN_SCORE, abilities[name]),
      );
    }
    return result;
  }

  static createDefaultAbilities(): AbilityScoresProps {
    return {
      strength: POINT_BUY_MIN_SCORE,
      dexterity: POINT_BUY_MIN_SCORE,
      constitution: POINT_BUY_MIN_SCORE,
      intelligence: POINT_BUY_MIN_SCORE,
      wisdom: POINT_BUY_MIN_SCORE,
      charisma: POINT_BUY_MIN_SCORE,
    };
  }
}
