import { useMemo } from 'react';
import type { CreationChoices } from '../../../domain/services/CharacterCreationService';
import {
  getStartingItemSlots,
  normalizeStartingItemChoices,
  type StartingItemSlotGroup,
} from '../../../shared/data/startingItemSlots';
import type { EquipmentCombatContext } from './equipmentItemDisplay';
import { EquipmentStartingSlotPicker } from './EquipmentStartingSlotPicker';

const GROUP_LABELS: Record<StartingItemSlotGroup, string> = {
  origem: 'Origem',
  chamado: 'Chamado',
  equipamento: 'Pacotes',
};

interface StartingItemPickersProps {
  choices: CreationChoices;
  combatContext: EquipmentCombatContext;
  onUpdateItemChoice: (slotId: string, itemId: string) => void;
}

function groupSlots(slots: ReturnType<typeof getStartingItemSlots>) {
  const groups: StartingItemSlotGroup[] = ['origem', 'chamado', 'equipamento'];
  return groups
    .map((group) => ({
      group,
      slots: slots.filter((slot) => slot.group === group),
    }))
    .filter((entry) => entry.slots.length > 0);
}

export function StartingItemPickers({
  choices,
  combatContext,
  onUpdateItemChoice,
}: StartingItemPickersProps) {
  const slots = useMemo(() => getStartingItemSlots(choices), [choices]);
  const itemChoices = useMemo(() => normalizeStartingItemChoices(choices), [choices]);
  const grouped = useMemo(() => groupSlots(slots), [slots]);

  if (grouped.length === 0) {
    return null;
  }

  return (
    <section className="st-creation-equip-block">
      <h4 className="st-creation-equip-block__title">Escolhas detalhadas</h4>
      <div className="st-creation-equip-choice-groups">
        {grouped.map(({ group, slots: groupSlots }) => (
          <div key={group} className="st-creation-equip-choice-group">
            <span className="st-creation-equip-choice-group__label">{GROUP_LABELS[group]}</span>
            <div className="st-creation-equip-slot-pickers">
              {groupSlots.map((slot) => {
                const value = itemChoices[slot.id] ?? slot.allowedItemIds[0] ?? '';
                return (
                  <EquipmentStartingSlotPicker
                    key={slot.id}
                    slot={slot}
                    value={value}
                    combatContext={combatContext}
                    onChange={(itemId) => onUpdateItemChoice(slot.id, itemId)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
