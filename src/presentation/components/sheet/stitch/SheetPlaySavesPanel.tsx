import { ABILITY_LABELS, type AbilityName } from '../../../../shared/constants/gameConstants';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { Character } from '../../../../domain/entities/Character';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

const SAVES: AbilityName[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

export function SheetPlaySavesPanel() {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);

  return (
    <section className="st-sheet-block st-sheet-saves" aria-label={SHEET_PLAY_UI.saves}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.saves}</h4>
      <ul className="st-sheet-saves__list">
        {SAVES.map((ability) => {
          const proficient = character.savingThrows[ability].proficient;
          const save = CharacterCalculator.savingThrowModifier(domainCharacter, ability);
          return (
            <li key={ability} className={`st-sheet-save${proficient ? ' st-sheet-save--prof' : ''}`}>
              <span className="st-sheet-save__name">{ABILITY_LABELS[ability]}</span>
              <span className="st-sheet-save__mod">{save.formattedModifier()}</span>
              {proficient ? <span className="st-sheet-save__dot" aria-label="Proficiente" /> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
