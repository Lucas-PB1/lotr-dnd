import { LOTR_SKILLS } from '../../../../shared/constants/gameConstants';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { Character } from '../../../../domain/entities/Character';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { SheetPlayRollHint, SheetPlayRollRow } from './SheetPlayRollRow';

export function SheetPlaySkillsPanel() {
  const { character } = useCharacterSheet();
  const domain = new Character(character);
  const passiveWisdom = CharacterCalculator.passiveWisdom(domain);

  const activeSkills = LOTR_SKILLS.filter((skill) => {
    const state = character.skills[skill.id];
    return state.proficient || state.expertise;
  });

  return (
    <section className="st-sheet-block st-sheet-skills" aria-label={SHEET_PLAY_UI.skills}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.skills}</h4>
      <SheetPlayRollHint />
      {activeSkills.length === 0 ? (
        <p className="st-sheet-skills__empty">{SHEET_PLAY_UI.noSkills}</p>
      ) : (
        <ul className="st-sheet-skills__list">
          {activeSkills.map((skill) => {
            const mod = CharacterCalculator.skillModifier(domain, skill.id);
            const state = character.skills[skill.id];
            return (
              <SheetPlayRollRow
                key={skill.id}
                name={skill.name}
                modifier={mod.modifier}
                modifierLabel={mod.formattedModifier()}
                proficient={state.proficient}
                expert={state.expertise}
                className={state.expertise ? ' st-sheet-skill--expert' : ''}
              />
            );
          })}
        </ul>
      )}
      <div className="st-sheet-skills__passive">
        <span>{SHEET_PLAY_UI.passiveWisdom}</span>
        <strong>{passiveWisdom}</strong>
      </div>
    </section>
  );
}
