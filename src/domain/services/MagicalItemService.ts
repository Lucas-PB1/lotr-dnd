import type { CharacterProps } from '../entities/Character';
import type {
  MagicalEffect,
  MagicalItemDefinition,
  OwnedMagicalItem,
} from '../value-objects/MagicalItem';
import { createOwnedMagicalItem } from '../value-objects/MagicalItem';
import { getMagicalItemDefinition } from '../../shared/data/magicalItemCatalog';
import { getItemDefinition } from '../../shared/data/itemCatalog';

export interface MagicalCombatBonuses {
  acBonus: number;
  attackBonus: number;
  damageBonus: number;
  saveBonus: number;
}

export interface MagicalReminder {
  itemName: string;
  instanceId: string;
  text: string;
  kind: MagicalEffect['kind'];
}

function itemLabel(def: MagicalItemDefinition | undefined, owned: OwnedMagicalItem): string {
  if (owned.definitionId === 'custom-magical') return owned.notes ?? 'Item mágico';
  return def?.namePt ?? owned.definitionId;
}

function collectEffects(
  def: MagicalItemDefinition,
  owned: OwnedMagicalItem,
): MagicalEffect[] {
  const effects = [...def.effects];

  if (def.qualities?.length) {
    const activeIds = owned.activeQualityIds ?? def.qualities.map((q) => q.id);
    for (const q of def.qualities) {
      if (activeIds.includes(q.id)) {
        effects.push(...q.effects);
      }
    }
  }

  return effects;
}

function affectsWeaponInstance(
  props: CharacterProps,
  owned: OwnedMagicalItem,
  def: MagicalItemDefinition,
  instanceId: string,
): boolean {
  const inv = props.inventory?.find((i) => i.instanceId === instanceId);
  if (!inv?.equipped) return false;

  if (owned.linkedInventoryId === instanceId) return true;

  if (!owned.equipped) return false;

  const isWeaponLike =
    def.category === 'weapon' || def.tier === 'famous_weapon' || def.tier === 'reward';

  if (!isWeaponLike) return false;

  if (def.baseItemId) return inv.definitionId === def.baseItemId;
  return true;
}

function affectsArmor(props: CharacterProps, owned: OwnedMagicalItem, def: MagicalItemDefinition): boolean {
  const inventory = props.inventory ?? [];

  if (owned.linkedInventoryId) {
    const linked = inventory.find((i) => i.instanceId === owned.linkedInventoryId);
    if (!linked?.equipped) return false;
    const slot = getItemDefinition(linked.definitionId)?.equipSlot;
    return slot === 'armor' || slot === 'offHand';
  }

  if (!owned.equipped) return false;

  return (
    def.category === 'armor' ||
    def.category === 'shield' ||
    def.tier === 'famous_armour' ||
    def.tier === 'reward'
  );
}

export class MagicalItemService {
  static getActiveItems(props: CharacterProps): { owned: OwnedMagicalItem; def: MagicalItemDefinition }[] {
    const items = props.ownedMagicalItems ?? [];
    const result: { owned: OwnedMagicalItem; def: MagicalItemDefinition }[] = [];

    for (const owned of items) {
      if (!owned.identified) continue;
      const def = getMagicalItemDefinition(owned.definitionId);
      if (!def) continue;
      result.push({ owned, def });
    }

    return result;
  }

  static getEquippedBonuses(props: CharacterProps): MagicalCombatBonuses {
    const bonuses: MagicalCombatBonuses = {
      acBonus: 0,
      attackBonus: 0,
      damageBonus: 0,
      saveBonus: 0,
    };

    for (const { owned, def } of this.getActiveItems(props)) {
      const effects = collectEffects(def, owned);
      const armorApplies = affectsArmor(props, owned, def);

      for (const fx of effects) {
        if (fx.kind === 'ac_bonus' && armorApplies && fx.value) {
          bonuses.acBonus += fx.value;
        }
        if (fx.kind === 'save_bonus' && armorApplies && fx.value) {
          bonuses.saveBonus += fx.value;
        }
      }
    }

    return bonuses;
  }

