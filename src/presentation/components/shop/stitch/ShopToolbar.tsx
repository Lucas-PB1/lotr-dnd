import { SHOP_UI } from '../../../../shared/constants/appLabels';
import { StitchIcon, UI_ICONS } from '../../icons';
import type { ShopSortMode } from '../hooks/useShopCatalog';
import type { ItemDefinition } from '../../../../domain/value-objects/Item';

type ShopToolbarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  sort: ShopSortMode;
  onSortChange: (value: ShopSortMode) => void;
  category: ItemDefinition['category'] | 'all';
  onCategoryChange: (value: ItemDefinition['category'] | 'all') => void;
  categoryFilters: { id: ItemDefinition['category'] | 'all'; label: string }[];
  itemCount: number;
  onClearFilters: () => void;
};

export function ShopToolbar({
  query,
  onQueryChange,
  sort,
  onSortChange,
  category,
  onCategoryChange,
  categoryFilters,
  itemCount,
  onClearFilters,
}: ShopToolbarProps) {
  const hasFilters = query.trim() !== '' || category !== 'all' || sort !== 'name';

  return (
    <div className="st-shop-toolbar space-y-3">
      <div className="st-shop-toolbar__row">
        <div className="st-shop-search">
          <StitchIcon
            icon={UI_ICONS.search}
            size="md"
            className="st-shop-search__icon text-[var(--color-st-outline)]"
          />
          <input
            type="search"
            className="st-shop-search__input"
            placeholder={SHOP_UI.searchPlaceholder}
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
        <select
          className="st-shop-sort"
          value={sort}
          onChange={(e) => onSortChange(e.target.value as ShopSortMode)}
          aria-label="Ordenar catálogo"
        >
          <option value="name">{SHOP_UI.sortName}</option>
          <option value="price-asc">{SHOP_UI.sortPriceAsc}</option>
          <option value="price-desc">{SHOP_UI.sortPriceDesc}</option>
        </select>
      </div>

      <div className="st-shop-categories" role="tablist">
        {categoryFilters.map((cat) => (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={category === cat.id}
            className={`st-shop-cat${category === cat.id ? ' st-shop-cat--active' : ''}`}
            onClick={() => onCategoryChange(cat.id)}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <div className="st-shop-toolbar__meta">
        <span className="font-st-label text-[var(--color-st-on-surface-variant)]">
          {itemCount} {SHOP_UI.itemCount}
          {query.trim() ? ` · “${query.trim()}”` : ''}
        </span>
        {hasFilters && (
          <button type="button" className="st-shop-clear" onClick={onClearFilters}>
            {SHOP_UI.clearFilters}
          </button>
        )}
      </div>
    </div>
  );
}
