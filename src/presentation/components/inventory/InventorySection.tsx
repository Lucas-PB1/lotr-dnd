import { useMemo, useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { Character } from '../../../domain/entities/Character';
import { AttackRollService } from '../../../domain/services/AttackRollService';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { InventoryService } from '../../../domain/services/InventoryService';
import type { InventoryItem, ItemDefinition } from '../../../domain/value-objects/Item';
import { createCustomInventoryItem } from '../../../domain/value-objects/Item';
import { getItemDefinition, itemCostInCopper } from '../../../shared/data/itemCatalog';
import { inventoryToSummaryText } from '../../../shared/data/startingInventoryBuilder';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import {
  buildItemStatLines,
  CATEGORY_ICONS,
  CATEGORY_LABELS,
  itemLabel,
  itemMetaShort,
} from './inventoryItemDisplay';
import { InventoryShopModal } from './InventoryShopModal';

const CARRY_FILTERS: { id: ItemDefinition['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'weapon', label: 'Armas' },
  { id: 'armor', label: 'Armaduras' },
  { id: 'shield', label: 'Escudos' },
  { id: 'ammo', label: 'Munição' },
  { id: 'gear', label: 'Equip.' },
  { id: 'tool', label: 'Ferramentas' },
  { id: 'consumable', label: 'Consum.' },
];

function EquippedSlotCard({
  label,
  slotIcon,
  item,
  combatLine,
  statLine,
  onUnequip,
}: {
  label: string;
  slotIcon: string;
  item?: InventoryItem;
  combatLine?: string;
  statLine?: string;
  onUnequip?: () => void;
}) {
  const def = item ? getItemDefinition(item.definitionId) : undefined;

  return (
    <article className={`equip-slot${item ? ' equip-slot--filled' : ''}`}>
      <div className="equip-slot__top">
        <span className="equip-slot__icon" aria-hidden>{item ? CATEGORY_ICONS[def?.category ?? 'gear'] : slotIcon}</span>
        <span className="equip-slot__label">{label}</span>
      </div>
      {item ? (
        <>
          <span className="equip-slot__name">{itemLabel(item)}</span>
          {combatLine && <span className="equip-slot__combat">{combatLine}</span>}
          {statLine && !combatLine && <span className="equip-slot__stat">{statLine}</span>}
          {onUnequip && (
            <button type="button" className="equip-slot__action" onClick={onUnequip}>
              Desequipar
            </button>
          )}
        </>
      ) : (
        <span className="equip-slot__empty">Vazio</span>
      )}
    </article>
  );
}

function CarriedItemRow({
  item,
  onEquip,
  onSell,
  onRemove,
}: {
  item: InventoryItem;
  onEquip?: () => void;
  onSell?: () => void;
  onRemove?: () => void;
}) {
  const def = getItemDefinition(item.definitionId);
  const stats = def ? buildItemStatLines(def).slice(0, 3) : [];

  return (
    <li className={`inventory-list__item inventory-list__item--${def?.category ?? 'custom'}`}>
      <div className="inventory-list__icon" aria-hidden>
        {def ? CATEGORY_ICONS[def.category] : '✦'}
      </div>
      <div className="inventory-list__info">
        <span className="inventory-list__name">
          {itemLabel(item)}
          {item.quantity > 1 && <span className="inventory-list__qty">×{item.quantity}</span>}
        </span>
        <span className="inventory-list__meta">{itemMetaShort(item)}</span>
        {stats.length > 0 && (
          <span className="inventory-list__stats">{stats.join(' · ')}</span>
        )}
      </div>
      <div className="inventory-list__actions">
        {onEquip && (
          <button type="button" className="inventory-list__btn inventory-list__btn--equip" onClick={onEquip}>
            Equipar
          </button>
        )}
        {onSell && (
          <button type="button" className="inventory-list__btn" onClick={onSell}>
            Vender
          </button>
        )}
        {onRemove && (
          <button type="button" className="inventory-list__btn inventory-list__btn--danger" onClick={onRemove}>
            Remover
          </button>
        )}
      </div>
    </li>
  );
}

export function InventorySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const [shopOpen, setShopOpen] = useState(false);
  const [customName, setCustomName] = useState('');
  const [filter, setFilter] = useState<ItemDefinition['category'] | 'all'>('all');
  const [search, setSearch] = useState('');

  const inventory = character.inventory ?? [];
  const mainHand = InventoryService.getEquipped(inventory, 'mainHand');
  const offHand = InventoryService.getEquipped(inventory, 'offHand');
  const armor = InventoryService.getEquipped(inventory, 'armor');
  const carried = inventory.filter((i) => !i.equipped);
  const totalWeight = InventoryService.totalWeight(inventory);

  const strength = useMemo(() => {
    const scores = CharacterCalculator.abilityScores(new Character(character));
    return scores.get('strength').value;
  }, [character]);
  const carryCapacity = strength * 15;

  const weaponAttacks = useMemo(
    () => AttackRollService.getEquippedWeaponAttacks(character),
    [character],
  );
  const attackByInstance = useMemo(
    () => new Map(weaponAttacks.map((a) => [a.instanceId, a])),
    [weaponAttacks],
  );

  const filteredCarried = useMemo(() => {
    const q = search.trim().toLowerCase();
    return carried.filter((item) => {
      const def = getItemDefinition(item.definitionId);
      if (filter !== 'all' && def?.category !== filter) return false;
      if (!q) return true;
      const label = itemLabel(item).toLowerCase();
      return label.includes(q) || def?.description?.toLowerCase().includes(q);
    });
  }, [carried, filter, search]);

  const groupedCarried = useMemo(() => {
    const groups = new Map<string, InventoryItem[]>();
    for (const item of filteredCarried) {
      const def = getItemDefinition(item.definitionId);
      const key = def?.category ?? 'custom';
      const list = groups.get(key) ?? [];
      list.push(item);
      groups.set(key, list);
    }
    const order: (ItemDefinition['category'] | 'custom')[] = [
      'weapon', 'armor', 'shield', 'ammo', 'tool', 'gear', 'consumable', 'treasure', 'custom',
    ];
    return order
      .filter((cat) => groups.has(cat))
      .map((cat) => ({ category: cat, items: groups.get(cat)! }));
  }, [filteredCarried]);

  const weightRatio = carryCapacity > 0 ? Math.min(totalWeight / carryCapacity, 1.5) : 0;
  const weightStatus =
    totalWeight > carryCapacity ? 'heavy' : totalWeight > carryCapacity * 0.66 ? 'warn' : 'ok';

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

  const slotCombat = (item?: InventoryItem) => {
    if (!item) return undefined;
    const roll = attackByInstance.get(item.instanceId);
    if (!roll) return undefined;
    return `${roll.attackFormula} · ${roll.damageFormula}`;
  };

  const slotStat = (item?: InventoryItem) => {
    if (!item) return undefined;
    const def = getItemDefinition(item.definitionId);
    if (!def) return undefined;
    return buildItemStatLines(def)[0];
  };

  return (
    <div className="inventory-panel inventory-panel--tab">
      <div className="inventory-panel__header">
        <div className="inventory-panel__summary">
          <h3 className="inventory-panel__title">Carga & equipamento</h3>
          <div className="inventory-panel__stats">
            <span>{inventory.length} itens</span>
            <span className="inventory-panel__stat-sep">·</span>
            <span className={`inventory-panel__weight inventory-panel__weight--${weightStatus}`}>
              {totalWeight} / {carryCapacity} lb
            </span>
          </div>
          <div className="inventory-panel__weight-bar" aria-hidden>
            <div
              className={`inventory-panel__weight-fill inventory-panel__weight-fill--${weightStatus}`}
              style={{ width: `${Math.min(weightRatio * 100, 100)}%` }}
            />
          </div>
        </div>
        <Button size="sm" color="warning" onClick={() => setShopOpen(true)} className="inventory-panel__shop-btn">
          Abrir loja
        </Button>
      </div>

      <div className="inventory-layout">
        <section className="inventory-layout__loadout">
          <h4 className="inventory-layout__heading">Equipado</h4>
          <div className="equip-slots equip-slots--enhanced">
            <EquippedSlotCard
              label="Mão principal"
              slotIcon="✋"
              item={mainHand}
              combatLine={slotCombat(mainHand)}
              statLine={slotStat(mainHand)}
              onUnequip={mainHand ? () => unequip(mainHand.instanceId) : undefined}
            />
            <EquippedSlotCard
              label="Mão secundária"
              slotIcon="🤚"
              item={offHand}
              combatLine={slotCombat(offHand)}
              statLine={slotStat(offHand)}
              onUnequip={offHand ? () => unequip(offHand.instanceId) : undefined}
            />
            <EquippedSlotCard
              label="Armadura"
              slotIcon="🛡"
              item={armor}
              statLine={slotStat(armor)}
              onUnequip={armor ? () => unequip(armor.instanceId) : undefined}
            />
          </div>
        </section>

        <section className="inventory-layout__bag">
          <div className="inventory-layout__bag-head">
            <h4 className="inventory-layout__heading">
              Mochila
              {carried.length > 0 && (
                <span className="inventory-layout__count">{filteredCarried.length}/{carried.length}</span>
              )}
            </h4>
            {carried.length > 0 && (
              <TextInput
                sizing="sm"
                color="gray"
                placeholder="Filtrar itens…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="field__input inventory-layout__search"
              />
            )}
          </div>

          {carried.length > 0 && (
            <div className="inventory-layout__filters">
              {CARRY_FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={`inventory-layout__filter${filter === f.id ? ' inventory-layout__filter--active' : ''}`}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                </button>
              ))}
            </div>
          )}

          {carried.length === 0 ? (
            <div className="inventory-panel__empty-state">
              <p>Mochila vazia.</p>
              <Button size="xs" color="warning" onClick={() => setShopOpen(true)}>
                Ir à loja
              </Button>
            </div>
          ) : filteredCarried.length === 0 ? (
            <p className="inventory-panel__empty">Nenhum item com esse filtro.</p>
          ) : (
            <div className="inventory-groups">
              {groupedCarried.map(({ category, items }) => (
                <div key={category} className="inventory-group">
                  <h5 className="inventory-group__title">
                    {category === 'custom' ? 'Personalizados' : CATEGORY_LABELS[category as ItemDefinition['category']]}
                    <span className="inventory-group__n">{items.length}</span>
                  </h5>
                  <ul className="inventory-list">
                    {items.map((item) => {
                      const def = getItemDefinition(item.definitionId);
                      const canEquip = Boolean(def?.equipSlot);
                      const canSell = def && itemCostInCopper(def) > 0;

                      return (
                        <CarriedItemRow
                          key={item.instanceId}
                          item={item}
                          onEquip={canEquip ? () => equip(item.instanceId) : undefined}
                          onSell={canSell ? () => sell(item.instanceId) : undefined}
                          onRemove={item.definitionId === 'custom' ? () => remove(item.instanceId) : undefined}
                        />
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <div className="inventory-custom">
        <TextInput
          sizing="sm"
          color="gray"
          placeholder="Item personalizado (tesouro, loot de aventura…)"
          value={customName}
          onChange={(e) => setCustomName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addCustom()}
          className="field__input"
        />
        <Button size="sm" color="light" onClick={addCustom} disabled={!customName.trim()}>
          Adicionar
        </Button>
      </div>

      <InventoryShopModal open={shopOpen} onClose={() => setShopOpen(false)} />
    </div>
  );
}
