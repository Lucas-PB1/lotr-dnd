import { LOTR_SKILLS } from '../../../../shared/constants/gameConstants';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { Character } from '../../../../domain/entities/Character';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function SheetPlaySkillsPanel() {
  const { character } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const passiveWisdom = CharacterCalculator.passiveWisdom(domainCharacter);

  const activeSkills = LOTR_SKILLS.filter((skill) => {
    const state = character.skills[skill.id];
    return state.proficient || state.expertise;
  });

  return (
    <section className="st-sheet-block st-sheet-skills" aria-label={SHEET_PLAY_UI.skills}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.skills}</h4>
      {activeSkills.length === 0 ? (
        <p className="st-sheet-skills__empty">{SHEET_PLAY_UI.noSkills}</p>
      ) : (
        <ul className="st-sheet-skills__list">
          {activeSkills.map((skill) => {
            const mod = CharacterCalculator.skillModifier(domainCharacter, skill.id);
            const state = character.skills[skill.id];
            return (
              <li
                key={skill.id}
                className={`st-sheet-skill${state.expertise ? ' st-sheet-skill--expert' : ''}`}
              >
                <span className="st-sheet-skill__name">{skill.name}</span>
                <span className="st-sheet-skill__mod">{mod.formattedModifier()}</span>
              </li>
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
