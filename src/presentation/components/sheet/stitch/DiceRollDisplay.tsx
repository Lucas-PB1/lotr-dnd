import { formatRollResult, type DiceRollResult } from '../../../../domain/services/DiceRollService';

type DiceRollDisplayProps = {
  rolling: boolean;
  face: number;
  result: DiceRollResult | null;
};

export function DiceRollDisplay({ rolling, face, result }: DiceRollDisplayProps) {
  if (!rolling && !result) return null;

  if (rolling) {
    return (
      <span className="st-dice-result st-dice-result--rolling" role="status" aria-live="polite" aria-busy="true">
        <span className="st-dice-result__die" aria-hidden>
          <span className="st-dice-result__face">{face}</span>
        </span>
        <span className="st-dice-result__label">rolando…</span>
      </span>
    );
  }

  if (!result) return null;

  const isD20 = result.sides === 20;
  const isCrit = isD20 && result.natural === 20;
  const isFumble = isD20 && result.natural === 1;

  return (
    <span
      className={`st-dice-result st-dice-result--revealed${isCrit ? ' st-dice-result--crit' : ''}${isFumble ? ' st-dice-result--fumble' : ''}`}
      role="status"
      aria-live="polite"
    >
      {isD20 ? (
        <span className="st-dice-result__die" aria-hidden>
          <span className="st-dice-result__face">{result.natural}</span>
        </span>
      ) : null}
      <span className="st-dice-result__text">{formatRollResult(result)}</span>
      {isCrit ? <span className="st-dice-result__tag">Crítico!</span> : null}
      {isFumble ? <span className="st-dice-result__tag st-dice-result__tag--fumble">Falha!</span> : null}
    </span>
  );
}
