import { PDF_CATALOG_SOURCE } from '../../../../shared/data/itemCatalog';
import { SHOP_UI } from '../../../../shared/constants/appLabels';
import { walletTotalCopper } from '../../inventory/inventoryItemDisplay';
import { useShopActions } from '../hooks/useShopActions';
import { useShopCatalog } from '../hooks/useShopCatalog';
import { ShopCatalogCard } from './ShopCatalogCard';
import { ShopPageHeader } from './ShopPageHeader';
import { ShopToolbar } from './ShopToolbar';

export function ShopStitchView() {
  const catalog = useShopCatalog();
  const { currency, inventory, buy, receive } = useShopActions();
  const wallet = walletTotalCopper(currency);

  return (
    <div className="st-shop-page">
      <ShopPageHeader />

      <ShopToolbar
        query={catalog.query}
        onQueryChange={catalog.setQuery}
        sort={catalog.sort}
        onSortChange={catalog.setSort}
        category={catalog.category}
        onCategoryChange={catalog.setCategory}
        categoryFilters={catalog.categoryFilters}
        itemCount={catalog.items.length}
        onClearFilters={catalog.clearFilters}
      />

      {catalog.items.length === 0 ? (
        <div className="st-shop-empty">
          <p>{SHOP_UI.empty}</p>
          <button type="button" className="st-shop-clear" onClick={catalog.clearFilters}>
            {SHOP_UI.clearFilters}
          </button>
        </div>
      ) : (
        <div className="st-shop-grid">
          {catalog.items.map((item) => (
            <ShopCatalogCard
              key={item.id}
              item={item}
              walletCopper={wallet}
              inventory={inventory}
              onBuy={buy}
              onReceive={receive}
            />
          ))}
        </div>
      )}

      <p className="st-shop-source font-st-label text-[var(--color-st-on-surface-variant)]">
        {PDF_CATALOG_SOURCE.note ?? SHOP_UI.catalogSource}
      </p>
    </div>
  );
}
