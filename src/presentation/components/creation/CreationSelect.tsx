import type { SelectHTMLAttributes } from 'react';

type CreationSelectProps = SelectHTMLAttributes<HTMLSelectElement>;

export function CreationSelect({ className = '', children, ...props }: CreationSelectProps) {
  return (
    <select {...props} className={`creation-select field__input ${className}`.trim()}>
      {children}
    </select>
  );
}
