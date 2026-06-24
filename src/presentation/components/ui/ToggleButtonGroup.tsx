import { Button, Label } from 'flowbite-react';

interface ToggleButtonGroupProps {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  max: number;
  onChange: (ids: string[]) => void;
  variant?: 'legacy' | 'stitch';
}

/** Grupo de botões toggle — substitui padrão repetido em SkillPicker / virtudes. */
export function ToggleButtonGroup({
  label,
  options,
  selected,
  max,
  onChange,
  variant = 'legacy',
}: ToggleButtonGroupProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  };

  if (variant === 'stitch') {
    return (
      <div className="toggle-group">
        <p className="toggle-group__label m-0">
          {label} ({selected.length}/{max})
        </p>
        <div className="toggle-group__chips">
          {options.map((opt) => {
            const isOn = selected.includes(opt.id);
            const disabled = !isOn && selected.length >= max;
            return (
              <button
                key={opt.id}
                type="button"
                className={`st-creation-chip${isOn ? ' st-creation-chip--on' : ''}`}
                disabled={disabled}
                onClick={() => toggle(opt.id)}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="toggle-group">
      <Label className="text-xs font-semibold uppercase text-amber-900/70">
        {label} ({selected.length}/{max})
      </Label>
      <div className="mt-1 flex flex-wrap gap-1">
        {options.map((opt) => {
          const isOn = selected.includes(opt.id);
          return (
            <Button
              key={opt.id}
              size="xs"
              color={isOn ? 'warning' : 'light'}
              onClick={() => toggle(opt.id)}
            >
              {opt.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
