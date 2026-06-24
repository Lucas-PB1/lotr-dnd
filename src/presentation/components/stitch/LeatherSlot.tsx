import type { ButtonHTMLAttributes } from 'react';
import type { HeroIcon, IconPair } from '../icons';
import { StitchIconPair } from '../icons';

type LeatherSlotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: HeroIcon | IconPair;
  label: string;
  filled?: boolean;
  selected?: boolean;
  iconFilled?: boolean;
};

function resolveIconPair(icon: HeroIcon | IconPair): IconPair {
  return typeof icon === 'function' ? { outline: icon } : icon;
}

export function LeatherSlot({
  icon,
  label,
  filled,
  selected,
  iconFilled,
  className = '',
  ...rest
}: LeatherSlotProps) {
  const pair = resolveIconPair(icon);

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className={`st-leather-slot${filled ? ' st-leather-slot--filled' : ''}${selected ? ' st-leather-slot--selected' : ''} ${className}`.trim()}
        aria-label={label}
        {...rest}
      >
        <StitchIconPair
          pair={pair}
          solid={iconFilled || filled}
          size="2xl"
          className={filled ? undefined : 'text-[var(--color-st-outline)]'}
        />
      </button>
      <span className="font-st-label text-[var(--color-st-on-surface-variant)]">{label}</span>
    </div>
  );
}
