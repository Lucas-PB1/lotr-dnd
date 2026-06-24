import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { CATEGORY_LABELS, getItemDefinition } from '../../../../shared/data/itemCatalog';
import { ITEM_CATEGORY_ICONS, StitchIconPair } from '../../icons';
import { ParchmentCard, StitchBadge } from '../../stitch';
import {
  buildItemStatLines,
  itemDescription,
  itemLabel,
  itemMetaShort,
} from '../inventoryItemDisplay';
import { InventoryItemActions } from './InventoryItemActions';

type InventoryItemDetailProps = {
  item?: InventoryItem;
  combatLine?: string;
  onEquip: (instanceId: string) => void;
  onUnequip: (instanceId: string) => void;
  onUse: (instanceId: string, quantity: number) => void;
  onSell: (instanceId: string, quantity: number) => void;
  onRemove: (instanceId: string) => void;
};

export function InventoryItemDetail({
  item,
  combatLine,
  onEquip,
  onUnequip,
  onUse,
  onSell,
  onRemove,
}: InventoryItemDetailProps) {
  if (!item) {
    return (
      <ParchmentCard className="p-6 md:col-span-2 flex items-center justify-center min-h-[10rem]">
        <p className="text-[var(--color-st-on-surface-variant)] text-sm m-0">
          Selecione um item na mochila ou no equipamento para ver a descrição e as ações.
        </p>
      </ParchmentCard>
    );
  }

  const def = getItemDefinition(item.definitionId);
  const cat = def?.category ?? 'custom';
  const stats = def ? buildItemStatLines(def) : [];
  const description = itemDescription(item);

  return (
    <ParchmentCard className="p-6 md:col-span-2">
      <h4 className="font-st-title mb-4 text-[var(--color-st-secondary)] m-0">
        {INVENTORY_UI.selectedItem}: {itemLabel(item)}
      </h4>
      <div className="flex gap-6 flex-wrap">
        <div className="w-24 h-24 bg-[var(--color-st-surface-container)] rounded border border-[var(--color-st-outline-variant)] flex items-center justify-center shrink-0">
          <StitchIconPair
            pair={ITEM_CATEGORY_ICONS[cat]}
            solid
            size="2xl"
            className="text-[var(--color-st-secondary)]"
          />
        </div>
        <div className="flex-grow space-y-3 min-w-[12rem]">
          <div>
            <p className="font-st-label text-[var(--color-st-on-surface-variant)] m-0 mb-1">
              {INVENTORY_UI.descriptionTitle}
            </p>
            <p className="text-base leading-relaxed m-0 text-[var(--color-st-on-surface)]">
              {description ?? INVENTORY_UI.noDescription}
            </p>
          </div>

          <p className="text-sm text-[var(--color-st-on-surface-variant)] m-0">{itemMetaShort(item)}</p>

          {combatLine && (
            <p className="text-sm text-[var(--color-st-secondary)] m-0">Combate: {combatLine}</p>
          )}

          {stats.length > 0 && (
            <div>
              <p className="font-st-label text-[var(--color-st-on-surface-variant)] m-0 mb-1">
                {INVENTORY_UI.statsTitle}
              </p>
              <ul className="st-item-stats m-0 pl-4">
                {stats.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            <StitchBadge variant="secondary">
              {cat === 'custom' ? 'Personalizado' : CATEGORY_LABELS[cat]}
            </StitchBadge>
            {item.quantity > 1 && <StitchBadge variant="tertiary">×{item.quantity}</StitchBadge>}
            {item.equipped && <StitchBadge variant="primary">Equipado</StitchBadge>}
          </div>

          <InventoryItemActions
            item={item}
            onEquip={onEquip}
            onUnequip={onUnequip}
            onUse={onUse}
            onSell={onSell}
            onRemove={onRemove}
          />
        </div>
      </div>
    </ParchmentCard>
  );
}
