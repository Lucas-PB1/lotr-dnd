import { useCallback, useEffect, useState } from 'react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../../shared/constants/gameConstants';
import { PointBuyService } from '../../../../domain/services/PointBuyService';
import {
  POINT_BUY_COSTS,
  POINT_BUY_MAX_SCORE,
  POINT_BUY_MIN_SCORE,
  POINT_BUY_TOTAL,
} from '../../../../shared/constants/pointBuyConstants';
import type { AbilityScoresProps } from '../../../../domain/value-objects/CharacterValues';
import {
  abilityModifier,
  formatModifier,
} from '../../../../domain/services/AbilityScoreGenerationService';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';

type DicePointBuyPanelProps = {
  initial: AbilityScoresProps;
  onChange: (abilities: AbilityScoresProps, complete: boolean) => void;
};

export function DicePointBuyPanel({ initial, onChange }: DicePointBuyPanelProps) {
  const [abilities, setAbilities] = useState<AbilityScoresProps>(() =>
    PointBuyService.clampToPointBuyRange(initial),
  );

  useEffect(() => {
    setAbilities(PointBuyService.clampToPointBuyRange(initial));
  }, [initial]);

  const spent = PointBuyService.getTotalSpent(abilities);
  const remaining = PointBuyService.getRemainingPoints(abilities);
  const complete = remaining === 0;

  const sync = useCallback(
    (next: AbilityScoresProps) => {
      setAbilities(next);
      onChange(next, PointBuyService.getRemainingPoints(next) === 0);
    },
    [onChange],
  );

  const adjust = (ability: AbilityName, delta: 1 | -1) => {
    const next =
      delta === 1
        ? PointBuyService.increase(abilities, ability)
        : PointBuyService.decrease(abilities, ability);
    if (next) sync(next);
  };

  const handleReset = () => {
    sync(PointBuyService.createDefaultAbilities());
  };

  return (
    <section className="st-dice-block">
      <p className="st-dice-block__hint">{ABILITY_ROLL_UI.pointBuyHint}</p>

      <div className="st-dice-point-bar">
        <span className={`st-dice-point-pill${remaining === 0 ? ' st-dice-point-pill--ok' : ''}`}>
          {remaining} {ABILITY_ROLL_UI.pointsRemaining}
        </span>
        <span className="st-dice-point-pill">
          {spent} {ABILITY_ROLL_UI.pointsSpent}
        </span>
        <span className="st-dice-point-pill">
          {POINT_BUY_MIN_SCORE}–{POINT_BUY_MAX_SCORE} · {POINT_BUY_TOTAL} pts
        </span>
        <button type="button" className="st-dice-btn st-dice-btn--muted" onClick={handleReset}>
          {ABILITY_ROLL_UI.resetPointBuy}
        </button>
      </div>

      <div className="st-dice-grid">
        {ABILITY_NAMES.map((ability) => {
          const score = abilities[ability];
          const cost = PointBuyService.getCost(score);
          return (
            <div key={ability} className="st-dice-ability st-dice-ability--filled">
              <span className="st-dice-ability__label">
                {ABILITY_LABELS[ability]} · {cost} pt
              </span>
              <div className="st-dice-ability__hero">
                <span className="st-dice-ability__score">{score}</span>
                <span className="st-dice-ability__mod">
                  {formatModifier(abilityModifier(score))}
                </span>
              </div>
              <div className="st-dice-ability__controls">
                <button
                  type="button"
                  className="st-dice-step"
                  disabled={!PointBuyService.canDecrease(abilities, ability)}
                  onClick={() => adjust(ability, -1)}
                  aria-label={`Diminuir ${ABILITY_LABELS[ability]}`}
                >
                  −
                </button>
                <button
                  type="button"
                  className="st-dice-step"
                  disabled={!PointBuyService.canIncrease(abilities, ability)}
                  onClick={() => adjust(ability, 1)}
                  aria-label={`Aumentar ${ABILITY_LABELS[ability]}`}
                >
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {!complete ? (
        <p className="st-dice-feedback st-dice-feedback--warn">
          Gaste os {POINT_BUY_TOTAL} pontos antes de aplicar.
        </p>
      ) : null}

      <details className="st-dice-costs">
        <summary>{ABILITY_ROLL_UI.costTable}</summary>
        <div className="st-dice-costs__grid">
          {Object.entries(POINT_BUY_COSTS).map(([score, cost]) => (
            <span key={score}>
              {score}: {cost} pt
            </span>
          ))}
        </div>
      </details>
    </section>
  );
}
