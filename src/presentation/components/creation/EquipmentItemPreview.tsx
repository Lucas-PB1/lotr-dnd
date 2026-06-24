import type { ItemDefinition } from '../../../domain/value-objects/Item';
import type { EquipmentCombatContext } from './equipmentItemDisplay';
import { buildCompactEquipmentPreview } from './equipmentCompactPreview';

type EquipmentItemPreviewProps = {
  def: ItemDefinition;
  combatContext: EquipmentCombatContext;
};

export function EquipmentItemPreview({ def, combatContext }: EquipmentItemPreviewProps) {
  const compact = buildCompactEquipmentPreview(def, combatContext);
  if (!compact) return null;

  return (
    <p className="st-creation-equip-item-preview">
      <span className="st-creation-equip-item-preview__text">{compact.line}</span>
      {compact.note ? (
        <span className="st-creation-equip-item-preview__note">{compact.note}</span>
      ) : null}
    </p>
  );
}
