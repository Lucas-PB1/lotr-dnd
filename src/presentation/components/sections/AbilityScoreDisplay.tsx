import {
  ABILITY_LABELS,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { Character } from '../../../domain/entities/Character';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

interface AbilityScoreDisplayProps {
  ability: AbilityName;
  children?: React.ReactNode;
}

export function AbilityScoreDisplay({ ability, children }: AbilityScoreDisplayProps) {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const effective = CharacterCalculator.abilityScores(domainCharacter).get(ability);

  return (
    <>
      <span className="ability-card__label">{ABILITY_LABELS[ability]}</span>
      <span className="ability-card__score">{effective.value}</span>
      <span className="ability-card__modifier">{effective.formattedModifier()}</span>
      {children ? <div className="ability-card__extras">{children}</div> : null}
    </>
  );
}