  static getWeaponBonusesForInstance(
    props: CharacterProps,
    inventoryInstanceId: string,
  ): { attackBonus: number; damageBonus: number; saveBonus: number } {
    let attackBonus = 0;
    let damageBonus = 0;
    let saveBonus = 0;

    for (const { owned, def } of this.getActiveItems(props)) {
      if (!affectsWeaponInstance(props, owned, def, inventoryInstanceId)) continue;

      for (const fx of collectEffects(def, owned)) {
        if (fx.kind === 'attack_bonus' && fx.value) attackBonus += fx.value;
        if (fx.kind === 'damage_bonus' && fx.value) damageBonus += fx.value;
        if (fx.kind === 'save_bonus' && fx.value) saveBonus += fx.value;
      }
    }

    return { attackBonus, damageBonus, saveBonus };
  }

  static getReminders(props: CharacterProps): MagicalReminder[] {
    const reminders: MagicalReminder[] = [];

    for (const { owned, def } of this.getActiveItems(props)) {
      const name = itemLabel(def, owned);
      for (const fx of collectEffects(def, owned)) {
        if (
          fx.kind === 'narrative' ||
          fx.kind === 'blessing_die' ||
          fx.kind === 'magical_success'
        ) {
          reminders.push({
            itemName: name,
            instanceId: owned.instanceId,
            text: fx.textPt,
            kind: fx.kind,
          });
        }
      }
    }

    return reminders;
  }

  static addFromCatalog(
    props: CharacterProps,
    definitionId: string,
  ): CharacterProps {
    const def = getMagicalItemDefinition(definitionId);
    if (!def) return props;

    const owned = createOwnedMagicalItem(definitionId);
    if (def.qualities?.length) {
      owned.activeQualityIds = def.qualities.map((q) => q.id);
    }

    return {
      ...props,
      ownedMagicalItems: [...(props.ownedMagicalItems ?? []), owned],
    };
  }

  static removeItem(props: CharacterProps, instanceId: string): CharacterProps {
    return {
      ...props,
      ownedMagicalItems: (props.ownedMagicalItems ?? []).filter((i) => i.instanceId !== instanceId),
    };
  }

  static updateItem(
    props: CharacterProps,
    instanceId: string,
    patch: Partial<OwnedMagicalItem>,
  ): CharacterProps {
    return {
      ...props,
      ownedMagicalItems: (props.ownedMagicalItems ?? []).map((item) =>
        item.instanceId === instanceId ? { ...item, ...patch } : item,
      ),
    };
  }

  static toggleEquip(props: CharacterProps, instanceId: string): CharacterProps {
    const items = props.ownedMagicalItems ?? [];
    const target = items.find((i) => i.instanceId === instanceId);
    if (!target) return props;

    const def = getMagicalItemDefinition(target.definitionId);
    const nextEquipped = !target.equipped;

    return {
      ...props,
      ownedMagicalItems: items.map((item) => {
        if (item.instanceId === instanceId) {
          return { ...item, equipped: nextEquipped };
        }
        if (nextEquipped && def && item.equipped && item.definitionId === target.definitionId) {
          return { ...item, equipped: false };
        }
        return item;
      }),
    };
  }

  static getLinkableInventoryOptions(props: CharacterProps): { instanceId: string; label: string }[] {
    return (props.inventory ?? []).map((item) => {
      const def = getItemDefinition(item.definitionId);
      const name =
        item.definitionId === 'custom'
          ? (item.notes ?? 'Item')
          : (def?.namePt ?? item.definitionId);
      const slot = def?.equipSlot ? ` · ${def.equipSlot}` : '';
      return { instanceId: item.instanceId, label: `${name}${slot}` };
    });
  }
}
