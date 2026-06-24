import { Checkbox, Label } from 'flowbite-react';
import { LOTR_SKILLS } from '../../../shared/constants/gameConstants';
import { Character } from '../../../domain/entities/Character';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, StatBox } from '../ui/FormFields';

function SkillRow({ skillId }: { skillId: string }) {
  const { character, updateCharacter } = useCharacterSheet();
  const skillDef = LOTR_SKILLS.find((s) => s.id === skillId)!;
  const domainCharacter = new Character(character);
  const skillMod = CharacterCalculator.skillModifier(domainCharacter, skillId);
  const state = character.skills[skillId];

  return (
    <div className="skill-row flex items-center gap-2 py-0.5">
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
      <span className="min-w-8 text-center text-sm font-semibold text-amber-800">
        {skillMod.formattedModifier()}
      </span>
      <Label className="flex-1 text-sm text-amber-950">
        {skillDef.name}{' '}
        <span className="text-xs text-amber-900/60">({skillDef.ability.slice(0, 3)})</span>
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
        <span><Checkbox readOnly color="warning" className="pointer-events-none" /> Prof.</span>
        <span><Checkbox readOnly color="info" className="pointer-events-none" /> Perícia</span>
      </div>
      <div className="skills-list">
        {LOTR_SKILLS.map((skill) => (
          <SkillRow key={skill.id} skillId={skill.id} />
        ))}
      </div>
      <div className="passive-wisdom">
        <StatBox label="Sabedoria Passiva (Percepção)" value={passiveWisdom} />
        <NumberField
          label="Override manual"
          value={character.passiveWisdom ?? passiveWisdom}
          onChange={(passiveWisdom) => updateCharacter({ passiveWisdom })}
        />
      </div>
    </div>
  );
}
