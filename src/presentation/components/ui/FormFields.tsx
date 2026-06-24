import {
  Badge,
  Button,
  Card,
  Checkbox,
  Label,
  Textarea,
  TextInput,
} from 'flowbite-react';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
}

export function TextField({ label, value, onChange, className = '', placeholder }: TextFieldProps) {
  return (
    <div className={className}>
      <Label className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
        {label}
      </Label>
      <TextInput
        sizing="sm"
        color="gray"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/60"
      />
    </div>
  );
}

interface NumberFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  className?: string;
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  className = '',
}: NumberFieldProps) {
  return (
    <div className={className}>
      <Label className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
        {label}
      </Label>
      <TextInput
        type="number"
        sizing="sm"
        color="gray"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="bg-white/60 text-center"
      />
    </div>
  );
}

interface TextAreaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  rows?: number;
  className?: string;
}

export function TextArea({ label, value, onChange, rows = 4, className = '' }: TextAreaProps) {
  return (
    <div className={className}>
      <Label className="mb-1 text-xs font-semibold uppercase tracking-wide text-amber-900/70">
        {label}
      </Label>
      <Textarea
        rows={rows}
        color="gray"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white/60"
      />
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export function CheckboxField({ label, checked, onChange }: CheckboxFieldProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        color="warning"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <Label className="text-sm text-amber-950">{label}</Label>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  sublabel?: string;
  onChange?: (value: number) => void;
  editable?: boolean;
}

export function StatBox({ label, value, sublabel, onChange, editable }: StatBoxProps) {
  return (
    <Card className="min-w-20 border-amber-300/60 bg-white/40 p-2 shadow-none">
      <p className="text-center text-[0.6rem] font-bold uppercase text-amber-900/70">{label}</p>
      {editable && onChange ? (
        <TextInput
          type="number"
          sizing="sm"
          color="gray"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="mt-1 bg-white/80 text-center font-bold"
        />
      ) : (
        <p className="text-center text-lg font-bold text-amber-950">{value}</p>
      )}
      {sublabel && <p className="text-center text-xs text-amber-900/60">{sublabel}</p>}
    </Card>
  );
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ title, children, className = '' }: SectionProps) {
  return (
    <section className={`mb-5 ${className}`}>
      <h2 className="mb-3 border-b border-amber-400/50 pb-1 font-[family-name:var(--font-display)] text-sm font-bold uppercase tracking-widest text-amber-800">
        {title}
      </h2>
      {children}
    </section>
  );
}

export { Badge, Button, Card };
