type BurdenBarProps = {
  label: string;
  current: number;
  max: number;
  unit?: string;
  status?: 'ok' | 'warn' | 'heavy';
};

export function BurdenBar({ label, current, max, unit = 'lb', status = 'ok' }: BurdenBarProps) {
  const ratio = max > 0 ? Math.min(current / max, 1) : 0;
  const fillClass =
    status === 'heavy' ? 'st-burden-bar__fill--heavy' : status === 'warn' ? 'st-burden-bar__fill--warn' : '';

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <span className="font-st-label text-[var(--color-st-on-surface-variant)]">{label}</span>
        <span className="text-[var(--color-st-secondary)]">
          {current} / {max} {unit}
        </span>
      </div>
      <div className="st-burden-bar" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={max}>
        <div className={`st-burden-bar__fill ${fillClass}`.trim()} style={{ width: `${ratio * 100}%` }} />
      </div>
    </div>
  );
}
