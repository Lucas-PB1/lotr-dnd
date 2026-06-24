import type { SelectHTMLAttributes } from 'react';

type CreationSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

/** Select da criação — usa apenas classes Stitch (sem `creation-select` legado). */
export function CreationSelect({ className = '', children, ...props }: CreationSelectProps) {
  return (
    <select {...props} className={`st-creation-select ${className}`.trim()}>
      {children}
    </select>
  );
}
