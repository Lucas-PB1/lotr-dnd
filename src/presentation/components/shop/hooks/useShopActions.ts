import { InventoryService } from '../../../../domain/services/InventoryService';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function useShopActions() {
  const { character, updateCharacter } = useCharacterSheet();

  const buy = (definitionId: string, quantity = 1) => {
    const result = InventoryService.buy(character, definitionId, quantity);
    if (result) updateCharacter(result);
    return Boolean(result);
  };

  const receive = (definitionId: string, quantity = 1) => {
    const result = InventoryService.grantItem(character, definitionId, quantity);
    if (result) updateCharacter(result);
    return Boolean(result);
  };

  const updateCurrency = (partial: Partial<typeof character.currency>) => {
    updateCharacter({ currency: { ...character.currency, ...partial } });
  };

  return {
    currency: character.currency,
    inventory: character.inventory ?? [],
    buy,
    receive,
    updateCurrency,
  };
}
