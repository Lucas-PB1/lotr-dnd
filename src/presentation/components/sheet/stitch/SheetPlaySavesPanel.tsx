import { ABILITY_LABELS, type AbilityName } from '../../../../shared/constants/gameConstants';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { Character } from '../../../../domain/entities/Character';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { SheetPlayRollHint, SheetPlayRollRow } from './SheetPlayRollRow';

const SAVES: AbilityName[] = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];

export function SheetPlaySavesPanel() {
  const { character } = useCharacterSheet();
  const domain = new Character(character);

  return (
    <section className="st-sheet-block st-sheet-saves" aria-label={SHEET_PLAY_UI.saves}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.saves}</h4>
      <SheetPlayRollHint />
      <ul className="st-sheet-saves__list">
        {SAVES.map((ability) => {
          const proficient = character.savingThrows[ability].proficient;
          const save = CharacterCalculator.savingThrowModifier(domain, ability);
          return (
            <SheetPlayRollRow
              key={ability}
              name={ABILITY_LABELS[ability]}
              modifier={save.modifier}
              modifierLabel={save.formattedModifier()}
              proficient={proficient}
              className={proficient ? ' st-sheet-save--prof' : ''}
            />
          );
        })}
      </ul>
    </section>
  );
}
