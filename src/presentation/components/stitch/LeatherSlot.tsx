import type { ButtonHTMLAttributes } from 'react';

type LeatherSlotProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: string;
  label: string;
  filled?: boolean;
  selected?: boolean;
  iconFilled?: boolean;
};

export function LeatherSlot({
  icon,
  label,
  filled,
  selected,
  iconFilled,
  className = '',
  ...rest
}: LeatherSlotProps) {
  return (
    <div className="flex flex-col items-center gap-2">
      <button
        type="button"
        className={`st-leather-slot${filled ? ' st-leather-slot--filled' : ''}${selected ? ' st-leather-slot--selected' : ''} ${className}`.trim()}
        aria-label={label}
        {...rest}
      >
        <span
          className={`material-symbols-outlined text-4xl${iconFilled ? ' material-symbols-outlined--filled' : ''}`}
          style={{ color: filled ? undefined : 'var(--color-st-outline)' }}
        >
          {icon}
        </span>
      </button>
      <span className="font-st-label text-[var(--color-st-on-surface-variant)]">{label}</span>
    </div>
  );
}
