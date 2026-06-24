import { useCallback, useState } from 'react';
import type { AbilityName } from '../../../../shared/constants/gameConstants';
import {
  assignmentToAbilities,
  createEmptyAssignment,
} from '../../../../domain/services/AbilityScoreGenerationService';
import type { AbilityScoresProps } from '../../../../domain/value-objects/CharacterValues';
import {
  ABILITY_ROLL_UI,
  type AbilityScoreGenMethod,
} from '../../../../shared/constants/abilityRollLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { AbilityRollSummary } from './AbilityRollSummary';
import { DiceManualPanel } from './DiceManualPanel';
import { DicePointBuyPanel } from './DicePointBuyPanel';
import { DiceRollPanel } from './DiceRollPanel';
import { StandardArrayPanel } from './StandardArrayPanel';

const METHODS: AbilityScoreGenMethod[] = ['roll', 'standardArray', 'pointBuy', 'manual'];

export function DiceStitchView() {
  const { character, updateCharacter } = useCharacterSheet();
  const [method, setMethod] = useState<AbilityScoreGenMethod>('roll');
  const [assigned, setAssigned] = useState(createEmptyAssignment);
  const [assignmentComplete, setAssignmentComplete] = useState(false);
  const [pointBuyAbilities, setPointBuyAbilities] = useState<AbilityScoresProps>(character.abilities);
  const [pointBuyComplete, setPointBuyComplete] = useState(false);
  const [manualAbilities, setManualAbilities] = useState<AbilityScoresProps>(character.abilities);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleMethodChange = (next: AbilityScoreGenMethod) => {
    setMethod(next);
    setFeedback(null);
    setAssigned(createEmptyAssignment());
    setAssignmentComplete(false);
    setPointBuyAbilities(character.abilities);
    setManualAbilities(character.abilities);
  };

  const handleAssignmentChange = useCallback(
    (next: Record<AbilityName, number | null>, complete: boolean) => {
      setAssigned(next);
      setAssignmentComplete(complete);
      setFeedback(null);
    },
    [],
  );

  const handleApply = () => {
    let abilities: AbilityScoresProps | null = null;
    let abilityScoreMode: 'manual' | 'pointBuy' = 'manual';

    if (method === 'roll' || method === 'standardArray') {
      abilities = assignmentToAbilities(assigned);
      if (!abilities) {
        setFeedback(ABILITY_ROLL_UI.incomplete);
        return;
      }
    } else if (method === 'pointBuy') {
      if (!pointBuyComplete) {
        setFeedback('Gaste todos os pontos antes de aplicar.');
        return;
      }
      abilities = pointBuyAbilities;
      abilityScoreMode = 'pointBuy';
    } else {
      abilities = manualAbilities;
    }

    updateCharacter({ abilities, abilityScoreMode });
    setFeedback(ABILITY_ROLL_UI.applied);
  };

  const canApply =
    method === 'manual'
      ? true
      : method === 'pointBuy'
        ? pointBuyComplete
        : assignmentComplete;

  const summarySource =
    method === 'pointBuy'
      ? pointBuyAbilities
      : method === 'manual'
        ? manualAbilities
        : assigned;

  return (
    <div className="st-dice">
      <header className="st-dice-header">
        <h2 className="st-dice-header__title">{ABILITY_ROLL_UI.pageTitle}</h2>
        <p className="st-dice-header__hint">{ABILITY_ROLL_UI.pageHint}</p>
        <p className="st-dice-header__note">{ABILITY_ROLL_UI.pageNote}</p>
      </header>

      <nav className="st-dice-methods" aria-label="Método de geração">
        {METHODS.map((id) => (
          <button
            key={id}
            type="button"
            className={`st-dice-methods__btn${method === id ? ' st-dice-methods__btn--active' : ''}`}
            onClick={() => handleMethodChange(id)}
          >
            {ABILITY_ROLL_UI.methods[id]}
          </button>
        ))}
      </nav>

      <div className="st-dice-body">
        <div className="st-dice-main">
          {method === 'roll' ? (
            <DiceRollPanel onAssignmentChange={handleAssignmentChange} />
          ) : null}
          {method === 'standardArray' ? (
            <StandardArrayPanel onAssignmentChange={handleAssignmentChange} />
          ) : null}
          {method === 'pointBuy' ? (
            <DicePointBuyPanel
              initial={character.abilities}
              onChange={(next, complete) => {
                setPointBuyAbilities(next);
                setPointBuyComplete(complete);
                setFeedback(null);
              }}
            />
          ) : null}
          {method === 'manual' ? (
            <DiceManualPanel
              initial={character.abilities}
              onChange={(next) => {
                setManualAbilities(next);
                setFeedback(null);
              }}
            />
          ) : null}
        </div>

      <aside className="st-dice-aside">
        <AbilityRollSummary
          assigned={summarySource}
          onApply={handleApply}
          canApply={canApply}
          feedback={feedback}
        />
      </aside>
    </div>
  </div>
  );
}
