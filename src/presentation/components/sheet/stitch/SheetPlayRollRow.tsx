import { useState } from 'react';
import { formatRollResult, rollD20, type DiceRollResult } from '../../../../domain/services/DiceRollService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';

type SheetPlayRollRowProps = {
  name: string;
  modifier: number;
  modifierLabel: string;
  proficient?: boolean;
  expert?: boolean;
  className?: string;
};

export function SheetPlayRollRow({
  name,
  modifier,
  modifierLabel,
  proficient,
  expert,
  className = '',
}: SheetPlayRollRowProps) {
  const [lastRoll, setLastRoll] = useState<DiceRollResult | null>(null);

  const handleRoll = () => {
    setLastRoll(rollD20(modifier, name));
  };

  return (
    <li className={`st-sheet-roll-row${className ? ` ${className}` : ''}`}>
      <div className="st-sheet-roll-row__main">
        <span className="st-sheet-roll-row__name">{name}</span>
        <span className="st-sheet-roll-row__mod">{modifierLabel}</span>
        {proficient ? <span className="st-sheet-roll-row__mark" aria-label="Proficiente">●</span> : null}
        {expert ? <span className="st-sheet-roll-row__mark st-sheet-roll-row__mark--expert" aria-label="Perícia">◆</span> : null}
      </div>
      <div className="st-sheet-roll-row__actions no-print">
        <button type="button" className="st-sheet-btn st-sheet-btn--sm" onClick={handleRoll}>
          d20
        </button>
        {lastRoll ? (
          <span className="st-sheet-roll-row__result" role="status" aria-live="polite">
            {formatRollResult(lastRoll)}
          </span>
        ) : null}
      </div>
    </li>
  );
}

export function SheetPlayRollHint() {
  return <p className="st-sheet-roll-hint no-print">{SHEET_PLAY_UI.rollHint}</p>;
}
