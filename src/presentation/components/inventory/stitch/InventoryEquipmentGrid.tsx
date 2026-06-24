import type { InventoryItem } from '../../../../domain/value-objects/Item';
import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { getItemDefinition } from '../../../../shared/data/itemCatalog';
import { EQUIPMENT_SLOT_ICONS } from '../../icons';
import { StitchIconPair } from '../../icons';
import { BurdenBar, ParchmentCard } from '../../stitch';
import { TapScale } from '../../stitch/motion/TapScale';
import { itemLabel } from '../inventoryItemDisplay';
import type { IconPair } from '../../icons';

type SlotConfig = {
  id: string;
  label: string;
  icon: IconPair;
  item?: InventoryItem;
  onSelect?: () => void;
  selected?: boolean;
};

type InventoryEquipmentGridProps = {
  mainHand?: InventoryItem;
  offHand?: InventoryItem;
  armor?: InventoryItem;
  totalWeight: number;
  carryCapacity: number;
  weightStatus: 'ok' | 'warn' | 'heavy';
  selectedItemId?: string;
  onSelectItem: (instanceId: string) => void;
};

function EquipmentSlot({ label, icon, item, onSelect, selected }: SlotConfig) {
  const filled = Boolean(item);
  const def = item ? getItemDefinition(item.definitionId) : undefined;

  return (
    <div className="flex flex-col items-center gap-2">
      <TapScale
        type="button"
        className={`st-leather-slot${filled ? ' st-leather-slot--filled' : ''}${selected ? ' st-leather-slot--selected' : ''}`}
        aria-label={item ? itemLabel(item) : label}
        onClick={() => item && onSelect?.()}
      >
        <StitchIconPair
          pair={icon}
          solid={filled}
          size="2xl"
          className={filled ? undefined : 'text-[var(--color-st-outline)]'}
        />
      </TapScale>
      <span className="font-st-label text-[var(--color-st-on-surface-variant)] uppercase text-center">
        {label}
      </span>
      {item && (
        <span className="text-xs text-[var(--color-st-secondary)] text-center max-w-[5.5rem] truncate">
          {itemLabel(item)}
        </span>
      )}
      {def?.damage && (
        <span className="text-[0.65rem] text-[var(--color-st-on-surface-variant)]">{def.damage}</span>
      )}
    </div>
  );
}

export function InventoryEquipmentGrid({
  mainHand,
  offHand,
  armor,
  totalWeight,
  carryCapacity,
  weightStatus,
  selectedItemId,
  onSelectItem,
}: InventoryEquipmentGridProps) {
  const slots: SlotConfig[] = [
    {
      id: 'main',
      label: INVENTORY_UI.slotMainHand,
      icon: EQUIPMENT_SLOT_ICONS.mainHand,
      item: mainHand,
      selected: mainHand?.instanceId === selectedItemId,
      onSelect: mainHand ? () => onSelectItem(mainHand.instanceId) : undefined,
    },
    {
      id: 'off',
      label: INVENTORY_UI.slotOffHand,
      icon: EQUIPMENT_SLOT_ICONS.offHand,
      item: offHand,
      selected: offHand?.instanceId === selectedItemId,
      onSelect: offHand ? () => onSelectItem(offHand.instanceId) : undefined,
    },
    {
      id: 'armor',
      label: INVENTORY_UI.slotArmor,
      icon: EQUIPMENT_SLOT_ICONS.armor,
      item: armor,
      selected: armor?.instanceId === selectedItemId,
      onSelect: armor ? () => onSelectItem(armor.instanceId) : undefined,
    },
  ];

  return (
    <ParchmentCard accentTop className="p-4 sm:p-6 h-full">
      <h3 className="font-st-title text-center mb-4 sm:mb-8 uppercase tracking-widest text-[var(--color-st-on-surface)] text-base sm:text-lg">
        {INVENTORY_UI.wornEquipment}
      </h3>
      <div className="grid grid-cols-3 gap-4 sm:gap-8 justify-items-center">
        {slots.map((slot) => (
          <EquipmentSlot key={slot.id} {...slot} />
        ))}
      </div>
      <div className="mt-12">
        <BurdenBar
          label={INVENTORY_UI.loadBurden}
          current={totalWeight}
          max={carryCapacity}
          status={weightStatus}
        />
      </div>
    </ParchmentCard>
  );
}
