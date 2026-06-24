import type { CallingDefinition } from '../../../../shared/data/characterCreationData';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';
import { skillOptions } from '../skillOptions';

interface CallingSkillsStepProps {
  choices: CreationChoices;
  calling: CallingDefinition | undefined;
  onSetChoice: (partial: Partial<CreationChoices>) => void;
}

export function CallingSkillsStep({ choices, calling, onSetChoice }: CallingSkillsStepProps) {
  if (!calling) {
    return <p className="st-creation-empty">Selecione um chamado no passo anterior.</p>;
  }

  return (
    <ToggleButtonGroup
      variant="stitch"
      label={`${calling.namePt}: perícias do chamado`}
      options={skillOptions(calling.skillChoices)}
      selected={choices.callingSkillChoices}
      max={calling.skillChoiceCount}
      onChange={(callingSkillChoices) => onSetChoice({ callingSkillChoices })}
    />
  );
}
