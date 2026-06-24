import { InventoryService } from '../../../../domain/services/InventoryService';
import { createCustomInventoryItem } from '../../../../domain/value-objects/Item';
import { inventoryToSummaryText } from '../../../../shared/data/startingInventoryBuilder';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function useInventoryActions() {
  const { character, updateCharacter } = useCharacterSheet();
  const inventory = character.inventory ?? [];

  const equip = (instanceId: string) => {
    updateCharacter(InventoryService.applyEquip(character, instanceId));
  };

  const unequip = (instanceId: string) => {
    updateCharacter(InventoryService.applyUnequip(character, instanceId));
  };

  const useItem = (instanceId: string, quantity = 1) => {
    const result = InventoryService.applyUse(character, instanceId, quantity);
    if (result) updateCharacter(result);
    return Boolean(result);
  };

  const sell = (instanceId: string, quantity = 1) => {
    const result = InventoryService.sell(character, instanceId, quantity);
    if (result) updateCharacter(result);
    return Boolean(result);
  };

  const remove = (instanceId: string) => {
    const next = InventoryService.removeItem(inventory, instanceId);
    updateCharacter({ inventory: next, equipment: inventoryToSummaryText(next) });
  };

  const addCustom = (name: string) => {
    const trimmed = name.trim();
    if (!trimmed) return false;
    const next = [...inventory, createCustomInventoryItem(trimmed)];
    updateCharacter({ inventory: next, equipment: inventoryToSummaryText(next) });
    return true;
  };

  const updateCurrency = (partial: Partial<typeof character.currency>) => {
    updateCharacter({ currency: { ...character.currency, ...partial } });
  };

  return {
    equip,
    unequip,
    useItem,
    sell,
    remove,
    addCustom,
    updateCurrency,
    currency: character.currency,
  };
}
