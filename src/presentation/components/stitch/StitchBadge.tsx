import type { ReactNode } from 'react';

type StitchBadgeProps = {
  variant?: 'primary' | 'secondary' | 'tertiary';
  children: ReactNode;
};

export function StitchBadge({ variant = 'secondary', children }: StitchBadgeProps) {
  return <span className={`st-badge st-badge--${variant}`}>{children}</span>;
}
