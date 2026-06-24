import type { CharacterProps } from '../entities/Character';
import { Character } from '../entities/Character';
import { getCalling, getCulture } from '../../shared/data/characterCreationData';
import { getVirtueById } from '../../shared/data/virtuesAndCraftsData';
import { CharacterCalculator } from './CharacterCalculator';

/** Cálculos derivados de combate (5E / LOTR Roleplaying). */
export class CombatStatsService {
  static proficiencyBonus(level: number): number {
    const safeLevel = Math.max(1, Math.min(10, level));
    return Math.floor((safeLevel - 1) / 4) + 2;
  }

  static hitPointsMaximum(props: CharacterProps): number {
    const level = props.creationChoices?.level ?? 1;
    const callingId = props.creationChoices?.callingId;
    if (!callingId) return props.hitPoints.maximum;

    const calling = getCalling(callingId);
    if (!calling) return props.hitPoints.maximum;

    const conMod = CharacterCalculator.abilityScores(new Character(props)).get('constitution').modifier;
    const hitDie = calling.hitDie;
    const perLevel = Math.floor(hitDie / 2) + 1 + conMod;

    let hp = hitDie + conMod;
    for (let lvl = 2; lvl <= level; lvl++) {
      hp += perLevel;
    }
    return Math.max(1, hp);
  }

  static hitDiceLabel(props: CharacterProps): string {
    const level = props.creationChoices?.level ?? 1;
    const callingId = props.creationChoices?.callingId;
    if (!callingId) return props.hitDice;

    const calling = getCalling(callingId);
    if (!calling) return props.hitDice;

    return `${level}d${calling.hitDie}`;
  }

  static speed(props: CharacterProps): number {
    const cultureId = props.creationChoices?.cultureId;
    if (!cultureId) return props.speed;

    const culture = getCulture(cultureId);
    return culture?.speed ?? props.speed;
  }

  /** Sem armadura: 10 + mod. Destreza + bônus de virtudes */
  static armorClass(props: CharacterProps): number {
    const dexMod = CharacterCalculator.abilityScores(new Character(props)).get('dexterity').modifier;
    let ac = 10 + dexMod;

    const picks = props.creationChoices?.rewardPicks ?? [];
    for (const pick of picks) {
      if (pick.rewardType === 'virtue' && pick.virtueId) {
        const virtue = getVirtueById(pick.virtueId);
        if (virtue?.acBonus) ac += virtue.acBonus;
      }
    }

    return ac;
  }

  static initiative(props: CharacterProps): number {
    return CharacterCalculator.abilityScores(new Character(props)).get('dexterity').modifier;
  }

  static applyDerivedStats(props: CharacterProps): CharacterProps {
    const level = props.creationChoices?.level ?? 1;
    const maxHp = this.hitPointsMaximum(props);
    const hp = props.hitPoints;

    let current = hp.current;
    if (current === 0) current = maxHp;
    if (current > maxHp) current = maxHp;

    return {
      ...props,
      proficiencyBonus: this.proficiencyBonus(level),
      armorClass: this.armorClass(props),
      initiative: this.initiative(props),
      speed: this.speed(props),
      hitDice: this.hitDiceLabel(props),
      hitPoints: {
        maximum: maxHp,
        current,
        temporary: hp.temporary,
      },
      passiveWisdom: null,
    };
  }
}
