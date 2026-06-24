import { APP_TITLE } from '../../../../shared/constants/appLabels';

type SheetTopBarProps = {
  isSaving: boolean;
  onResetClick: () => void;
};

export function SheetTopBar({ isSaving, onResetClick }: SheetTopBarProps) {
  return (
    <header className="st-topbar no-print">
      <div className="st-topbar__inner">
        <h1 className="st-topbar__title">{APP_TITLE}</h1>
        <div className="st-topbar__actions">
          <span
            className={`font-st-label px-2 py-1 rounded-full text-xs ${
              isSaving
                ? 'bg-[var(--color-st-secondary-container)] text-[var(--color-st-on-secondary-container)]'
                : 'bg-[var(--color-st-primary-container)] text-[var(--color-st-on-primary-container)]'
            }`}
          >
            {isSaving ? 'Salvando…' : 'Salvo'}
          </span>
          <button
            type="button"
            onClick={onResetClick}
            className="font-st-label px-3 py-1.5 rounded-lg border border-[var(--color-st-outline-variant)] text-[var(--color-st-error)] hover:bg-[var(--color-st-surface-container-high)] transition-colors"
          >
            Começar do zero
          </button>
        </div>
      </div>
    </header>
  );
}
