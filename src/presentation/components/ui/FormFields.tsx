import { Checkbox, Label, Textarea, TextInput } from 'flowbite-react';

interface ReadOnlyFieldProps {
  label: string;
  value: string | number;
  description?: string;
  className?: string;
  hint?: string;
}

export function ReadOnlyField({
  label,
  value,
  description,
  className = '',
  hint = 'Definido na criação',
}: ReadOnlyFieldProps) {
  const display = value === '' || value === null || value === undefined ? '—' : String(value);
  return (
    <div className={`field field--readonly ${className}`} title={description}>
      <Label className="field__label">{label}</Label>
      {description && <span className="field__desc">{description}</span>}
      <div className="field__readonly">
        <span className="field__readonly-value">{display}</span>
        <span className="field__readonly-badge">{hint}</span>
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  placeholder?: string;
  description?: string;
  compact?: boolean;
}

export function TextField({
  label,
  value,
  onChange,
  className = '',
  placeholder,
  description,
  compact = false,
}: TextFieldProps) {
  return (
    <div className={`field ${compact ? 'field--compact' : ''} ${className}`} title={compact ? description : undefined}>
      <Label className="field__label">{label}</Label>
      {!compact && description && <span className="field__desc">{description}</span>}
      <TextInput
        sizing="sm"
        color="gray"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="field__input"
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
  description?: string;
  compact?: boolean;
}

export function NumberField({
  label,
  value,
  onChange,
  min,
  max,
  className = '',
  description,
  compact = false,
}: NumberFieldProps) {
  return (
    <div className={`field ${compact ? 'field--compact' : ''} ${className}`} title={compact ? description : undefined}>
      <Label className="field__label">{label}</Label>
      {!compact && description && <span className="field__desc">{description}</span>}
      <TextInput
        type="number"
        sizing="sm"
        color="gray"
        value={value}
        min={min}
        max={max}
        onChange={(e) => onChange(Number(e.target.value) || 0)}
        className="field__input field__input--number"
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
  description?: string;
  hint?: string;
}

export function TextArea({
  label,
  value,
  onChange,
  rows = 4,
  className = '',
  description,
  hint,
}: TextAreaProps) {
  return (
    <div className={`field field--textarea ${className}`}>
      {label && <Label className="field__label">{label}</Label>}
      {description && <span className="field__desc">{description}</span>}
      <Textarea
        rows={rows}
        color="gray"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field__input field__input--textarea"
      />
      {hint && <span className="field__hint">{hint}</span>}
    </div>
  );
}

interface CheckboxFieldProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  description?: string;
  compact?: boolean;
}

export function CheckboxField({ label, checked, onChange, description, compact = false }: CheckboxFieldProps) {
  return (
    <div className={`checkbox-field ${compact ? 'checkbox-field--compact' : ''}`} title={compact ? description : undefined}>
      <Checkbox color="warning" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <div className="checkbox-field__text">
        <Label className="checkbox-field__label">{label}</Label>
        {!compact && description && <span className="field__desc">{description}</span>}
      </div>
    </div>
  );
}

interface StatBoxProps {
  label: string;
  value: string | number;
  sublabel?: string;
  description?: string;
  onChange?: (value: number) => void;
  editable?: boolean;
  accent?: 'gold' | 'emerald' | 'slate';
  compact?: boolean;
}

export function StatBox({
  label,
  value,
  sublabel,
  description,
  onChange,
  editable,
  accent = 'gold',
  compact = false,
}: StatBoxProps) {
  return (
    <div
      className={`stat-box stat-box--${accent} ${compact ? 'stat-box--compact' : ''}`}
      title={compact ? description : description}
    >
      <span className="stat-box__label">{label}</span>
      {!compact && description && <span className="stat-box__desc">{description}</span>}
      {editable && onChange ? (
        <TextInput
          type="number"
          sizing="sm"
          color="gray"
          value={value}
          onChange={(e) => onChange(Number(e.target.value) || 0)}
          className="stat-box__input field__input"
        />
      ) : (
        <span className="stat-box__value">{value}</span>
      )}
      {sublabel && <span className="stat-box__sub">{sublabel}</span>}
    </div>
  );
}

interface SectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
}

export function Section({ title, description, children, className = '', icon }: SectionProps) {
  return (
    <section className={`sheet-section ${className}`}>
      <header className="sheet-section__header">
        {icon && <span className="sheet-section__icon" aria-hidden>{icon}</span>}
        <div>
          <h2 className="sheet-section__title">{title}</h2>
          {description && <p className="sheet-section__desc">{description}</p>}
        </div>
      </header>
      <div className="sheet-section__body">{children}</div>
    </section>
  );
}

export { Badge, Button, Card } from 'flowbite-react';
