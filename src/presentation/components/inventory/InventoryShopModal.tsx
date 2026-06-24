import { useMemo, useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from 'flowbite-react';
import { InventoryService } from '../../../domain/services/InventoryService';
import type { ItemDefinition } from '../../../domain/value-objects/Item';
import {
  itemCostInCopper,
  PDF_CATALOG_SOURCE,
  searchCatalogItems,
  SHOP_CATEGORY_FILTERS,
} from '../../../shared/data/itemCatalog';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import {
  buildItemStatLines,
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  countOwned,
  formatItemCost,
  formatWallet,
  walletTotalCopper,
} from './inventoryItemDisplay';

type SortMode = 'name' | 'price-asc' | 'price-desc';

interface InventoryShopModalProps {
  open: boolean;
  onClose: () => void;
}

export function InventoryShopModal({ open, onClose }: InventoryShopModalProps) {
  const { character, updateCharacter } = useCharacterSheet();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ItemDefinition['category'] | 'all'>('all');
  const [sort, setSort] = useState<SortMode>('name');

  const wallet = walletTotalCopper(character.currency);
  const inventory = character.inventory ?? [];

  const shopItems = useMemo(() => {
    let items = searchCatalogItems(query).filter(
      (item) => category === 'all' || item.category === category,
    );

    items = [...items].sort((a, b) => {
      if (sort === 'price-asc') return itemCostInCopper(a) - itemCostInCopper(b);
      if (sort === 'price-desc') return itemCostInCopper(b) - itemCostInCopper(a);
      return a.namePt.localeCompare(b.namePt, 'pt');
    });

    return items;
  }, [query, category, sort]);

  const buy = (definitionId: string) => {
    const result = InventoryService.buy(character, definitionId);
    if (result) updateCharacter(result);
  };

  return (
    <Modal show={open} onClose={onClose} size="5xl" dismissible className="inventory-shop-modal">
      <ModalHeader className="inventory-shop-modal__header">
        <div className="inventory-shop-modal__title-block">
          <span className="inventory-shop-modal__title">Mercador da Terra-média</span>
          <span className="inventory-shop-modal__subtitle">
            Cap. 4 — {PDF_CATALOG_SOURCE.pages}
          </span>
        </div>
      </ModalHeader>
      <ModalBody className="inventory-shop-modal__body">
        <div className="inventory-shop__toolbar">
          <div className="inventory-shop__wallet-bar">
            <span className="inventory-shop__wallet-label">Carteira</span>
            <div className="inventory-shop__wallet-coins">
              <span className="inventory-shop__coin inventory-shop__coin--gold">
                {character.currency.gold} <small>ouro</small>
              </span>
              <span className="inventory-shop__coin inventory-shop__coin--silver">
                {character.currency.silver} <small>prata</small>
              </span>
              <span className="inventory-shop__coin inventory-shop__coin--copper">
                {character.currency.copper} <small>cobre</small>
              </span>
            </div>
            <span className="inventory-shop__wallet-total">{wallet} cobre · {formatWallet(character.currency)}</span>
          </div>

          <div className="inventory-shop__controls">
            <TextInput
              sizing="sm"
              color="gray"
              placeholder="Buscar por nome, propriedade ou descrição…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="field__input inventory-shop__search"
            />
            <select
              className="inventory-shop__sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              aria-label="Ordenar itens"
            >
              <option value="name">Nome A–Z</option>
              <option value="price-asc">Preço: menor</option>
              <option value="price-desc">Preço: maior</option>
            </select>
          </div>

          <div className="inventory-shop__categories" role="tablist">
            {SHOP_CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={category === cat.id}
                className={`inventory-shop__cat-btn${category === cat.id ? ' inventory-shop__cat-btn--active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <p className="inventory-shop__count">
            {shopItems.length} {shopItems.length === 1 ? 'item' : 'itens'}
            {query.trim() ? ` para “${query.trim()}”` : ''}
          </p>
        </div>

        {shopItems.length === 0 ? (
          <div className="inventory-shop__empty">
            <p>Nenhum item encontrado.</p>
            <Button size="sm" color="light" onClick={() => { setQuery(''); setCategory('all'); }}>
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="inventory-shop__grid">
            {shopItems.map((item) => {
              const cost = itemCostInCopper(item);
              const canBuy = wallet >= cost;
              const owned = countOwned(inventory, item.id);
              const stats = buildItemStatLines(item);

              return (
                <article
                  key={item.id}
                  className={`inventory-shop__card inventory-shop__card--${item.category}${!canBuy ? ' inventory-shop__card--locked' : ''}`}
                >
                  <header className="inventory-shop__card-head">
                    <span className="inventory-shop__card-icon" aria-hidden>
                      {CATEGORY_ICONS[item.category]}
                    </span>
                    <div className="inventory-shop__card-titles">
                      <h4 className="inventory-shop__card-name">{item.namePt}</h4>
                      <span className="inventory-shop__card-cat">{CATEGORY_LABELS[item.category]}</span>
                    </div>
                    {owned > 0 && (
                      <span className="inventory-shop__owned" title="Já no inventário">
                        ×{owned}
                      </span>
                    )}
                  </header>

                  {stats.length > 0 && (
                    <ul className="inventory-shop__card-stats">
                      {stats.map((line) => (
                        <li key={line}>{line}</li>
                      ))}
                    </ul>
                  )}

                  <footer className="inventory-shop__card-foot">
                    <div className="inventory-shop__price-block">
                      <span className="inventory-shop__card-price">{formatItemCost(item)}</span>
                      {!canBuy && cost > 0 && (
                        <span className="inventory-shop__shortfall">
                          Faltam {cost - wallet} cobre
                        </span>
                      )}
                    </div>
                    <Button
                      size="xs"
                      color={canBuy ? 'warning' : 'light'}
                      disabled={!canBuy}
                      onClick={() => buy(item.id)}
                    >
                      Comprar
                    </Button>
                  </footer>
                </article>
              );
            })}
          </div>
        )}

        <p className="inventory-shop__source">{PDF_CATALOG_SOURCE.note}</p>
      </ModalBody>
      <ModalFooter className="inventory-shop-modal__footer">
        <Button color="light" onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
