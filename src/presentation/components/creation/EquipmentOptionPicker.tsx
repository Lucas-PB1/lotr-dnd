import type { EquipmentOptionGroup } from '../../../shared/data/startingEquipmentData';
import { getItemDefinition } from '../../../shared/data/itemCatalog';
import { resolveEquipmentOptionItemIds } from '../../../shared/data/startingItemSlots';
import { CreationSelect } from './CreationSelect';
import type { EquipmentCombatContext } from './equipmentItemDisplay';
import { EquipmentItemPreview } from './EquipmentItemPreview';

type EquipmentOptionPickerProps = {
  group: EquipmentOptionGroup;
  value: string;
  combatContext: EquipmentCombatContext;
  onChange: (optionId: string) => void;
};

function primaryPreviewItem(groupId: string, optionId: string) {
  const ids = resolveEquipmentOptionItemIds(groupId, optionId);
  return ids
    .map((id) => getItemDefinition(id))
    .find((def) => def && (def.category === 'weapon' || def.category === 'armor' || def.category === 'shield'))
    ?? getItemDefinition(ids[0]);
}

export function EquipmentOptionPicker({
  group,
  value,
  combatContext,
  onChange,
}: EquipmentOptionPickerProps) {
  const previewDef = primaryPreviewItem(group.id, value);

  return (
    <div className="st-creation-equip-option-picker">
      <label className="st-creation-field__label" htmlFor={`equip-${group.id}`}>
        {group.labelPt}
      </label>
      <CreationSelect
        id={`equip-${group.id}`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {group.options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.labelPt}
          </option>
        ))}
      </CreationSelect>
      {previewDef && (
        <EquipmentItemPreview def={previewDef} combatContext={combatContext} />
      )}
    </div>
  );
}
