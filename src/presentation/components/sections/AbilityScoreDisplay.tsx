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
  /** Compra de pontos: mostra valor base (8–15), não o total com bônus de origem. */
  displayMode?: 'effective' | 'base';
}

export function AbilityScoreDisplay({
  ability,
  children,
  displayMode = 'effective',
}: AbilityScoreDisplayProps) {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const effective = CharacterCalculator.abilityScores(domainCharacter).get(ability);
  const base = character.abilities[ability];
  const bonus = CharacterCalculator.getAbilityBonus(domainCharacter, ability);
  const score = displayMode === 'base' ? base : effective.value;

  return (
    <>
      <span className="ability-card__label">{ABILITY_LABELS[ability]}</span>
      <span className="ability-card__score">{score}</span>
      <span className="ability-card__modifier">{effective.formattedModifier()}</span>
      {displayMode === 'base' && bonus > 0 ? (
        <span className="ability-card__bonus">+{bonus} origem</span>
      ) : null}
      {children ? <div className="ability-card__extras">{children}</div> : null}
    </>
  );
}
