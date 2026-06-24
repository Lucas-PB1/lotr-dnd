import { useState } from 'react';
import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { InventoryService } from '../../../../domain/services/InventoryService';
import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { getItemDefinition, itemCostInCopper } from '../../../../shared/data/itemCatalog';
import { ITEM_CATEGORY_ICONS, StitchIcon, UI_ICONS } from '../../icons';
import { LedgerRow, ParchmentCard } from '../../stitch';
import { CARRY_FILTERS } from '../hooks/useInventoryDerived';
import { itemDescription, itemLabel } from '../inventoryItemDisplay';

type InventoryLedgerListProps = {
  items: InventoryItem[];
  carriedCount: number;
  filter: string;
  search: string;
  selectedItemId?: string;
  onFilterChange: (id: (typeof CARRY_FILTERS)[number]['id']) => void;
  onSearchChange: (q: string) => void;
  onSelectItem: (instanceId: string) => void;
  onEquip: (instanceId: string) => void;
  onUse: (instanceId: string) => void;
  onSell: (instanceId: string) => void;
  onRemove: (instanceId: string) => void;
  totalValueLabel: string;
  onAddCustom: (name: string) => boolean;
};

const actionBtnClass =
  'p-1 rounded hover:bg-[var(--color-st-surface-container-high)] transition-colors';

export function InventoryLedgerList({
  items,
  carriedCount,
  filter,
  search,
  selectedItemId,
  onFilterChange,
  onSearchChange,
  onSelectItem,
  onEquip,
  onUse,
  onSell,
  onRemove,
  totalValueLabel,
  onAddCustom,
}: InventoryLedgerListProps) {
  const [customName, setCustomName] = useState('');

  const handleAdd = () => {
    if (onAddCustom(customName)) setCustomName('');
  };

  return (
    <ParchmentCard className="p-6 flex flex-col min-h-[28rem]">
      <div className="flex justify-between items-center mb-4 gap-2 flex-wrap">
        <h3 className="font-st-title uppercase tracking-widest flex items-center gap-2 m-0">
          <StitchIcon icon={UI_ICONS.backpack} size="md" className="text-[var(--color-st-secondary)]" />
          {INVENTORY_UI.packContents}
          {carriedCount > 0 && (
            <span className="text-sm text-[var(--color-st-on-surface-variant)] font-normal normal-case">
              ({items.length}/{carriedCount})
            </span>
          )}
        </h3>
        <div className="flex gap-2 flex-1 min-w-[12rem] justify-end">
          <input
            type="search"
            placeholder="Filtrar…"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-[var(--color-st-surface-container)] border border-[var(--color-st-outline-variant)] text-sm text-[var(--color-st-on-surface)] max-w-[10rem]"
          />
        </div>
      </div>

      {carriedCount > 0 && (
        <div className="flex flex-wrap gap-1 mb-4">
          {CARRY_FILTERS.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`px-2 py-0.5 rounded-full text-xs font-st-label border ${
                filter === f.id
                  ? 'bg-[var(--color-st-primary-container)] border-transparent text-[var(--color-st-on-primary-container)]'
                  : 'border-[var(--color-st-outline-variant)] text-[var(--color-st-on-surface-variant)]'
              }`}
              onClick={() => onFilterChange(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
      )}

      <div className="overflow-y-auto flex-grow pr-2 space-y-1 st-custom-scrollbar min-h-[12rem]">
        {items.length === 0 ? (
          <p className="text-[var(--color-st-on-surface-variant)] text-sm">{INVENTORY_UI.emptyPack}</p>
        ) : (
          items.map((item) => {
            const def = getItemDefinition(item.definitionId);
            const cat = def?.category ?? 'custom';
            const canEquip = Boolean(def?.equipSlot);
            const canUse = InventoryService.isUsable(def, item);
            const canSell = def && itemCostInCopper(def) > 0;
            const isCustom = item.definitionId === 'custom';
            const desc = itemDescription(item);
            const descPreview =
              desc && desc.length > 72 ? `${desc.slice(0, 72)}…` : desc;

            return (
              <LedgerRow
                key={item.instanceId}
                icon={ITEM_CATEGORY_ICONS[cat]}
                iconFilled={cat === 'treasure' || cat === 'custom'}
                label={
                  <span className="min-w-0">
                    <span className="block">{itemLabel(item)}</span>
                    {descPreview && (
                      <span className="block text-xs text-[var(--color-st-on-surface-variant)] font-normal normal-case mt-0.5 line-clamp-1">
                        {descPreview}
                      </span>
                    )}
                  </span>
                }
                trailing={`${item.quantity} un.`}
                selected={selectedItemId === item.instanceId}
                onClick={() => onSelectItem(item.instanceId)}
                actions={
                  <>
                    {canEquip && (
                      <button
                        type="button"
                        className={`${actionBtnClass} text-[var(--color-st-outline)] hover:text-[var(--color-st-secondary)]`}
                        title={INVENTORY_UI.equipItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          onEquip(item.instanceId);
                        }}
                      >
                        <StitchIcon icon={UI_ICONS.equip} size="sm" />
                      </button>
                    )}
                    {canUse && (
                      <button
                        type="button"
                        className={`${actionBtnClass} text-[var(--color-st-outline)] hover:text-[var(--color-st-tertiary)]`}
                        title={INVENTORY_UI.useItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          onUse(item.instanceId);
                        }}
                      >
                        <StitchIcon icon={UI_ICONS.use} size="sm" />
                      </button>
                    )}
                    {canSell && (
                      <button
                        type="button"
                        className={`${actionBtnClass} text-[var(--color-st-outline)] hover:text-[var(--color-st-secondary)]`}
                        title={INVENTORY_UI.sellItem}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSell(item.instanceId);
                        }}
                      >
                        <StitchIcon icon={UI_ICONS.sell} size="sm" />
                      </button>
                    )}
                    {isCustom && (
                      <button
                        type="button"
                        className={`${actionBtnClass} text-[var(--color-st-error)]`}
                        title="Remover"
                        onClick={(e) => {
                          e.stopPropagation();
                          onRemove(item.instanceId);
                        }}
                      >
                        <StitchIcon icon={UI_ICONS.delete} size="sm" />
                      </button>
                    )}
                    <StitchIcon
                      icon={UI_ICONS.edit}
                      size="sm"
                      className="text-[var(--color-st-outline-variant)]"
                    />
                  </>
                }
              />
            );
          })
        )}
      </div>

      <div className="mt-4 pt-4 border-t border-[var(--color-st-outline-variant)] flex justify-between">
        <span className="font-st-label text-[var(--color-st-on-surface-variant)]">{INVENTORY_UI.totalValue}</span>
        <span className="text-[var(--color-st-secondary)]">{totalValueLabel}</span>
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          placeholder={INVENTORY_UI.addCustomPlaceholder}
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="flex-1 px-3 py-2 rounded-lg bg-[var(--color-st-surface-container)] border border-[var(--color-st-outline-variant)] text-sm"
        />
        <button
          type="button"
          onClick={handleAdd}
          disabled={!customName.trim()}
          className="px-4 py-2 rounded-lg bg-[var(--color-st-primary-container)] text-[var(--color-st-on-primary-container)] font-st-label disabled:opacity-40"
        >
          +
        </button>
      </div>
    </ParchmentCard>
  );
}
