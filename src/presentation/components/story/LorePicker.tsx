import { useEffect, useState } from 'react';

export interface LoreOption {
  label: string;
  value: string;
}

export interface LoreGroup {
  id: string;
  icon: string;
  title: string;
  subtitle?: string;
  options: LoreOption[];
  target?: 'backstory' | 'treasure' | 'patrons' | 'investment';
}

interface LorePickerProps {
  groups: LoreGroup[];
  onPick: (value: string, target: LoreGroup['target']) => void;
  defaultTabId?: string;
  title?: string;
}

function previewText(value: string, max = 72): string {
  if (value.length <= max) return value;
  return `${value.slice(0, max).trim()}…`;
}

export function LorePicker({
  groups,
  onPick,
  defaultTabId,
  title = 'Inspirações',
}: LorePickerProps) {
  const [tabId, setTabId] = useState(defaultTabId ?? groups[0]?.id ?? '');
  const [pickedKey, setPickedKey] = useState<string | null>(null);

  useEffect(() => {
    if (!groups.some((g) => g.id === tabId)) {
      setTabId(groups[0]?.id ?? '');
    }
  }, [groups, tabId]);

  if (groups.length === 0) return null;

  const active = groups.find((g) => g.id === tabId) ?? groups[0];

  const handlePick = (opt: LoreOption, group: LoreGroup) => {
    onPick(opt.value, group.target);
    setPickedKey(`${group.id}:${opt.label}`);
    window.setTimeout(() => setPickedKey(null), 500);
  };

  return (
    <div className="lore-inspire" role="region" aria-label={title}>
      <header className="lore-inspire__head">
        <h4 className="lore-inspire__title">{title}</h4>
        <span className="lore-inspire__hint">Toque para inserir</span>
      </header>

      <div className="segmented-control segmented-control--scroll" role="tablist">
        {groups.map((group) => (
          <button
            key={group.id}
            type="button"
            role="tab"
            aria-selected={tabId === group.id}
            className={`segmented-control__btn segmented-control__btn--icon${tabId === group.id ? ' segmented-control__btn--active' : ''}`}
            onClick={() => setTabId(group.id)}
          >
            <span aria-hidden>{group.icon}</span>
            {group.title}
          </button>
        ))}
      </div>

      {active.subtitle && (
        <p className="lore-inspire__subtitle">{active.subtitle}</p>
      )}

      <div className="lore-inspire__grid" role="list">
        {active.options.map((opt) => {
          const key = `${active.id}:${opt.label}`;
          const picked = pickedKey === key;
          return (
            <button
              key={opt.label}
              type="button"
              role="listitem"
              className={`lore-inspire__card${picked ? ' lore-inspire__card--picked' : ''}`}
              onClick={() => handlePick(opt, active)}
            >
              <span className="lore-inspire__card-label">{opt.label}</span>
              <span className="lore-inspire__card-preview">{previewText(opt.value)}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface LoreFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suggestions?: string[];
  placeholder?: string;
  description?: string;
}

export function LoreField({
  label,
  value,
  onChange,
  suggestions = [],
  placeholder,
  description,
}: LoreFieldProps) {
  const id = `lore-field-${label.replace(/\s+/g, '-').toLowerCase()}`;
  const picks = suggestions.slice(0, 6);

  return (
    <div className="lore-field">
      <label className="lore-field__label" htmlFor={id}>
        {label}
      </label>
      {description && <span className="lore-field__desc">{description}</span>}
      <input
        id={id}
        type="text"
        className="lore-field__input"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
      {picks.length > 0 && (
        <div className="lore-field__picks">
          {picks.map((s) => (
            <button
              key={s}
              type="button"
              className={`lore-field__pick${value === s ? ' lore-field__pick--on' : ''}`}
              onClick={() => onChange(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

interface LoreScrollProps {
  children: React.ReactNode;
  title: string;
  badge?: string;
}

export function LoreScroll({ children, title, badge }: LoreScrollProps) {
  return (
    <article className="lore-scroll">
      <header className="lore-scroll__head">
        <h3 className="lore-scroll__title">{title}</h3>
        {badge && <span className="lore-scroll__badge">{badge}</span>}
      </header>
      <div className="lore-scroll__body">{children}</div>
    </article>
  );
}

interface LoreActionProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  variant?: 'primary' | 'ghost';
}

export function LoreAction({ children, onClick, disabled, variant = 'primary' }: LoreActionProps) {
  return (
    <button
      type="button"
      className={`lore-action lore-action--${variant}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

interface PresetCardProps {
  label: string;
  detail?: string;
  selected?: boolean;
  onClick: () => void;
}

export function PresetCard({ label, detail, selected, onClick }: PresetCardProps) {
  return (
    <button
      type="button"
      className={`preset-card${selected ? ' preset-card--selected' : ''}`}
      onClick={onClick}
    >
      <span className="preset-card__label">{label}</span>
      {detail && <span className="preset-card__detail">{detail}</span>}
    </button>
  );
}
