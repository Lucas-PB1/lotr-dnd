import { getItemDefinition } from '../../../shared/data/itemCatalog';
import type { StartingItemSlot } from '../../../shared/data/startingItemSlots';
import { CreationSelect } from './CreationSelect';
import type { EquipmentCombatContext } from './equipmentItemDisplay';
import { EquipmentItemPreview } from './EquipmentItemPreview';

type EquipmentStartingSlotPickerProps = {
  slot: StartingItemSlot;
  value: string;
  combatContext: EquipmentCombatContext;
  onChange: (itemId: string) => void;
};

export function EquipmentStartingSlotPicker({
  slot,
  value,
  combatContext,
  onChange,
}: EquipmentStartingSlotPickerProps) {
  const selectedDef = getItemDefinition(value);

  return (
    <div className="st-creation-equip-slot-field">
      <div className="st-creation-equip-slot-field__head">
        <label className="st-creation-field__label" htmlFor={`item-slot-${slot.id}`}>
          {slot.labelPt}
        </label>
        {slot.hintPt ? (
          <span className="st-creation-equip-slot-picker__hint">{slot.hintPt}</span>
        ) : null}
      </div>
      <CreationSelect
        id={`item-slot-${slot.id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {slot.allowedItemIds.map((itemId) => {
          const def = getItemDefinition(itemId);
          return (
            <option key={itemId} value={itemId}>
              {def?.namePt ?? itemId}
            </option>
          );
        })}
      </CreationSelect>
      {selectedDef && (
        <EquipmentItemPreview def={selectedDef} combatContext={combatContext} />
      )}
    </div>
  );
}
