import { useMemo } from 'react';
import type { CreationChoices } from '../../../domain/services/CharacterCreationService';
import { getItemDefinition } from '../../../shared/data/itemCatalog';
import {
  getCultureGearPreview,
  getStartingItemSlots,
  normalizeStartingItemChoices,
  type StartingItemSlotGroup,
} from '../../../shared/data/startingItemSlots';
import { CreationSelect } from './CreationSelect';

const GROUP_LABELS: Record<StartingItemSlotGroup, string> = {
  origem: 'Origem (antecedente)',
  chamado: 'Chamado',
  equipamento: 'Pacotes de equipamento',
};

interface StartingItemPickersProps {
  choices: CreationChoices;
  onUpdateItemChoice: (slotId: string, itemId: string) => void;
}

function groupSlots(slots: ReturnType<typeof getStartingItemSlots>) {
  const groups: StartingItemSlotGroup[] = ['origem', 'chamado', 'equipamento'];
  return groups
    .map((group) => ({
      group,
      slots: slots.filter((s) => s.group === group),
    }))
    .filter((g) => g.slots.length > 0);
}

export function StartingItemPickers({ choices, onUpdateItemChoice }: StartingItemPickersProps) {
  const slots = useMemo(() => getStartingItemSlots(choices), [choices]);
  const itemChoices = useMemo(
    () => normalizeStartingItemChoices(choices),
    [choices],
  );
  const culturePreview = useMemo(() => getCultureGearPreview(choices), [choices]);
  const grouped = useMemo(() => groupSlots(slots), [slots]);

  return (
    <div className="starting-items">
      <h4 className="starting-items__title">Itens no inventário</h4>

      <div className="starting-items__culture">
        <span className="starting-items__culture-label">Kit cultural (automático)</span>
        <ul className="starting-items__culture-list">
          {culturePreview.map((item) => (
            <li key={item}>{item}</li>
          ))}
          <li>Bolsa com moedas de prata (padrão de vida)</li>
        </ul>
      </div>

      {grouped.length === 0 ? (
        <p className="starting-items__hint">
          Escolha cultura, antecedente e chamado para definir armas e ferramentas.
        </p>
      ) : (
        grouped.map(({ group, slots: groupSlots }) => (
          <div key={group} className="starting-items__group">
            <span className="starting-items__group-label">{GROUP_LABELS[group]}</span>
            <div className="starting-items__grid">
              {groupSlots.map((slot) => {
                const value = itemChoices[slot.id] ?? slot.allowedItemIds[0] ?? '';
                return (
                  <div key={slot.id} className="starting-items__field">
                    <label className="starting-items__label" htmlFor={`item-slot-${slot.id}`}>
                      {slot.labelPt}
                    </label>
                    {slot.hintPt ? (
                      <span className="starting-items__hint-line">{slot.hintPt}</span>
                    ) : null}
                    <CreationSelect
                      id={`item-slot-${slot.id}`}
                      value={value}
                      onChange={(e) => onUpdateItemChoice(slot.id, e.target.value)}
                    >
                      {slot.allowedItemIds.map((id) => {
                        const def = getItemDefinition(id);
                        return (
                          <option key={id} value={id}>
                            {def?.namePt ?? id}
                          </option>
                        );
                      })}
                    </CreationSelect>
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}

      <p className="starting-items__sync">
        As escolhas entram no inventário automaticamente — confira na aba{' '}
        <span className="starting-items__sync-tab">Inventário</span>.
      </p>
    </div>
  );
}
