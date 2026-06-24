import { useEffect } from 'react';
import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { InventoryItemDetail } from './InventoryItemDetail';

type InventoryItemDrawerProps = {
  open: boolean;
  item?: InventoryItem;
  combatLine?: string;
  onClose: () => void;
  onEquip: (instanceId: string) => void;
  onUnequip: (instanceId: string) => void;
  onUse: (instanceId: string, qty: number) => void;
  onSell: (instanceId: string, qty: number) => void;
  onRemove: (instanceId: string) => void;
};

export function InventoryItemDrawer({
  open,
  item,
  combatLine,
  onClose,
  onEquip,
  onUnequip,
  onUse,
  onSell,
  onRemove,
}: InventoryItemDrawerProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !item) return null;

  return (
    <div className="st-inventory-drawer no-print" role="dialog" aria-modal="true" aria-label="Detalhe do item">
      <button type="button" className="st-inventory-drawer__backdrop" aria-label="Fechar" onClick={onClose} />
      <div className="st-inventory-drawer__panel">
        <header className="st-inventory-drawer__head">
          <h3>Item selecionado</h3>
          <button type="button" className="st-inventory-drawer__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>
        <InventoryItemDetail
          item={item}
          combatLine={combatLine}
          onEquip={onEquip}
          onUnequip={onUnequip}
          onUse={onUse}
          onSell={onSell}
          onRemove={onRemove}
        />
      </div>
    </div>
  );
}
