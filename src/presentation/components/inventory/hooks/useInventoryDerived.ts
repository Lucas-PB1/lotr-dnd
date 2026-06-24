import { useMemo, useState } from 'react';
import { Character } from '../../../../domain/entities/Character';
import { AttackRollService } from '../../../../domain/services/AttackRollService';
import { CharacterCalculator } from '../../../../domain/services/CharacterCalculator';
import { InventoryService } from '../../../../domain/services/InventoryService';
import type { InventoryItem, ItemDefinition } from '../../../../domain/value-objects/Item';
import { getItemDefinition } from '../../../../shared/data/itemCatalog';
import { itemLabel } from '../inventoryItemDisplay';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export const CARRY_FILTERS: { id: ItemDefinition['category'] | 'all'; label: string }[] = [
  { id: 'all', label: 'Todos' },
  { id: 'weapon', label: 'Armas' },
  { id: 'armor', label: 'Armaduras' },
  { id: 'shield', label: 'Escudos' },
  { id: 'ammo', label: 'Munição' },
  { id: 'gear', label: 'Equip.' },
  { id: 'tool', label: 'Ferramentas' },
  { id: 'consumable', label: 'Consum.' },
];

export function useInventoryDerived() {
  const { character } = useCharacterSheet();
  const [filter, setFilter] = useState<ItemDefinition['category'] | 'all'>('all');
  const [search, setSearch] = useState('');
  const [sortAsc, setSortAsc] = useState(true);

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
    let list = carried.filter((item) => {
      const def = getItemDefinition(item.definitionId);
      if (filter !== 'all' && def?.category !== filter) return false;
      if (!q) return true;
      const label = itemLabel(item).toLowerCase();
      return label.includes(q) || def?.description?.toLowerCase().includes(q);
    });
    list = [...list].sort((a, b) => {
      const cmp = itemLabel(a).localeCompare(itemLabel(b), 'pt');
      return sortAsc ? cmp : -cmp;
    });
    return list;
  }, [carried, filter, search, sortAsc]);

  const weightRatio = carryCapacity > 0 ? Math.min(totalWeight / carryCapacity, 1.5) : 0;
  const weightStatus: 'ok' | 'warn' | 'heavy' =
    totalWeight > carryCapacity ? 'heavy' : totalWeight > carryCapacity * 0.66 ? 'warn' : 'ok';

  const slotCombat = (item?: InventoryItem) => {
    if (!item) return undefined;
    const roll = attackByInstance.get(item.instanceId);
    if (!roll) return undefined;
    return `${roll.attackFormula} · ${roll.damageFormula}`;
  };

  return {
    inventory,
    mainHand,
    offHand,
    armor,
    carried,
    filteredCarried,
    totalWeight,
    carryCapacity,
    weightRatio,
    weightStatus,
    filter,
    setFilter,
    search,
    setSearch,
    sortAsc,
    setSortAsc,
    toggleSort: () => setSortAsc((v) => !v),
    slotCombat,
    attackByInstance,
  };
}
