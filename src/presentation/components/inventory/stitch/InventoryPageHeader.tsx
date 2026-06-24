import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { WalletChip } from '../../stitch';
import { useInventoryActions } from '../hooks/useInventoryActions';

export function InventoryPageHeader() {
  const { currency, updateCurrency } = useInventoryActions();

  return (
    <header className="st-page-header">
      <div>
        <p className="st-page-header__eyebrow font-st-label">{INVENTORY_UI.pageEyebrow}</p>
        <h2 className="st-page-header__title font-st-headline">{INVENTORY_UI.pageTitle}</h2>
      </div>
      <div className="st-wallet-strip">
        <WalletChip
          icon="monetization_on"
          label={INVENTORY_UI.goldLabel}
          value={currency.gold}
          onChange={(gold) => updateCurrency({ gold })}
        />
        <WalletChip
          icon="payments"
          label={INVENTORY_UI.silverLabel}
          value={currency.silver}
          onChange={(silver) => updateCurrency({ silver })}
        />
        <WalletChip
          icon="toll"
          label={INVENTORY_UI.copperLabel}
          value={currency.copper}
          onChange={(copper) => updateCurrency({ copper })}
        />
      </div>
    </header>
  );
}
