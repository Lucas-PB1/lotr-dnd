import { useState } from 'react';
import { Button, Modal, ModalBody, ModalHeader, TextInput } from 'flowbite-react';
import { InventoryService } from '../../../domain/services/InventoryService';
import type { InventoryItem } from '../../../domain/value-objects/Item';
import {
  CATEGORY_LABELS,
  formatItemCost,
  getItemDefinition,
  itemCostInCopper,
  PDF_CATALOG_SOURCE,
  searchCatalogItems,
  SHOP_CATEGORY_FILTERS,
} from '../../../shared/data/itemCatalog';
import type { ItemDefinition } from '../../../domain/value-objects/Item';
import { createCustomInventoryItem } from '../../../shared/data/inventoryMigration';
import { inventoryToSummaryText } from '../../../shared/data/startingInventoryBuilder';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

function itemLabel(item: InventoryItem): string {
  if (item.definitionId === 'custom') return item.notes ?? 'Item personalizado';
  return getItemDefinition(item.definitionId)?.namePt ?? item.definitionId;
}

function itemMeta(item: InventoryItem): string {
  const def = getItemDefinition(item.definitionId);
  if (!def) return '';
  const parts: string[] = [CATEGORY_LABELS[def.category]];
  if (def.damage) parts.push(def.damage);
  if (def.weight) parts.push(`${def.weight} lb`);
  return parts.join(' · ');
}

function EquippedSlot({
  label,
  item,
  onUnequip,
}: {
  label: string;
  item?: InventoryItem;
  onUnequip?: () => void;
}) {
  return (
    <div className={`equip-slot${item ? ' equip-slot--filled' : ''}`}>
      <span className="equip-slot__label">{label}</span>
      {item ? (
        <>
          <span className="equip-slot__name">{itemLabel(item)}</span>
          {onUnequip && (
            <button type="button" className="equip-slot__action" onClick={onUnequip}>
              Desequipar
            </button>
          )}
        </>
      ) : (
        <span className="equip-slot__empty">Vazio</span>
      )}
    </div>
  );
}

function ShopModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { character, updateCharacter } = useCharacterSheet();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<ItemDefinition['category'] | 'all'>('all');

  const wallet =
    character.currency.copper +
    character.currency.silver * 10 +
    character.currency.gold * 100;

  const shopItems = searchCatalogItems(query).filter(
    (item) => category === 'all' || item.category === category,
  );

  const buy = (definitionId: string) => {
    const result = InventoryService.buy(character, definitionId);
    if (result) updateCharacter(result);
  };

  return (
    <Modal show={open} onClose={onClose} size="4xl">
      <ModalHeader>Loja — Cap. 4 do livro (Equipment)</ModalHeader>
      <ModalBody>
        <p className="inventory-shop__source">
          Itens do PDF oficial ({PDF_CATALOG_SOURCE.pages}). {PDF_CATALOG_SOURCE.note}
        </p>
        <p className="inventory-shop__wallet">
          Carteira: <strong>{character.currency.gold}</strong> ouro ·{' '}
          <strong>{character.currency.silver}</strong> prata ·{' '}
          <strong>{character.currency.copper}</strong> cobre
          <span className="inventory-shop__wallet-total"> ({wallet} cobre total)</span>
        </p>

        <div className="inventory-shop__filters">
          <TextInput
            sizing="sm"
            color="gray"
            placeholder="Buscar item…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="field__input inventory-shop__search"
          />
          <div className="inventory-shop__categories">
            {SHOP_CATEGORY_FILTERS.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`inventory-shop__cat-btn${category === cat.id ? ' inventory-shop__cat-btn--active' : ''}`}
                onClick={() => setCategory(cat.id)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <p className="inventory-shop__count">{shopItems.length} itens</p>

        <div className="inventory-shop__grid">
          {shopItems.map((item) => {
            const cost = itemCostInCopper(item);
            const canBuy = wallet >= cost;
            return (
              <div key={item.id} className="inventory-shop__card">
                <div className="inventory-shop__card-head">
                  <span className="inventory-shop__card-name">{item.namePt}</span>
                  <span className="inventory-shop__card-cat">{CATEGORY_LABELS[item.category]}</span>
                </div>
                {(item.damage || item.description) && (
                  <p className="inventory-shop__card-desc">
                    {[item.damage, item.range, item.description].filter(Boolean).join(' · ')}
                  </p>
                )}
                <div className="inventory-shop__card-foot">
                  <span className="inventory-shop__card-price">{formatItemCost(item)}</span>
                  <Button
                    size="xs"
                    color="warning"
                    disabled={!canBuy}
                    onClick={() => buy(item.id)}
                  >
                    Comprar
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </ModalBody>
    </Modal>
  );
}

export function InventorySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const [shopOpen, setShopOpen] = useState(false);
  const [customName, setCustomName] = useState('');

  const inventory = character.inventory ?? [];
  const mainHand = InventoryService.getEquipped(inventory, 'mainHand');
  const offHand = InventoryService.getEquipped(inventory, 'offHand');
  const armor = InventoryService.getEquipped(inventory, 'armor');
  const carried = inventory.filter((i) => !i.equipped);
  const totalWeight = InventoryService.totalWeight(inventory);

  const equip = (instanceId: string) => {
    updateCharacter(InventoryService.applyEquip(character, instanceId));
  };

  const unequip = (instanceId: string) => {
    updateCharacter(InventoryService.applyUnequip(character, instanceId));
  };

  const sell = (instanceId: string) => {
    const result = InventoryService.sell(character, instanceId);
    if (result) updateCharacter(result);
  };

  const remove = (instanceId: string) => {
    const next = InventoryService.removeItem(inventory, instanceId);
    updateCharacter({ inventory: next, equipment: inventoryToSummaryText(next) });
  };

  const addCustom = () => {
    if (!customName.trim()) return;
    const next = [...inventory, createCustomInventoryItem(customName.trim())];
    updateCharacter({ inventory: next, equipment: inventoryToSummaryText(next) });
    setCustomName('');
  };

  return (
    <div className="inventory-panel inventory-panel--tab">
      <div className="inventory-panel__header">
        <div>
          <h3 className="inventory-panel__title">Inventário</h3>
          <p className="inventory-panel__meta">
            Peso total: {totalWeight} lb · {inventory.length} itens
          </p>
        </div>
        <Button size="sm" color="light" onClick={() => setShopOpen(true)}>
          Loja
        </Button>
      </div>

      <div className="equip-slots">
        <EquippedSlot
          label="Mão principal"
          item={mainHand}
          onUnequip={mainHand ? () => unequip(mainHand.instanceId) : undefined}
        />
        <EquippedSlot
          label="Mão secundária"
          item={offHand}
          onUnequip={offHand ? () => unequip(offHand.instanceId) : undefined}
        />
        <EquippedSlot
          label="Armadura"
          item={armor}
          onUnequip={armor ? () => unequip(armor.instanceId) : undefined}
        />
      </div>

      {carried.length === 0 ? (
        <p className="inventory-panel__empty">Inventário vazio. Compre itens na loja ou complete a criação.</p>
      ) : (
        <ul className="inventory-list">
          {carried.map((item) => {
            const def = getItemDefinition(item.definitionId);
            const canEquip = Boolean(def?.equipSlot);
            const canSell = def && itemCostInCopper(def) > 0;

            return (
              <li key={item.instanceId} className="inventory-list__item">
                <div className="inventory-list__info">
                  <span className="inventory-list__name">
                    {itemLabel(item)}
                    {item.quantity > 1 ? ` ×${item.quantity}` : ''}
                  </span>
                  <span className="inventory-list__meta">{itemMeta(item)}</span>
                </div>
                <div className="inventory-list__actions">
                  {canEquip && (
                    <button
                      type="button"
                      className="inventory-list__btn inventory-list__btn--equip"
                      onClick={() => equip(item.instanceId)}
                    >
                      Equipar
                    </button>
                  )}
                  {canSell && (
                    <button
                      type="button"
                      className="inventory-list__btn"
                      onClick={() => sell(item.instanceId)}
                    >
                      Vender
                    </button>
                  )}
                  {item.definitionId === 'custom' && (
                    <button
                      type="button"
                      className="inventory-list__btn inventory-list__btn--danger"
                      onClick={() => remove(item.instanceId)}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <div className="inventory-custom">
        <TextInput
          sizing="sm"
          color="gray"
          placeholder="Adicionar item personalizado (tesouro, loot…)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustom()}
          className="field__input"
        />
        <Button size="sm" color="light" onClick={addCustom} disabled={!customName.trim()}>
          Adicionar
        </Button>
      </div>

      <ShopModal open={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
  );
}
