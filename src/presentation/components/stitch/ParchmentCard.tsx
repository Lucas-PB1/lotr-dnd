import type { HTMLAttributes, ReactNode } from 'react';

type ParchmentCardProps = HTMLAttributes<HTMLDivElement> & {
  accentTop?: boolean;
  children: ReactNode;
};

export function ParchmentCard({ accentTop, className = '', children, ...rest }: ParchmentCardProps) {
  return (
    <div
      className={`st-parchment${accentTop ? ' st-parchment--accent-top' : ''} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}
