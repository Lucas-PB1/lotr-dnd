import { countJourneyDone, getMissingJourneyHints } from '../../../../application/sheet/getSheetJourney';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';
import type { SheetTabId } from './sheetTabTypes';

type SheetMobileProgressProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
};

export function SheetMobileProgress({ character, activeTab, onTabChange }: SheetMobileProgressProps) {
  if (character.sheetFinalized) {
    return null;
  }

  const { done, total } = countJourneyDone(character);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const missing = getMissingJourneyHints(character);
  const onSheet = activeTab === 'summary';

  return (
    <div className="st-mobile-progress no-print" aria-label={SHELL_UI.journeyLabel}>
      <div className="st-mobile-progress__row">
        <div className="st-mobile-progress__meta">
          <span className="st-mobile-progress__count">
            {done}/{total} passos
          </span>
          {missing.length > 0 ? (
            <ul className="st-mobile-progress__missing">
              {missing.slice(0, 2).map((hint) => (
                <li key={hint.stepId}>
                  <button type="button" onClick={() => onTabChange(hint.tabId)}>
                    <strong>{hint.label}:</strong> {hint.message}
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <span className="st-mobile-progress__hint">{SHELL_UI.sheetReady}</span>
          )}
        </div>
        {!onSheet ? (
          <button type="button" className="st-mobile-progress__cta" onClick={() => onTabChange('summary')}>
            {SHELL_UI.openSheet}
          </button>
        ) : null}
      </div>
      <div
        className="st-mobile-progress__track"
        role="progressbar"
        aria-valuenow={done}
        aria-valuemin={0}
        aria-valuemax={total}
      >
        <div className="st-mobile-progress__fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
