import { useMemo } from 'react';
import { CombatStatsService } from '../../../../domain/services/CombatStatsService';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import type { AbilityBonusSource } from '../../../../domain/services/AbilityBonusService';
import type { AbilityScoresProps } from '../../../../domain/value-objects/CharacterValues';
import {
  SCHOLAR_TOOL_OPTIONS,
  type CallingEquipmentDefinition,
} from '../../../../shared/data/startingEquipmentData';
import { EquipmentKitSummary } from '../EquipmentKitSummary';
import { EquipmentOptionPicker } from '../EquipmentOptionPicker';
import { StartingItemPickers } from '../StartingItemPickers';
import { ToggleButtonGroup } from '../../ui/ToggleButtonGroup';

interface EquipmentStepProps {
  choices: CreationChoices;
  callingEquipment: CallingEquipmentDefinition | null;
  baseAbilities: AbilityScoresProps;
  abilityBonusSources: AbilityBonusSource[];
  onSetChoice: (partial: Partial<CreationChoices>) => void;
  onUpdateEquipmentOption: (groupId: string, optionId: string) => void;
  onUpdateStartingItemChoice: (slotId: string, itemId: string) => void;
}

export function EquipmentStep({
  choices,
  callingEquipment,
  baseAbilities,
  abilityBonusSources,
  onSetChoice,
  onUpdateEquipmentOption,
  onUpdateStartingItemChoice,
}: EquipmentStepProps) {
  const combatContext = useMemo(
    () => ({
      baseAbilities,
      abilityBonusSources,
      proficiencyBonus: CombatStatsService.proficiencyBonus(choices.level),
      choices,
    }),
    [baseAbilities, abilityBonusSources, choices],
  );

  if (!callingEquipment) {
    return (
      <p className="st-creation-empty">Selecione um chamado para configurar o equipamento.</p>
    );
  }

  const hasCallingOptions =
    callingEquipment.optionGroups.length > 0 || choices.callingId === 'scholar';

  return (
    <div className="st-creation-equipment-layout">
      <EquipmentKitSummary choices={choices} callingEquipment={callingEquipment} />

      {hasCallingOptions && (
        <section className="st-creation-equip-block">
          <h4 className="st-creation-equip-block__title">Opções do chamado</h4>
          <div className="st-creation-equip-option-pickers">
            {choices.callingId === 'scholar' && (
              <ToggleButtonGroup
                variant="stitch"
                label="Erudito: 2 ferramentas"
                options={SCHOLAR_TOOL_OPTIONS.map((tool) => ({ id: tool, label: tool }))}
                selected={choices.scholarToolChoices ?? []}
                max={2}
                onChange={(scholarToolChoices) => onSetChoice({ scholarToolChoices })}
              />
            )}
            {callingEquipment.optionGroups.map((group) => (
              <EquipmentOptionPicker
                key={group.id}
                group={group}
                value={choices.equipmentOptions?.[group.id] ?? group.options[0]?.id ?? ''}
                combatContext={combatContext}
                onChange={(optionId) => onUpdateEquipmentOption(group.id, optionId)}
              />
            ))}
          </div>
        </section>
      )}

      <StartingItemPickers
        choices={choices}
        combatContext={combatContext}
        onUpdateItemChoice={onUpdateStartingItemChoice}
      />
    </div>
  );
}
