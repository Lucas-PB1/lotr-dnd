import { INVENTORY_UI } from '../../../../shared/constants/appLabels';
import { WALLET_COIN_ICONS } from '../../icons';
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
          icon={WALLET_COIN_ICONS.gold}
          label={INVENTORY_UI.goldLabel}
          value={currency.gold}
          onChange={(gold) => updateCurrency({ gold })}
        />
        <WalletChip
          icon={WALLET_COIN_ICONS.silver}
          label={INVENTORY_UI.silverLabel}
          value={currency.silver}
          onChange={(silver) => updateCurrency({ silver })}
        />
        <WalletChip
          icon={WALLET_COIN_ICONS.copper}
          label={INVENTORY_UI.copperLabel}
          value={currency.copper}
          onChange={(copper) => updateCurrency({ copper })}
        />
      </div>
    </header>
  );
}
