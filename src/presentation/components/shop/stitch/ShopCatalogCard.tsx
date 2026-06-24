import { useState } from 'react';
import type { ItemDefinition } from '../../../../domain/value-objects/Item';
import { itemCostInCopper } from '../../../../shared/data/itemCatalog';
import { SHOP_UI } from '../../../../shared/constants/appLabels';
import { ParchmentCard } from '../../stitch';
import {
  buildItemStatLines,
  CATEGORY_LABELS,
  countOwned,
  formatItemCost,
} from '../../inventory/inventoryItemDisplay';
import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { SHOP_CATEGORY_MATERIAL_ICONS } from './shopCategoryIcons';

type ShopCatalogCardProps = {
  item: ItemDefinition;
  walletCopper: number;
  inventory: InventoryItem[];
  onBuy: (definitionId: string, quantity: number) => void;
  onReceive: (definitionId: string, quantity: number) => void;
};

export function ShopCatalogCard({
  item,
  walletCopper,
  inventory,
  onBuy,
  onReceive,
}: ShopCatalogCardProps) {
  const [quantity, setQuantity] = useState(1);
  const cost = itemCostInCopper(item);
  const totalCost = cost * quantity;
  const canBuy = walletCopper >= totalCost && cost > 0;
  const owned = countOwned(inventory, item.id);
  const stats = buildItemStatLines(item).slice(0, 2);

  const adjustQty = (delta: number) => {
    setQuantity((q) => Math.max(1, Math.min(99, q + delta)));
  };

  return (
    <ParchmentCard
      accentTop
      className={`st-shop-card st-shop-card--${item.category}${!canBuy && cost > 0 ? ' st-shop-card--short' : ''}`}
    >
      <div className="st-shop-card__head">
        <span className="st-shop-card__icon" aria-hidden>
          <span className="material-symbols-outlined">{SHOP_CATEGORY_MATERIAL_ICONS[item.category]}</span>
        </span>
        <span className="st-shop-card__cat">{CATEGORY_LABELS[item.category]}</span>
        {owned > 0 && (
          <span className="st-shop-card__owned" title={SHOP_UI.owned}>
            ×{owned}
          </span>
        )}
      </div>

      <h3 className="st-shop-card__name">{item.namePt}</h3>

      {stats.length > 0 && (
        <ul className="st-shop-card__stats">
          {stats.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}
      {!stats.length && item.description && (
        <p className="st-shop-card__desc">{item.description}</p>
      )}

      <footer className="st-shop-card__foot">
        <div className="st-shop-card__price-block">
          <span className="st-shop-card__price">{formatItemCost(item)}</span>
          {!canBuy && cost > 0 && (
            <span className="st-shop-card__shortfall">
              {SHOP_UI.shortfall.replace('{n}', String(totalCost - walletCopper))}
            </span>
          )}
        </div>

        <div className="st-shop-card__qty" aria-label={SHOP_UI.quantity}>
          <button type="button" onClick={() => adjustQty(-1)} aria-label="Menos">
            −
          </button>
          <span>{quantity}</span>
          <button type="button" onClick={() => adjustQty(1)} aria-label="Mais">
            +
          </button>
        </div>

        <div className="st-shop-card__actions">
          <button
            type="button"
            className="st-shop-btn st-shop-btn--buy"
            disabled={!canBuy}
            onClick={() => onBuy(item.id, quantity)}
          >
            {SHOP_UI.buy}
          </button>
          <button
            type="button"
            className="st-shop-btn st-shop-btn--receive"
            title={SHOP_UI.receiveHint}
            onClick={() => onReceive(item.id, quantity)}
          >
            {SHOP_UI.receive}
          </button>
        </div>
      </footer>
    </ParchmentCard>
  );
}
