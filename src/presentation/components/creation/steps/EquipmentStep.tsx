import { Label } from 'flowbite-react';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import { SCHOLAR_TOOL_OPTIONS, type CallingEquipmentDefinition } from '../../../../shared/data/startingEquipmentData';
import { CreationSelect } from '../CreationSelect';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';
import { StartingItemPickers } from '../StartingItemPickers';

interface EquipmentStepProps {
  choices: CreationChoices;
  callingEquipment: CallingEquipmentDefinition | null;
  onSetChoice: (partial: Partial<CreationChoices>) => void;
  onUpdateEquipmentOption: (groupId: string, optionId: string) => void;
  onUpdateStartingItemChoice: (slotId: string, itemId: string) => void;
}

export function EquipmentStep({
  choices,
  callingEquipment,
  onSetChoice,
  onUpdateEquipmentOption,
  onUpdateStartingItemChoice,
}: EquipmentStepProps) {
  if (!callingEquipment) {
    return (
      <p className="text-sm text-amber-900/60">Selecione um chamado para configurar o equipamento.</p>
    );
  }

  return (
    <div className="creation-equipment border-t border-amber-300/40 pt-3 space-y-4">
      <div>
        <Label className="text-xs font-semibold uppercase text-amber-900/70">
          Equipamento inicial do chamado
        </Label>
        {choices.callingId === 'scholar' && (
          <ToggleButtonGroup
            label="Erudito: 2 ferramentas"
            options={SCHOLAR_TOOL_OPTIONS.map((t) => ({ id: t, label: t }))}
            selected={choices.scholarToolChoices ?? []}
            max={2}
            onChange={(scholarToolChoices) => onSetChoice({ scholarToolChoices })}
          />
        )}
        <div className="creation-equipment__options mt-2">
          {callingEquipment.optionGroups.map((group) => (
            <div key={group.id} className="creation-equipment__field">
              <Label className="creation-equipment__label" htmlFor={`equip-${group.id}`}>
                {group.labelPt}
              </Label>
              <CreationSelect
                id={`equip-${group.id}`}
                value={choices.equipmentOptions?.[group.id] ?? group.options[0]?.id ?? ''}
                onChange={(e) => onUpdateEquipmentOption(group.id, e.target.value)}
              >
                {group.options.map((opt) => (
                  <option key={opt.id} value={opt.id}>
                    {opt.labelPt}
                  </option>
                ))}
              </CreationSelect>
            </div>
          ))}
        </div>
      </div>

      <StartingItemPickers
        choices={choices}
        onUpdateItemChoice={onUpdateStartingItemChoice}
      />
    </div>
  );
}
