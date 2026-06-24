import { Badge } from 'flowbite-react';
import {
  ABILITY_LABELS,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { Character } from '../../../domain/entities/Character';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

interface AbilityScoreDisplayProps {
  ability: AbilityName;
  baseScore: number;
  children?: React.ReactNode;
}

export function AbilityScoreDisplay({ ability, baseScore, children }: AbilityScoreDisplayProps) {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const bonus = CharacterCalculator.getAbilityBonus(domainCharacter, ability);
  const effective = CharacterCalculator.abilityScores(domainCharacter).get(ability);
  const hasBonus = bonus !== 0;

  return (
    <div className="ability-card">
      <span className="ability-card__label">{ABILITY_LABELS[ability]}</span>

      {children ?? (
        <span className="ability-card__solo-base">{baseScore}</span>
      )}

      {hasBonus && (
        <div className="ability-card__breakdown">
          <span className="ability-card__base">{baseScore}</span>
          <span className="ability-card__plus">+</span>
          <Badge color="info" size="xs">
            {bonus > 0 ? `+${bonus}` : bonus}
          </Badge>
          <span className="ability-card__equals">=</span>
          <span className="ability-card__total">{effective.value}</span>
        </div>
      )}

      <span className="ability-card__modifier">{effective.formattedModifier()}</span>
    </div>
  );
}
