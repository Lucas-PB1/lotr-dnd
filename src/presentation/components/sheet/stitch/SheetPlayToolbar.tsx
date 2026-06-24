import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useSheetNavigation } from '../../../context/SheetNavigationContext';

export function SheetPlayToolbar() {
  const { goToTab } = useSheetNavigation();

  const handlePrint = () => window.print();

  return (
    <div className="st-sheet-toolbar no-print">
      <div className="st-sheet-toolbar__copy">
        <h2 className="st-sheet-toolbar__title">{SHEET_PLAY_UI.pageTitle}</h2>
        <p className="st-sheet-toolbar__hint">{SHEET_PLAY_UI.pageHint}</p>
      </div>
      <div className="st-sheet-toolbar__actions">
        <button type="button" className="st-sheet-btn st-sheet-btn--muted" onClick={() => goToTab('creation')}>
          {SHEET_PLAY_UI.editSheet}
        </button>
        <button type="button" className="st-sheet-btn" onClick={handlePrint}>
          {SHEET_PLAY_UI.printSheet}
        </button>
      </div>
    </div>
  );
}
