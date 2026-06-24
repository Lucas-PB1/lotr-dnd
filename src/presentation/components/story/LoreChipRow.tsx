interface LoreChipRowProps {
  label?: string;
  options: { label: string; value: string }[];
  onPick: (value: string) => void;
  selectedValue?: string;
}

export function LoreChipRow({ label, options, onPick, selectedValue }: LoreChipRowProps) {
  if (options.length === 0) return null;

  return (
    <div className="lore-chip-row">
      {label && <span className="lore-chip-row__label">{label}</span>}
      <div className="lore-chip-row__track">
        {options.map((opt) => {
          const selected = selectedValue === opt.value;
          return (
            <button
              key={opt.label}
              type="button"
              className={`lore-chip-row__chip${selected ? ' lore-chip-row__chip--selected' : ''}`}
              title={opt.value}
              aria-pressed={selected}
              onClick={() => onPick(opt.value)}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
