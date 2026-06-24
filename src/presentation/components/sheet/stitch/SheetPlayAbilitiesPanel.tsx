import { ABILITY_LABELS, type AbilityName } from '../../../../shared/constants/gameConstants';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { Character } from '../../../../domain/entities/Character';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

const ABILITIES: AbilityName[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

export function SheetPlayAbilitiesPanel() {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);

  return (
    <section className="st-sheet-block st-sheet-abilities" aria-label={SHEET_PLAY_UI.abilities}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.abilities}</h4>
      <div className="st-sheet-abilities__grid">
        {ABILITIES.map((ability) => {
          const effective = CharacterCalculator.abilityScores(domainCharacter).get(ability);
          return (
            <div key={ability} className="st-sheet-ability">
              <span className="st-sheet-ability__label">{ABILITY_LABELS[ability]}</span>
              <span className="st-sheet-ability__score">{effective.value}</span>
              <span className="st-sheet-ability__mod">{effective.formattedModifier()}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
