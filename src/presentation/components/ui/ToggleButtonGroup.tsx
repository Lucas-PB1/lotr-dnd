import { Button, Label } from 'flowbite-react';

interface ToggleButtonGroupProps {
  label: string;
  options: { id: string; label: string }[];
  selected: string[];
  max: number;
  onChange: (ids: string[]) => void;
}

/** Grupo de botões toggle — substitui padrão repetido em SkillPicker / virtudes. */
export function ToggleButtonGroup({
  label,
  options,
  selected,
  max,
  onChange,
}: ToggleButtonGroupProps) {
  const toggle = (id: string) => {
    if (selected.includes(id)) {
      onChange(selected.filter((s) => s !== id));
    } else if (selected.length < max) {
      onChange([...selected, id]);
    }
  };

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
