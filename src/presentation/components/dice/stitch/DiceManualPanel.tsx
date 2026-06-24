import { useEffect, useState } from 'react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../../shared/constants/gameConstants';
import type { AbilityScoresProps } from '../../../../domain/value-objects/CharacterValues';
import {
  abilityModifier,
  formatModifier,
} from '../../../../domain/services/AbilityScoreGenerationService';
import { ABILITY_ROLL_UI } from '../../../../shared/constants/abilityRollLabels';

type DiceManualPanelProps = {
  initial: AbilityScoresProps;
  onChange: (abilities: AbilityScoresProps) => void;
};

export function DiceManualPanel({ initial, onChange }: DiceManualPanelProps) {
  const [abilities, setAbilities] = useState<AbilityScoresProps>(initial);

  useEffect(() => {
    setAbilities(initial);
  }, [initial]);

  const update = (ability: AbilityName, raw: string) => {
    const parsed = Number(raw);
    const value = Number.isFinite(parsed) ? Math.min(30, Math.max(1, Math.round(parsed))) : 10;
    const next = { ...abilities, [ability]: value };
    setAbilities(next);
    onChange(next);
  };

  const handleReset = () => {
    const defaults: AbilityScoresProps = {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    };
    setAbilities(defaults);
    onChange(defaults);
  };

  return (
    <section className="st-dice-block">
      <p className="st-dice-block__hint">{ABILITY_ROLL_UI.manualHint}</p>
      <div className="st-dice-actions">
        <button type="button" className="st-dice-btn st-dice-btn--muted" onClick={handleReset}>
          {ABILITY_ROLL_UI.resetManual}
        </button>
      </div>

      <div className="st-dice-grid">
        {ABILITY_NAMES.map((ability) => {
          const score = abilities[ability];
          return (
            <div key={ability} className="st-dice-ability st-dice-ability--filled">
              <span className="st-dice-ability__label">{ABILITY_LABELS[ability]}</span>
              <div className="st-dice-ability__hero">
                <input
                  type="number"
                  min={1}
                  max={30}
                  className="st-dice-ability__input st-dice-ability__input--hero"
                  value={score}
                  onChange={(e) => update(ability, e.target.value)}
                  aria-label={ABILITY_LABELS[ability]}
                />
                <span className="st-dice-ability__mod">
                  {formatModifier(abilityModifier(score))}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
