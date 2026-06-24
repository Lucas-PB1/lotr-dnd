import {
  ABILITY_ABBREVIATIONS,
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../../shared/constants/gameConstants';
import {
  abilityModifier,
  abilityAssignmentOptions,
  formatModifier,
} from '../../../../domain/services/AbilityScoreGenerationService';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';

type AbilityAssignmentGridProps = {
  assigned: Record<AbilityName, number | null>;
  pool: number[];
  onAssign: (ability: AbilityName, value: number | null) => void;
};

export function AbilityAssignmentGrid({ assigned, pool, onAssign }: AbilityAssignmentGridProps) {
  return (
    <>
      <div className="st-dice-pool">
        <span className="st-dice-pool__label">{ABILITY_ROLL_UI.availablePool}</span>
        {pool.length === 0 ? (
          <span className="st-dice-chip st-dice-chip--muted">—</span>
        ) : (
          pool.map((value, index) => (
            <span key={`${value}-${index}`} className="st-dice-chip">
              {value}
            </span>
          ))
        )}
      </div>

      <div className="st-dice-grid">
        {ABILITY_NAMES.map((ability) => {
          const score = assigned[ability];
          const options = abilityAssignmentOptions(ability, assigned, pool);
          return (
            <div
              key={ability}
              className={`st-dice-ability${score != null ? ' st-dice-ability--filled' : ''}`}
            >
              <span className="st-dice-ability__label">{ABILITY_LABELS[ability]}</span>
              <div className="st-dice-ability__hero">
                <span className="st-dice-ability__score">{score ?? '—'}</span>
                {score != null ? (
                  <span className="st-dice-ability__mod">
                    {formatModifier(abilityModifier(score))}
                  </span>
                ) : null}
              </div>
              <select
                className="st-dice-ability__select"
                value={score ?? ''}
                onChange={(e) => {
                  const raw = e.target.value;
                  onAssign(ability, raw === '' ? null : Number(raw));
                }}
                aria-label={`${ABILITY_ROLL_UI.assignLabel} ${ABILITY_LABELS[ability]}`}
              >
                <option value="">{ABILITY_ROLL_UI.unassigned}</option>
                {options.map((value, index) => (
                  <option key={`${value}-${index}`} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>
          );
        })}
      </div>
    </>
  );
}

type AbilityPreviewGridProps = {
  abilities: Record<AbilityName, number>;
};

export function AbilityPreviewGrid({ abilities }: AbilityPreviewGridProps) {
  return (
    <div className="st-dice-summary__grid">
      {ABILITY_NAMES.map((ability) => (
        <div key={ability} className="st-dice-summary__cell">
          <span className="st-dice-summary__abbr">{ABILITY_ABBREVIATIONS[ability]}</span>
          <span className="st-dice-summary__score">{abilities[ability]}</span>
          <span className="st-dice-summary__mod">
            {formatModifier(abilityModifier(abilities[ability]))}
          </span>
        </div>
      ))}
    </div>
  );
}
