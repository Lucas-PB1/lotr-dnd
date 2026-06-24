import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { StitchIcon, UI_ICONS } from '../../icons';
import { useSheetNavigation } from '../../../context/SheetNavigationContext';
import { ParchmentCard } from '../../stitch';
import { formatWallet } from '../inventoryItemDisplay';
import { useInventoryActions } from '../hooks/useInventoryActions';

type InventoryQuickActionsProps = {
  onSort: () => void;
};

export function InventoryQuickActions({ onSort }: InventoryQuickActionsProps) {
  const { goToTab } = useSheetNavigation();

  return (
    <div className="grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={() => goToTab('shop')}
        className="st-parchment px-6 py-4 rounded-lg border border-[var(--color-st-outline-variant)] flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all"
      >
        <StitchIcon icon={UI_ICONS.shop} size="md" />
        <span className="font-st-label font-bold">{INVENTORY_UI.goToMarket}</span>
      </button>
      <button
        type="button"
        onClick={onSort}
        className="st-parchment px-6 py-4 rounded-lg border border-[var(--color-st-outline-variant)] flex items-center justify-center gap-3 hover:brightness-110 active:scale-95 transition-all"
      >
        <StitchIcon icon={UI_ICONS.sort} size="md" />
        <span className="font-st-label font-bold">{INVENTORY_UI.sortInventory}</span>
      </button>
    </div>
  );
}

export function InventoryTreasuryCard() {
  const { currency } = useInventoryActions();
  const summary = formatWallet(currency);

  return (
    <ParchmentCard className="p-6 flex flex-col justify-center items-center text-center h-full">
      <StitchIcon icon={UI_ICONS.wallet} size="2xl" className="text-[var(--color-st-tertiary)] mb-2" />
      <h4 className="font-st-label uppercase text-[var(--color-st-on-surface-variant)] mb-1 m-0">
        {INVENTORY_UI.treasuryOverview}
      </h4>
      <p className="font-st-headline mb-4 m-0 text-lg">{summary}</p>
      <p className="font-st-label text-[var(--color-st-on-surface-variant)] m-0">{INVENTORY_UI.treasuryHint}</p>
    </ParchmentCard>
  );
}
