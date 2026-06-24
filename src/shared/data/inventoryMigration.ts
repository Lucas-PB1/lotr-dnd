import type { CharacterProps } from '../../domain/entities/Character';
import type { InventoryItem } from '../../domain/value-objects/Item';
import { createInventoryItem } from '../../domain/value-objects/Item';
import {
  buildStartingInventory,
  inventoryToSummaryText,
} from './startingInventoryBuilder';
import { migrateCreationChoices } from './rewardSlotUtils';

/** Garante inventário estruturado em personagens antigos. */
export function migrateCharacterInventory(props: CharacterProps): CharacterProps {
  if (props.inventory?.length) {
    return {
      ...props,
      equipment: props.equipment || inventoryToSummaryText(props.inventory),
    };
  }

  const choices = migrateCreationChoices(props.creationChoices);

  if (choices.cultureId || choices.callingId) {
    const inventory = buildStartingInventory(
      choices.cultureId,
      choices.callingId,
      choices.equipmentOptions ?? {},
      choices.scholarToolChoices ?? [],
    );

    return {
      ...props,
      inventory,
      equipment: inventoryToSummaryText(inventory),
    };
  }

  return { ...props, inventory: [] };
}

/** Item livre criado pelo jogador */
export function createCustomInventoryItem(namePt: string): InventoryItem {
  return {
    ...createInventoryItem('custom'),
    notes: namePt.trim(),
  };
}
