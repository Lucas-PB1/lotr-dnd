import { Label, Select } from 'flowbite-react';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import { SCHOLAR_TOOL_OPTIONS, type CallingEquipmentDefinition } from '../../../../shared/data/startingEquipmentData';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';

interface EquipmentStepProps {
  choices: CreationChoices;
  callingEquipment: CallingEquipmentDefinition | null;
  onSetChoice: (partial: Partial<CreationChoices>) => void;
  onUpdateEquipmentOption: (groupId: string, optionId: string) => void;
}

export function EquipmentStep({
  choices,
  callingEquipment,
  onSetChoice,
  onUpdateEquipmentOption,
}: EquipmentStepProps) {
  if (!callingEquipment) {
    return (
      <p className="text-sm text-amber-900/60">Selecione um chamado para configurar o equipamento.</p>
    );
  }

  return (
    <div className="creation-equipment border-t border-amber-300/40 pt-3">
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
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {callingEquipment.optionGroups.map((group) => (
          <div key={group.id}>
            <Label className="mb-1 text-xs text-amber-900/70">{group.labelPt}</Label>
            <Select
              value={choices.equipmentOptions?.[group.id] ?? group.options[0]?.id ?? ''}
              onChange={(e) => onUpdateEquipmentOption(group.id, e.target.value)}
            >
              {group.options.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.labelPt}
                </option>
              ))}
            </Select>
          </div>
        ))}
      </div>
      <p className="mt-2 text-xs text-amber-900/60">
        Kit cultural + moedas são adicionados automaticamente na ficha (padrão de vida da cultura).
      </p>
    </div>
  );
}
