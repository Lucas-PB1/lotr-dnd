import { useEffect, useMemo, useState } from 'react';
import { getItemDefinition, itemCostInCopper } from '../../../../shared/data/itemCatalog';
import { useInventoryActions } from '../hooks/useInventoryActions';
import { useInventoryDerived } from '../hooks/useInventoryDerived';
import { formatWallet, walletTotalCopper } from '../inventoryItemDisplay';
import { InventoryEquipmentGrid } from './InventoryEquipmentGrid';
import { InventoryItemDetail } from './InventoryItemDetail';
import { InventoryItemDrawer } from './InventoryItemDrawer';
import { InventoryLedgerList } from './InventoryLedgerList';
import { InventoryPageHeader } from './InventoryPageHeader';
import { InventoryQuickActions, InventoryTreasuryCard } from './InventoryQuickActions';

export function InventoryStitchView() {
  const [selectedItemId, setSelectedItemId] = useState<string | undefined>();

  const derived = useInventoryDerived();
  const { equip, unequip, useItem, sell, remove, addCustom, currency } = useInventoryActions();

  const selectedItem = useMemo(() => {
    if (!selectedItemId) return undefined;
    return derived.inventory.find((i) => i.instanceId === selectedItemId);
  }, [derived.inventory, selectedItemId]);

  const selectedCombatLine = selectedItem ? derived.slotCombat(selectedItem) : undefined;

  useEffect(() => {
    if (selectedItemId && !derived.inventory.some((i) => i.instanceId === selectedItemId)) {
      setSelectedItemId(undefined);
    }
  }, [derived.inventory, selectedItemId]);

  const totalValueLabel = useMemo(() => {
    let copper = walletTotalCopper(currency);
    for (const item of derived.inventory) {
      const def = getItemDefinition(item.definitionId);
      if (def) copper += itemCostInCopper(def) * item.quantity;
    }
    const gold = Math.floor(copper / 100);
    const silver = Math.floor((copper % 100) / 10);
    const rest = copper % 10;
    return formatWallet({ gold, silver, copper: rest });
  }, [derived.inventory, currency]);

  return (
    <div className="space-y-[var(--spacing-st-gutter)]">
      <InventoryPageHeader />

      <div className="st-inventory-bento">
        <div className="st-inventory-bento__equip">
          <InventoryEquipmentGrid
            mainHand={derived.mainHand}
            offHand={derived.offHand}
            armor={derived.armor}
            totalWeight={derived.totalWeight}
            carryCapacity={derived.carryCapacity}
            weightStatus={derived.weightStatus}
            selectedItemId={selectedItemId}
            onSelectItem={setSelectedItemId}
          />
        </div>

        <div className="st-inventory-bento__bag space-y-[var(--spacing-st-card-gap)]">
          <InventoryLedgerList
            items={derived.filteredCarried}
            carriedCount={derived.carried.length}
            filter={derived.filter}
            search={derived.search}
            selectedItemId={selectedItemId}
            onFilterChange={derived.setFilter}
            onSearchChange={derived.setSearch}
            onSelectItem={setSelectedItemId}
            onEquip={equip}
            onUse={(id) => useItem(id, 1)}
            onSell={(id) => sell(id, 1)}
            onRemove={remove}
            totalValueLabel={totalValueLabel}
            onAddCustom={addCustom}
          />
          <InventoryQuickActions onSort={derived.toggleSort} />
        </div>
      </div>

      <div className="st-inventory-bento st-inventory-bento--detail-desktop">
        <div className="st-inventory-bento__detail">
          <InventoryItemDetail
            item={selectedItem}
            combatLine={selectedCombatLine}
            onEquip={equip}
            onUnequip={unequip}
            onUse={useItem}
            onSell={sell}
            onRemove={remove}
          />
        </div>
        <div className="st-inventory-bento__treasury">
          <InventoryTreasuryCard />
        </div>
      </div>

      <InventoryItemDrawer
        open={Boolean(selectedItem)}
        item={selectedItem}
        combatLine={selectedCombatLine}
        onClose={() => setSelectedItemId(undefined)}
        onEquip={equip}
        onUnequip={unequip}
        onUse={useItem}
        onSell={sell}
        onRemove={remove}
      />
    </div>
  );
}
