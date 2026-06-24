interface LoreChipRowProps {
  label?: string;
  options: { label: string; value: string }[];
  onPick: (value: string) => void;
}

export function LoreChipRow({ label, options, onPick }: LoreChipRowProps) {
  if (options.length === 0) return null;

  return (
    <div className="lore-chip-row">
      {label && <span className="lore-chip-row__label">{label}</span>}
      <div className="lore-chip-row__track">
        {options.map((opt) => (
          <button
            key={opt.label}
            type="button"
            className="lore-chip-row__chip"
            title={opt.value}
            onClick={() => onPick(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}
