interface DisplayFieldProps {
  label: string;
  value: string | number | boolean | null | undefined;
  description?: string;
  className?: string;
  compact?: boolean;
}

function formatValue(value: string | number | boolean | null | undefined): string {
  if (value === null || value === undefined || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Sim' : 'Não';
  return String(value);
}

export function DisplayField({
  label,
  value,
  description,
  className = '',
  compact = false,
}: DisplayFieldProps) {
  return (
    <div
      className={`display-field ${compact ? 'display-field--compact' : ''} ${className}`}
      title={compact ? description : undefined}
    >
      <span className="display-field__label">{label}</span>
      {!compact && description && <span className="display-field__desc">{description}</span>}
      <span className="display-field__value">{formatValue(value)}</span>
    </div>
  );
}

interface DisplayTextProps {
  label: string;
  value: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

export function DisplayText({
  label,
  value,
  description,
  className = '',
  compact = false,
}: DisplayTextProps) {
  const text = value.trim() || '—';
  const isEmpty = text === '—';

  if (compact && isEmpty) return null;

  return (
    <div
      className={`display-text ${compact ? 'display-text--compact' : ''} ${className}`}
      title={compact ? description : undefined}
    >
      <span className="display-text__label">{label}</span>
      {!compact && description && <span className="display-text__desc">{description}</span>}
      <p className="display-text__value">{text}</p>
    </div>
  );
}

interface DisplayStatProps {
  label: string;
  value: string | number;
  description?: string;
  sublabel?: string;
  accent?: 'gold' | 'emerald' | 'slate';
  compact?: boolean;
}

export function DisplayStat({
  label,
  value,
  description,
  sublabel,
  accent = 'gold',
  compact = false,
}: DisplayStatProps) {
  return (
    <div
      className={`display-stat display-stat--${accent} ${compact ? 'display-stat--compact' : ''}`}
      title={description}
    >
      <span className="display-stat__label">{label}</span>
      {!compact && description && <span className="display-stat__desc">{description}</span>}
      <span className="display-stat__value">{value}</span>
      {sublabel && <span className="display-stat__sub">{sublabel}</span>}
    </div>
  );
}

interface DisplayChipProps {
  label: string;
  value: string | number;
  description?: string;
}

export function DisplayChip({ label, value, description }: DisplayChipProps) {
  const display = value === '' || value === null || value === undefined ? '—' : String(value);
  return (
    <div className="display-chip" title={description}>
      <span className="display-chip__label">{label}</span>
      <span className="display-chip__value">{display}</span>
    </div>
  );
}

interface DisplaySectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  icon?: string;
  collapsible?: boolean;
  defaultOpen?: boolean;
}

export function DisplaySection({
  title,
  description,
  children,
  className = '',
  icon,
  collapsible = false,
  defaultOpen = true,
}: DisplaySectionProps) {
  if (collapsible) {
    return (
      <details className={`display-section display-section--collapsible ${className}`} open={defaultOpen}>
        <summary className="display-section__header display-section__header--summary">
          {icon && <span className="display-section__icon" aria-hidden>{icon}</span>}
          <div>
            <h3 className="display-section__title">{title}</h3>
            {description && <p className="display-section__desc">{description}</p>}
          </div>
        </summary>
        <div className="display-section__body">{children}</div>
      </details>
    );
  }

  return (
    <section className={`display-section ${className}`}>
      <header className="display-section__header">
        {icon && <span className="display-section__icon" aria-hidden>{icon}</span>}
        <div>
          <h3 className="display-section__title">{title}</h3>
          {description && <p className="display-section__desc">{description}</p>}
        </div>
      </header>
      <div className="display-section__body">{children}</div>
    </section>
  );
}

interface MiniSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export function MiniSection({ title, description, children }: MiniSectionProps) {
  return (
    <div className="mini-section">
      <h4 className="mini-section__title">{title}</h4>
      {description && <p className="mini-section__desc">{description}</p>}
      {children}
    </div>
  );
}
