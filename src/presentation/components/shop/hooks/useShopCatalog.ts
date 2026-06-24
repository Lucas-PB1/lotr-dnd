import { useMemo, useState } from 'react';
import type { ItemDefinition } from '../../../../domain/value-objects/Item';
import {
  itemCostInCopper,
  searchCatalogItems,
  SHOP_CATEGORY_FILTERS,
} from '../../../../shared/data/itemCatalog';

export type ShopSortMode = 'name' | 'price-asc' | 'price-desc';

export function useShopCatalog() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ItemDefinition['category'] | 'all'>('all');
  const [sort, setSort] = useState<ShopSortMode>('name');

  const items = useMemo(() => {
    let list = searchCatalogItems(query).filter(
      (item) => category === 'all' || item.category === category,
    );

    list = [...list].sort((a, b) => {
      if (sort === 'price-asc') return itemCostInCopper(a) - itemCostInCopper(b);
      if (sort === 'price-desc') return itemCostInCopper(b) - itemCostInCopper(a);
      return a.namePt.localeCompare(b.namePt, 'pt');
    });

    return list;
  }, [query, category, sort]);

  const clearFilters = () => {
    setQuery('');
    setCategory('all');
    setSort('name');
  };

  return {
    items,
    query,
    setQuery,
    category,
    setCategory,
    sort,
    setSort,
    clearFilters,
    categoryFilters: SHOP_CATEGORY_FILTERS,
  };
}
