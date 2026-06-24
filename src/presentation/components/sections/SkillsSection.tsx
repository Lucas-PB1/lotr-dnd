import { Checkbox, Label } from 'flowbite-react';
import { ABILITY_LABELS, LOTR_SKILLS } from '../../../shared/constants/gameConstants';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { Character } from '../../../domain/entities/Character';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { formatRollFormula } from '../../../domain/services/AttackRollService';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, StatBox } from '../ui/FormFields';

function SkillRow({ skillId }: { skillId: string }) {
  const { character, updateCharacter } = useCharacterSheet();
  const skillDef = LOTR_SKILLS.find((s) => s.id === skillId)!;
  const domainCharacter = new Character(character);
  const skillMod = CharacterCalculator.skillModifier(domainCharacter, skillId);
  const state = character.skills[skillId];
  const isActive = state.proficient || state.expertise;

  return (
    <div
      className={`skill-row ${isActive ? 'skill-row--active' : ''}`}
      title={`Atributo: ${ABILITY_LABELS[skillDef.ability]}`}
    >
      <Checkbox
        color="warning"
        checked={state.proficient}
        title="Proficiente"
        onChange={(e) =>
          updateCharacter({
            skills: {
              ...character.skills,
              [skillId]: { ...state, proficient: e.target.checked },
            },
          })
        }
      />
      <Checkbox
        color="info"
        checked={state.expertise}
        title="Perícia"
        onChange={(e) =>
          updateCharacter({
            skills: {
              ...character.skills,
              [skillId]: { ...state, expertise: e.target.checked },
            },
          })
        }
      />
      <span className="skill-row__mod" title={formatRollFormula(skillMod.modifier)}>
        <span className="skill-row__roll">{formatRollFormula(skillMod.modifier)}</span>
      </span>
      <Label className="skill-row__name">
        {skillDef.name}
        <span className="skill-row__ability">{ABILITY_LABELS[skillDef.ability].slice(0, 3)}</span>
      </Label>
    </div>
  );
}

export function SkillsSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const passiveWisdom = CharacterCalculator.passiveWisdom(domainCharacter);

  return (
    <div className="skills-panel">
      <div className="skills-legend">
        <span>
          <Checkbox readOnly color="warning" className="pointer-events-none" /> Prof.
        </span>
        <span>
          <Checkbox readOnly color="info" className="pointer-events-none" /> Perícia
        </span>
      </div>
      <div className="skills-list">
        {LOTR_SKILLS.map((skill) => (
          <SkillRow key={skill.id} skillId={skill.id} />
        ))}
      </div>
      <div className="passive-wisdom">
        <StatBox
          label="Sab. Passiva"
          value={passiveWisdom}
          description={FIELD_DESCRIPTIONS.passiveWisdom}
          accent="slate"
          compact
        />
        <NumberField
          label="Override"
          value={character.passiveWisdom ?? passiveWisdom}
          onChange={(passiveWisdom) => updateCharacter({ passiveWisdom })}
          description="Substitui o valor calculado."
          compact
        />
      </div>
    </div>
  );
}
