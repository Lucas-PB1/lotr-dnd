import type { CharacterProps } from '../entities/Character';
import type { AttackProps } from '../value-objects/CharacterValues';
import type { InventoryItem, ItemDefinition } from '../value-objects/Item';
import { createInventoryItem } from '../value-objects/Item';
import {
  getItemDefinition,
  itemCostInCopper,
} from '../../shared/data/itemCatalog';
import { inventoryToSummaryText } from '../../shared/data/startingInventoryBuilder';

export class InventoryService {
  static getEquipped(
    inventory: InventoryItem[],
    slot: 'mainHand' | 'offHand' | 'armor',
  ): InventoryItem | undefined {
    return inventory.find((item) => {
      if (!item.equipped) return false;
      const def = getItemDefinition(item.definitionId);
      return def?.equipSlot === slot;
    });
  }

  static equip(
    inventory: InventoryItem[],
    instanceId: string,
  ): InventoryItem[] {
    const target = inventory.find((i) => i.instanceId === instanceId);
    if (!target) return inventory;

    const def = getItemDefinition(target.definitionId);
    if (!def?.equipSlot) return inventory;

    return inventory.map((item) => {
      if (item.instanceId === instanceId) {
        return { ...item, equipped: true };
      }

      const itemDef = getItemDefinition(item.definitionId);
      if (!item.equipped || !itemDef?.equipSlot) return item;

      if (itemDef.equipSlot === def.equipSlot) {
        return { ...item, equipped: false };
      }

      if (def.twoHanded && itemDef.equipSlot === 'offHand') {
        return { ...item, equipped: false };
      }

      if (def.equipSlot === 'offHand' && itemDef.twoHanded) {
        return { ...item, equipped: false };
      }

      if (def.equipSlot === 'offHand' && itemDef.equipSlot === 'mainHand' && itemDef.twoHanded) {
        return { ...item, equipped: false };
      }

      if (def.equipSlot === 'mainHand' && def.twoHanded && itemDef.equipSlot === 'offHand') {
        return { ...item, equipped: false };
      }

      if (def.twoHanded && def.equipSlot === 'mainHand' && itemDef.equipSlot === 'offHand') {
        return { ...item, equipped: false };
      }

      return item;
    });
  }

  static unequip(inventory: InventoryItem[], instanceId: string): InventoryItem[] {
    return inventory.map((item) =>
      item.instanceId === instanceId ? { ...item, equipped: false } : item,
    );
  }

  static removeItem(inventory: InventoryItem[], instanceId: string, quantity = 1): InventoryItem[] {
    return inventory
      .map((item) => {
        if (item.instanceId !== instanceId) return item;
        const nextQty = item.quantity - quantity;
        return nextQty > 0 ? { ...item, quantity: nextQty, equipped: false } : null;
      })
      .filter((item): item is InventoryItem => item !== null);
  }

  static addItem(
    inventory: InventoryItem[],
    definitionId: string,
    quantity = 1,
  ): InventoryItem[] {
    const def = getItemDefinition(definitionId);
    if (!def) return inventory;

    const next = [...inventory];

    if (def.stackable) {
      const existing = next.find((i) => i.definitionId === definitionId && !i.equipped);
      if (existing) {
        return next.map((i) =>
          i.instanceId === existing.instanceId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
    }

    for (let i = 0; i < quantity; i++) {
      next.push(createInventoryItem(definitionId));
    }
    return next;
  }

  static canAfford(currency: CharacterProps['currency'], def: ItemDefinition, qty = 1): boolean {
    const totalCopper = itemCostInCopper(def) * qty;
    const available =
      currency.copper + currency.silver * 10 + currency.gold * 100;
    return available >= totalCopper;
  }

  static spendCurrency(
    currency: CharacterProps['currency'],
    copperAmount: number,
  ): CharacterProps['currency'] {
    let copper = currency.copper + currency.silver * 10 + currency.gold * 100;
    copper -= copperAmount;

    return {
      gold: Math.floor(copper / 100),
      silver: Math.floor((copper % 100) / 10),
      copper: copper % 10,
    };
  }

  static addCurrency(
    currency: CharacterProps['currency'],
    copperAmount: number,
  ): CharacterProps['currency'] {
    let total = currency.copper + currency.silver * 10 + currency.gold * 100;
    total += copperAmount;

    return {
      gold: Math.floor(total / 100),
      silver: Math.floor((total % 100) / 10),
      copper: total % 10,
    };
  }

  static buy(
    props: CharacterProps,
    definitionId: string,
    quantity = 1,
  ): Partial<CharacterProps> | null {
    const def = getItemDefinition(definitionId);
    if (!def) return null;

    const cost = itemCostInCopper(def) * quantity;
    if (cost <= 0) return null;
    if (!this.canAfford(props.currency, def, quantity)) return null;

    const inventory = this.addItem(props.inventory, definitionId, quantity);
    const currency = this.spendCurrency(props.currency, cost);

    return {
      inventory,
      currency,
      equipment: inventoryToSummaryText(inventory),
    };
  }

  static sell(
    props: CharacterProps,
    instanceId: string,
    quantity = 1,
  ): Partial<CharacterProps> | null {
    const item = props.inventory.find((i) => i.instanceId === instanceId);
    if (!item) return null;

    const def = getItemDefinition(item.definitionId);
    if (!def) return null;

    const sellQty = Math.min(quantity, item.quantity);
    const unitCost = itemCostInCopper(def);
    if (unitCost <= 0) return null;

    const sellValue = Math.floor((unitCost * sellQty) / 2);
    const inventory = this.removeItem(
      item.equipped ? this.unequip(props.inventory, instanceId) : props.inventory,
      instanceId,
      sellQty,
    );
    const currency = this.addCurrency(props.currency, sellValue);

    return {
      inventory,
      currency,
      equipment: inventoryToSummaryText(inventory),
    };
  }

  static applyEquip(
    props: CharacterProps,
    instanceId: string,
  ): Partial<CharacterProps> {
    const inventory = this.equip(props.inventory, instanceId);
    const attacks = this.syncAttacks(props, inventory);
    return {
      inventory,
      attacks,
      equipment: inventoryToSummaryText(inventory),
    };
  }

  static applyUnequip(
    props: CharacterProps,
    instanceId: string,
  ): Partial<CharacterProps> {
    const inventory = this.unequip(props.inventory, instanceId);
    return {
      inventory,
      equipment: inventoryToSummaryText(inventory),
    };
  }

  static syncAttacks(
    props: CharacterProps,
    inventory: InventoryItem[] = props.inventory,
  ): AttackProps[] {
    const weapons = inventory.filter((item) => {
      if (!item.equipped) return false;
      const def = getItemDefinition(item.definitionId);
      return def?.category === 'weapon';
    });

    const attacks = [...props.attacks];

    weapons.forEach((item, index) => {
      const def = getItemDefinition(item.definitionId);
      if (!def) return;

      const row = attacks[index] ?? {
        weapon: '',
        atkBonus: '',
        damage: '',
        range: '',
      };

      attacks[index] = {
        ...row,
        weapon: def.namePt,
        damage: def.damage ?? row.damage,
        range: def.range ?? row.range,
      };
    });

    return attacks;
  }

  static totalWeight(inventory: InventoryItem[]): number {
    return inventory.reduce((sum, item) => {
      const def = getItemDefinition(item.definitionId);
      return sum + (def?.weight ?? 0) * item.quantity;
    }, 0);
  }
}
