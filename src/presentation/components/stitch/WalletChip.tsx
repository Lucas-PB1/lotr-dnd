import type { HeroIcon } from '../icons';

type WalletChipProps = {
  icon: HeroIcon;
  label: string;
  value: number;
  onChange?: (value: number) => void;
};

export function WalletChip({ icon, label, value, onChange }: WalletChipProps) {
  const Icon = icon;

  return (
    <div className="st-wallet-chip st-parchment">
      <Icon className="w-5 h-5 text-[var(--color-st-tertiary)] shrink-0" aria-hidden />
      <div>
        <p className="font-st-label text-[var(--color-st-on-surface-variant)] m-0 leading-tight">{label}</p>
        {onChange ? (
          <input
            type="number"
            min={0}
            className="font-st-title m-0 p-0 bg-transparent border-none text-[var(--color-st-on-surface)] w-16 focus:outline-none"
            value={value}
            onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
            aria-label={label}
          />
        ) : (
          <p className="font-st-title m-0 leading-tight">{value}</p>
        )}
      </div>
    </div>
  );
}
