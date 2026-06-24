interface SheetPanelProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  accent?: 'gold' | 'emerald' | 'slate';
}

export function SheetPanel({
  title,
  description,
  children,
  className = '',
  accent = 'gold',
}: SheetPanelProps) {
  return (
    <div className={`sheet-panel sheet-panel--accent-${accent} ${className}`}>
      {(title || description) && (
        <header className="sheet-panel__header">
          {title && <h3 className="sheet-panel__title">{title}</h3>}
          {description && <p className="sheet-panel__desc">{description}</p>}
        </header>
      )}
      {children}
    </div>
  );
}
