import { useMemo } from 'react';
import {
  assignmentToAbilities,
  sumAbilities,
} from '../../../../domain/services/AbilityScoreGenerationService';
import type { AbilityScoresProps } from '../../../../domain/value-objects/CharacterValues';
import type { AbilityName } from '../../../../shared/constants/gameConstants';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';
import { AbilityPreviewGrid } from './AbilityAssignmentGrid';

type AbilityRollSummaryProps = {
  assigned: Record<AbilityName, number | null> | AbilityScoresProps;
  onApply: () => void;
  canApply: boolean;
  feedback?: string | null;
};

function isFullAssignment(
  assigned: Record<AbilityName, number | null> | AbilityScoresProps,
): assigned is AbilityScoresProps {
  return 'strength' in assigned && typeof assigned.strength === 'number';
}

export function AbilityRollSummary({ assigned, onApply, canApply, feedback }: AbilityRollSummaryProps) {
  const abilities = useMemo(() => {
    if (isFullAssignment(assigned)) return assigned;
    return assignmentToAbilities(assigned);
  }, [assigned]);

  const total = abilities ? sumAbilities(abilities) : null;

  return (
    <section className="st-dice-summary" aria-label="Resumo dos atributos">
      <div className="st-dice-summary__head">
        <p className="st-dice-summary__total">
          {ABILITY_ROLL_UI.totalSum}
          <strong>{total != null ? total : '—'}</strong>
        </p>
        <button
          type="button"
          className="st-dice-btn st-dice-btn--primary"
          disabled={!canApply}
          onClick={onApply}
        >
          {ABILITY_ROLL_UI.apply}
        </button>
      </div>

      {abilities ? <AbilityPreviewGrid abilities={abilities} /> : null}

      {feedback ? (
        <p
          className={`st-dice-feedback${canApply ? '' : ' st-dice-feedback--warn'}`}
          aria-live="polite"
        >
          {feedback}
        </p>
      ) : null}
    </section>
  );
}
