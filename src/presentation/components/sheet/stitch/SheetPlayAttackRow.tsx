import { useState } from 'react';
import type { WeaponAttackRoll } from '../../../../domain/services/AttackRollService';
import {
  formatRollResult,
  rollD20,
  rollDiceNotation,
  type DiceRollResult,
} from '../../../../domain/services/DiceRollService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useAnimatedDiceRoll } from '../../../hooks/useAnimatedDiceRoll';
import { TapScale } from '../../stitch/motion/TapScale';
import { DiceRollDisplay } from './DiceRollDisplay';

type RollKind = 'attack' | 'damage';

function parseDamageFormula(formula: string): { notation: string; modifier: number } | null {
  const match = formula.trim().match(/^(\d+d\d+)([+-]\d+)?/i);
  if (!match) return null;
  const notation = match[1];
  const modifier = match[2] ? Number(match[2]) : 0;
  return { notation, modifier };
}

function computeRoll(attack: WeaponAttackRoll, kind: RollKind): DiceRollResult | null {
  if (kind === 'attack') {
    return rollD20(attack.attackTotal, attack.weaponName);
  }
  const parsed = parseDamageFormula(attack.damageFormula);
  if (!parsed) return null;
  return rollDiceNotation(parsed.notation, parsed.modifier, attack.weaponName);
}

type SheetPlayAttackRowProps = {
  attack: WeaponAttackRoll;
};

export function SheetPlayAttackRow({ attack }: SheetPlayAttackRowProps) {
  const { rolling, face, result, roll } = useAnimatedDiceRoll();
  const [lastKind, setLastKind] = useState<RollKind | null>(null);

  const handleRoll = (kind: RollKind) => {
    const computed = computeRoll(attack, kind);
    if (!computed) return;
    setLastKind(kind);
    roll(() => computed);
  };

  return (
    <li className="st-sheet-attack">
      <div className="st-sheet-attack__head">
        <span className="st-sheet-attack__name">{attack.weaponName}</span>
        {!attack.proficient ? <span className="st-sheet-attack__warn">sem prof.</span> : null}
      </div>
      <div className="st-sheet-attack__formulas">
        <span title="Ataque">{attack.attackFormula}</span>
        <span title="Dano">{attack.damageFormula}</span>
      </div>
      <div className="st-sheet-attack__actions no-print">
        <TapScale
          className={`st-sheet-btn st-sheet-btn--sm st-sheet-btn--dice${rolling && lastKind === 'attack' ? ' st-sheet-btn--rolling' : ''}`}
          onClick={() => handleRoll('attack')}
          disabled={rolling}
        >
          {SHEET_PLAY_UI.rollAttack}
        </TapScale>
        <TapScale
          className={`st-sheet-btn st-sheet-btn--sm st-sheet-btn--accent st-sheet-btn--dice${rolling && lastKind === 'damage' ? ' st-sheet-btn--rolling' : ''}`}
          onClick={() => handleRoll('damage')}
          disabled={rolling}
        >
          {SHEET_PLAY_UI.rollDamage}
        </TapScale>
      </div>
      {(rolling || result) && lastKind ? (
        <div className="st-sheet-attack__result-wrap">
          <span className="st-sheet-attack__result-kind">
            {lastKind === 'attack' ? 'Ataque' : 'Dano'}
          </span>
          <DiceRollDisplay rolling={rolling} face={face} result={result} />
          {result && !rolling ? (
            <span className="sr-only">{formatRollResult(result)}</span>
          ) : null}
        </div>
      ) : null}
    </li>
  );
}
