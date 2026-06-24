import type { HTMLAttributes, ReactNode } from 'react';

type LedgerRowProps = HTMLAttributes<HTMLDivElement> & {
  icon?: string;
  iconFilled?: boolean;
  iconClassName?: string;
  label: ReactNode;
  trailing?: ReactNode;
  actions?: ReactNode;
  selected?: boolean;
};

export function LedgerRow({
  icon = 'circle',
  iconFilled,
  iconClassName = 'text-[var(--color-st-secondary)]',
  label,
  trailing,
  actions,
  selected,
  className = '',
  onClick,
  ...rest
}: LedgerRowProps) {
  return (
    <div
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={`st-ledger-row${selected ? ' st-ledger-row--selected' : ''} ${className}`.trim()}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick(e as unknown as React.MouseEvent<HTMLDivElement>);
              }
            }
          : undefined
      }
      {...rest}
    >
      <div className={`w-8 h-8 flex items-center justify-center shrink-0 ${iconClassName}`}>
        <span
          className={`material-symbols-outlined text-sm${iconFilled ? ' material-symbols-outlined--filled' : ''}`}
        >
          {icon}
        </span>
      </div>
      <span className="font-st-body text-base shrink-0">{label}</span>
      <span className="st-dotted-leader" aria-hidden />
      {trailing && <span className="font-st-label text-[var(--color-st-on-surface-variant)] shrink-0">{trailing}</span>}
      {actions && <div className="st-ledger-row__actions shrink-0">{actions}</div>}
    </div>
  );
}
