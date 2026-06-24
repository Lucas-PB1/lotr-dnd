import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useSheetNavigation } from '../../../context/SheetNavigationContext';

type SheetPlayToolbarProps = {
  onExportPdf: () => void;
  exportingPdf: boolean;
  exportError?: string | null;
};

export function SheetPlayToolbar({ onExportPdf, exportingPdf, exportError }: SheetPlayToolbarProps) {
  const { goToTab } = useSheetNavigation();

  const handlePrint = () => window.print();

  return (
    <div className="st-sheet-toolbar no-print">
      <div className="st-sheet-toolbar__copy">
        <h2 className="st-sheet-toolbar__title">{SHEET_PLAY_UI.pageTitle}</h2>
        <p className="st-sheet-toolbar__hint">{SHEET_PLAY_UI.pageHint}</p>
        {exportError ? <p className="st-sheet-toolbar__error">{exportError}</p> : null}
      </div>
      <div className="st-sheet-toolbar__actions">
        <button type="button" className="st-sheet-btn st-sheet-btn--muted" onClick={() => goToTab('creation')}>
          {SHEET_PLAY_UI.editSheet}
        </button>
        <button type="button" className="st-sheet-btn st-sheet-btn--muted" onClick={handlePrint}>
          {SHEET_PLAY_UI.printSheet}
        </button>
        <button
          type="button"
          className="st-sheet-btn st-sheet-btn--accent"
          onClick={onExportPdf}
          disabled={exportingPdf}
        >
          {exportingPdf ? SHEET_PLAY_UI.exportPdfBusy : SHEET_PLAY_UI.exportPdf}
        </button>
      </div>
    </div>
  );
}
