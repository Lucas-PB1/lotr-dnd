import { useCallback, useState } from 'react';
import type { AbilityName } from '../../../../shared/constants/gameConstants';
import {
  createEmptyAssignment,
  isAssignmentComplete,
  STANDARD_ABILITY_ARRAY,
} from '../../../../domain/services/AbilityScoreGenerationService';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';
import { AbilityAssignmentGrid } from './AbilityAssignmentGrid';

type StandardArrayPanelProps = {
  onAssignmentChange: (assigned: Record<AbilityName, number | null>, complete: boolean) => void;
};

export function StandardArrayPanel({ onAssignmentChange }: StandardArrayPanelProps) {
  const [pool, setPool] = useState<number[]>([...STANDARD_ABILITY_ARRAY]);
  const [assigned, setAssigned] = useState(createEmptyAssignment);

  const syncParent = useCallback(
    (nextAssigned: Record<AbilityName, number | null>) => {
      onAssignmentChange(nextAssigned, isAssignmentComplete(nextAssigned));
    },
    [onAssignmentChange],
  );

  const handleReset = () => {
    const empty = createEmptyAssignment();
    setAssigned(empty);
    setPool([...STANDARD_ABILITY_ARRAY]);
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
      <p className="st-dice-block__hint">{ABILITY_ROLL_UI.standardHint}</p>
      <div className="st-dice-actions">
        <button type="button" className="st-dice-btn st-dice-btn--muted" onClick={handleReset}>
          {ABILITY_ROLL_UI.resetArray}
        </button>
      </div>
      <AbilityAssignmentGrid assigned={assigned} pool={pool} onAssign={handleAssign} />
    </section>
  );
}
