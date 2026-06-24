import type { AbilityName } from '../../shared/constants/gameConstants';
import { LOTR_SKILLS } from '../../shared/constants/gameConstants';
import type { Character } from '../entities/Character';
import { AbilityBonusService } from '../services/AbilityBonusService';
import {
  AbilityScores,
  SavingThrowProficiency,
  SkillProficiency,
} from '../value-objects/CharacterValues';
import type { AbilityScoresProps } from '../value-objects/CharacterValues';

export class CharacterCalculator {
  static getEffectiveAbilities(character: Character): AbilityScoresProps {
    return AbilityBonusService.getEffectiveAbilities(
      character.props.abilities,
      character.props.abilityBonusSources ?? [],
    );
  }

  static abilityScores(character: Character): AbilityScores {
    return new AbilityScores(this.getEffectiveAbilities(character));
  }

  static getBaseAbilityScores(character: Character): AbilityScores {
    return new AbilityScores(character.props.abilities);
  }

  static getAbilityBonus(character: Character, ability: AbilityName): number {
    return AbilityBonusService.getBonusForAbility(
      character.props.abilityBonusSources ?? [],
      ability,
    );
  }

  static savingThrowModifier(
    character: Character,
    ability: AbilityName,
  ): SavingThrowProficiency {
    const scores = this.abilityScores(character);
    const state = character.props.savingThrows[ability];
    return new SavingThrowProficiency(
      state.proficient,
      scores.get(ability).modifier,
      character.props.proficiencyBonus,
    );
  }

  static skillModifier(character: Character, skillId: string): SkillProficiency {
    const skillDef = LOTR_SKILLS.find((s) => s.id === skillId);
    if (!skillDef) {
      return new SkillProficiency(false, false, 0, character.props.proficiencyBonus);
    }

    const scores = this.abilityScores(character);
    const state = character.props.skills[skillId] ?? { proficient: false, expertise: false };

    return new SkillProficiency(
      state.proficient,
      state.expertise,
      scores.get(skillDef.ability).modifier,
      character.props.proficiencyBonus,
    );
  }

  static passiveWisdom(character: Character): number {
    if (character.props.passiveWisdom !== null) {
      return character.props.passiveWisdom;
    }

    const perception = this.skillModifier(character, 'perception');
    return 10 + perception.modifier;
  }
}
