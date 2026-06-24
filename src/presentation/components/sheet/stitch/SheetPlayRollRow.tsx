import { rollD20 } from '../../../../domain/services/DiceRollService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useAnimatedDiceRoll } from '../../../hooks/useAnimatedDiceRoll';
import { TapScale } from '../../stitch/motion/TapScale';
import { DiceRollDisplay } from './DiceRollDisplay';

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
  const { rolling, face, result, roll } = useAnimatedDiceRoll();

  const handleRoll = () => {
    roll(() => rollD20(modifier, name));
  };

  return (
    <li className={`st-sheet-roll-row${className ? ` ${className}` : ''}`}>
      <div className="st-sheet-roll-row__main">
        <span className="st-sheet-roll-row__name">{name}</span>
        <span className="st-sheet-roll-row__mod">{modifierLabel}</span>
        {proficient ? (
          <span className="st-sheet-roll-row__mark" aria-label="Proficiente">
            ●
          </span>
        ) : null}
        {expert ? (
          <span className="st-sheet-roll-row__mark st-sheet-roll-row__mark--expert" aria-label="Perícia">
            ◆
          </span>
        ) : null}
      </div>
      <div className="st-sheet-roll-row__actions no-print">
        <TapScale
          className={`st-sheet-btn st-sheet-btn--sm st-sheet-btn--dice${rolling ? ' st-sheet-btn--rolling' : ''}`}
          onClick={handleRoll}
          disabled={rolling}
          aria-label={`Rolar d20 para ${name}`}
        >
          d20
        </TapScale>
        <DiceRollDisplay rolling={rolling} face={face} result={result} />
      </div>
    </li>
  );
}

export function SheetPlayRollHint() {
  return <p className="st-sheet-roll-hint no-print">{SHEET_PLAY_UI.rollHint}</p>;
}
