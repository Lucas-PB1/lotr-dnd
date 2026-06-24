import { Checkbox, Label } from 'flowbite-react';
import {
  ABILITY_LABELS,
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import {
  ABILITY_DESCRIPTIONS,
} from '../../../shared/constants/sheetFieldDescriptions';
import { CharacterCalculator } from '../../../domain/services/CharacterCalculator';
import { formatRollFormula } from '../../../domain/services/AttackRollService';
import { Character } from '../../../domain/entities/Character';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { AbilityBonusesSection } from './AbilityBonusesSection';
import { AbilityScoreDisplay } from './AbilityScoreDisplay';
import {
  AbilityScoreModeToggle,
  PointBuyAbilitiesSection,
} from './PointBuyAbilitiesSection';

/** @deprecated Use IdentitySection from IdentitySection.tsx */
export { IdentitySection as HeaderSection } from './IdentitySection';

function ManualAbilityBlock({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const base = character.abilities[ability];

  const adjust = (delta: 1 | -1) => {
    const next = Math.min(30, Math.max(1, base + delta));
    updateCharacter({
      abilities: { ...character.abilities, [ability]: next },
    });
  };

  return (
    <div className="ability-card ability-card--manual" title={ABILITY_DESCRIPTIONS[ability]}>
      <AbilityScoreDisplay ability={ability}>
        <div className="ability-card__controls">
          <button
            type="button"
            className="ability-step"
            disabled={base <= 1}
            onClick={() => adjust(-1)}
            aria-label={`Diminuir ${ability}`}
          >
            −
          </button>
          <button
            type="button"
            className="ability-step"
            disabled={base >= 30}
            onClick={() => adjust(1)}
            aria-label={`Aumentar ${ability}`}
          >
            +
          </button>
        </div>
      </AbilityScoreDisplay>
    </div>
  );
}

export function AbilitiesSection() {
  const { character } = useCharacterSheet();
  const isPointBuy = (character.abilityScoreMode ?? 'manual') === 'pointBuy';

  return (
    <div className="abilities-block">
      <AbilityScoreModeToggle />
      {isPointBuy ? (
        <PointBuyAbilitiesSection />
      ) : (
        <div className="abilities-grid abilities-grid--triple">
          {ABILITY_NAMES.map((ability) => (
            <ManualAbilityBlock key={ability} ability={ability} />
          ))}
        </div>
      )}
      <AbilityBonusesSection />
    </div>
  );
}

function SavingThrowRow({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const domainCharacter = new Character(character);
  const save = CharacterCalculator.savingThrowModifier(domainCharacter, ability);
  const proficient = character.savingThrows[ability].proficient;

  return (
    <div className={`save-row ${proficient ? 'save-row--proficient' : ''}`}>
      <Checkbox
        color="warning"
        checked={proficient}
        title="Proficiente nesta resistência"
        onChange={(e) =>
          updateCharacter({
            savingThrows: {
              ...character.savingThrows,
              [ability]: { proficient: e.target.checked },
            },
          })
        }
      />
      <span className="save-row__mod" title={formatRollFormula(save.modifier)}>
        <span className="save-row__roll">{formatRollFormula(save.modifier)}</span>
      </span>
      <Label className="save-row__name">{ABILITY_LABELS[ability]}</Label>
    </div>
  );
}

export function SavingThrowsSection() {
  return (
    <details className="abilities-accordion__item abilities-accordion__item--saves" open>
      <summary className="abilities-accordion__summary">
        <span>Testes de resistência</span>
      </summary>
      <div className="saves-grid saves-grid--final">
        {ABILITY_NAMES.map((ability) => (
          <SavingThrowRow key={ability} ability={ability} />
        ))}
      </div>
    </details>
  );
}

export function AbilitiesAndSavesPanel() {
  return (
    <div className="abilities-saves-panel">
      <AbilitiesSection />
      <SavingThrowsSection />
    </div>
  );
}
