interface SheetPanelProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function SheetPanel({ title, children, className = '' }: SheetPanelProps) {
  return (
    <div className={`sheet-panel ${className}`}>
      {title && <h3 className="sheet-panel__title">{title}</h3>}
      {children}
    </div>
  );
}
