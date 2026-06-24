import { countJourneyDone } from '../../../../application/sheet/getSheetJourney';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';
import type { SheetTabId } from './sheetTabTypes';

type SheetMobileProgressProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
};

export function SheetMobileProgress({ character, activeTab, onTabChange }: SheetMobileProgressProps) {
  const { done, total } = countJourneyDone(character);
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const onSheet = activeTab === 'summary';

  return (
    <div className="st-mobile-progress no-print" aria-label={SHELL_UI.journeyLabel}>
      <div className="st-mobile-progress__row">
        <div className="st-mobile-progress__meta">
          <span className="st-mobile-progress__count">
            {done}/{total} passos
          </span>
          <span className="st-mobile-progress__hint">
            {character.sheetFinalized ? SHELL_UI.sheetReady : SHELL_UI.finishHint}
          </span>
        </div>
        {!onSheet ? (
          <button type="button" className="st-mobile-progress__cta" onClick={() => onTabChange('summary')}>
            {character.sheetFinalized ? SHELL_UI.goToSheet : 'Ficha'}
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
