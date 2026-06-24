import { useEffect, useState } from 'react';
import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { InventoryService } from '../../../../domain/services/InventoryService';
import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { getItemDefinition, itemCostInCopper } from '../../../../shared/data/itemCatalog';
import { StitchIcon, UI_ICONS } from '../../icons';
import { itemLabel } from '../inventoryItemDisplay';

type InventoryItemActionsProps = {
  item: InventoryItem;
  onEquip: (instanceId: string) => void;
  onUnequip: (instanceId: string) => void;
  onUse: (instanceId: string, quantity: number) => void;
  onSell: (instanceId: string, quantity: number) => void;
  onRemove: (instanceId: string) => void;
};

export function InventoryItemActions({
  item,
  onEquip,
  onUnequip,
  onUse,
  onSell,
  onRemove,
}: InventoryItemActionsProps) {
  const [qty, setQty] = useState(1);
  const def = getItemDefinition(item.definitionId);
  const maxQty = item.quantity;
  const canEquip = Boolean(def?.equipSlot) && !item.equipped;
  const canUnequip = Boolean(item.equipped);
  const canUse = InventoryService.isUsable(def, item);
  const canSell = Boolean(def && itemCostInCopper(def) > 0);
  const isCustom = item.definitionId === 'custom';

  useEffect(() => {
    setQty((current) => Math.min(Math.max(1, current), maxQty));
  }, [item.instanceId, maxQty]);

  const clampQty = (value: number) => Math.min(Math.max(1, value), maxQty);

  const runWithQty = (action: (id: string, quantity: number) => void) => {
    action(item.instanceId, clampQty(qty));
  };

  return (
    <div className="st-item-actions">
      <label className="st-item-actions__qty">
        <span className="font-st-label text-[var(--color-st-on-surface-variant)]">
          {INVENTORY_UI.quantity}
        </span>
        <input
          type="number"
          min={1}
          max={maxQty}
          value={qty}
          onChange={(e) => setQty(clampQty(Number(e.target.value) || 1))}
          className="st-item-actions__qty-input"
          aria-label={`${INVENTORY_UI.quantity} — ${itemLabel(item)}`}
        />
        <span className="text-xs text-[var(--color-st-on-surface-variant)]">/ {maxQty}</span>
      </label>

      <div className="st-item-actions__buttons">
        {canEquip && (
          <button type="button" className="st-item-actions__btn st-item-actions__btn--primary" onClick={() => onEquip(item.instanceId)}>
            <StitchIcon icon={UI_ICONS.equip} size="sm" />
            {INVENTORY_UI.equipItem}
          </button>
        )}
        {canUnequip && (
          <button type="button" className="st-item-actions__btn" onClick={() => onUnequip(item.instanceId)}>
            <StitchIcon icon={UI_ICONS.unequip} size="sm" />
            {INVENTORY_UI.unequipItem}
          </button>
        )}
        {canUse && (
          <button
            type="button"
            className="st-item-actions__btn st-item-actions__btn--use"
            onClick={() => runWithQty(onUse)}
          >
            <StitchIcon icon={UI_ICONS.use} size="sm" />
            {INVENTORY_UI.useItem}
            {maxQty > 1 ? ` (${clampQty(qty)})` : ''}
          </button>
        )}
        {canSell && (
          <button
            type="button"
            className="st-item-actions__btn"
            onClick={() => runWithQty(onSell)}
          >
            <StitchIcon icon={UI_ICONS.sell} size="sm" />
            {INVENTORY_UI.sellItem}
            {maxQty > 1 ? ` (${clampQty(qty)})` : ''}
          </button>
        )}
        {isCustom && (
          <button
            type="button"
            className="st-item-actions__btn st-item-actions__btn--danger"
            onClick={() => {
              onRemove(item.instanceId);
            }}
          >
            <StitchIcon icon={UI_ICONS.delete} size="sm" />
            {INVENTORY_UI.removeItem}
          </button>
        )}
      </div>
    </div>
  );
}
