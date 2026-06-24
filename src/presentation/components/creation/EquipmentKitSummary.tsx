import type { CreationChoices } from '../../../domain/services/CharacterCreationService';
import type { CallingEquipmentDefinition } from '../../../shared/data/startingEquipmentData';
import { buildAutomaticGearPreview } from './equipmentGearPreview';

type EquipmentKitSummaryProps = {
  choices: CreationChoices;
  callingEquipment: CallingEquipmentDefinition | null;
};

export function EquipmentKitSummary({ choices, callingEquipment }: EquipmentKitSummaryProps) {
  const items = buildAutomaticGearPreview(choices, callingEquipment);
  if (items.length === 0) return null;

  const silverItem = items.find((item) => item.id === 'silver-pouch');
  const gearItems = items.filter((item) => item.id !== 'silver-pouch');
  const living = gearItems[0]?.subtitle.replace('Cultura · ', '') ?? '—';

  return (
    <details className="st-creation-equip-kit-details">
      <summary className="st-creation-equip-kit-details__summary">
        <span className="st-creation-equip-kit-details__title">Kit automático</span>
        <span className="st-creation-equip-kit-details__meta">
          {living} · {gearItems.length} itens
          {silverItem ? ` · ${silverItem.subtitle}` : ''}
        </span>
      </summary>
      <ul className="st-creation-equip-kit-details__list">
        {items.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </details>
  );
}
