import { SHOP_UI } from '../../../../shared/constants/appLabels';
import { ParchmentCard, WalletChip } from '../../stitch';
import { formatWallet, walletTotalCopper } from '../../inventory/inventoryItemDisplay';
import { useShopActions } from '../hooks/useShopActions';

export function ShopPageHeader() {
  const { currency, updateCurrency } = useShopActions();
  const totalCopper = walletTotalCopper(currency);

  return (
    <header className="st-page-header st-shop-header">
      <div>
        <p className="st-page-header__eyebrow font-st-label">{SHOP_UI.pageSubtitle}</p>
        <h2 className="st-page-header__title font-st-headline">{SHOP_UI.pageTitle}</h2>
      </div>
      <ParchmentCard className="st-shop-wallet px-4 py-3 flex flex-wrap items-center gap-4">
        <div className="st-wallet-strip">
          <WalletChip
            icon="monetization_on"
            label="Ouro"
            value={currency.gold}
            onChange={(gold) => updateCurrency({ gold })}
          />
          <WalletChip
            icon="payments"
            label="Prata"
            value={currency.silver}
            onChange={(silver) => updateCurrency({ silver })}
          />
          <WalletChip
            icon="toll"
            label="Cobre"
            value={currency.copper}
            onChange={(copper) => updateCurrency({ copper })}
          />
        </div>
        <div className="st-shop-wallet__total hidden sm:block">
          <span className="font-st-label text-[var(--color-st-on-surface-variant)] block text-xs uppercase">
            {SHOP_UI.walletTotal}
          </span>
          <span className="font-st-body font-bold">{totalCopper} cobre</span>
          <span className="font-st-label text-[var(--color-st-on-surface-variant)] text-xs block">
            {formatWallet(currency)}
          </span>
        </div>
      </ParchmentCard>
    </header>
  );
}
