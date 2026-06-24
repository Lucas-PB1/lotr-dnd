import { useCallback, useState } from 'react';
import type { AbilityName } from '../../../../shared/constants/gameConstants';
import {
  createEmptyAssignment,
  isAssignmentComplete,
  rollSixAbilities,
  type AbilityRollDetail,
} from '../../../../domain/services/AbilityScoreGenerationService';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';
import { AbilityAssignmentGrid } from './AbilityAssignmentGrid';

type DiceRollPanelProps = {
  onAssignmentChange: (assigned: Record<AbilityName, number | null>, complete: boolean) => void;
};

export function DiceRollPanel({ onAssignmentChange }: DiceRollPanelProps) {
  const [pool, setPool] = useState<number[]>([]);
  const [assigned, setAssigned] = useState(createEmptyAssignment);
  const [rollDetails, setRollDetails] = useState<AbilityRollDetail[]>([]);

  const syncParent = useCallback(
    (nextAssigned: Record<AbilityName, number | null>) => {
      onAssignmentChange(nextAssigned, isAssignmentComplete(nextAssigned));
    },
    [onAssignmentChange],
  );

  const handleRoll = () => {
    const rolls = rollSixAbilities();
    setRollDetails(rolls);
    setPool(rolls.map((r) => r.value));
    const empty = createEmptyAssignment();
    setAssigned(empty);
    syncParent(empty);
  };

  const handleAssign = (ability: AbilityName, value: number | null) => {
    setAssigned((prev) => {
      const previous = prev[ability];
      const nextPool = [...pool];
      if (previous != null) {
        nextPool.push(previous);
      }
      if (value != null) {
        const index = nextPool.indexOf(value);
        if (index >= 0) nextPool.splice(index, 1);
      }
      setPool(nextPool);
      const nextAssigned = { ...prev, [ability]: value };
      syncParent(nextAssigned);
      return nextAssigned;
    });
  };

  return (
    <section className="st-dice-block">
      <p className="st-dice-block__hint">{ABILITY_ROLL_UI.rollHint}</p>
      <div className="st-dice-actions">
        <button type="button" className="st-dice-btn" onClick={handleRoll}>
          {pool.length > 0 ? ABILITY_ROLL_UI.reroll : ABILITY_ROLL_UI.rollButton}
        </button>
      </div>

      {rollDetails.length > 0 ? (
        <ul className="st-dice-rolls" aria-label={ABILITY_ROLL_UI.lastRolls}>
          {rollDetails.map((roll, index) => (
            <li key={index} className="st-dice-rolls__item">
              {roll.dice.join(', ')} → {roll.value} ({ABILITY_ROLL_UI.dropped}: {roll.dropped})
            </li>
          ))}
        </ul>
      ) : null}

      {pool.length > 0 ? (
        <AbilityAssignmentGrid assigned={assigned} pool={pool} onAssign={handleAssign} />
      ) : null}
    </section>
  );
}
