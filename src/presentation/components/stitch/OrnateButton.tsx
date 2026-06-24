import type { ButtonHTMLAttributes, ReactNode } from 'react';

type OrnateButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export function OrnateButton({ children, className = '', ...rest }: OrnateButtonProps) {
  return (
    <button
      type="button"
      className={`w-full py-4 bg-[var(--color-st-primary)] text-[var(--color-st-on-primary)] font-st-display text-lg rounded-lg shadow-lg hover:brightness-110 active:scale-95 transition-all st-ornate-border ${className}`.trim()}
      {...rest}
    >
      {children}
    </button>
  );
}
