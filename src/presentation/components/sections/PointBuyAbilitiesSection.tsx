import { Button } from 'flowbite-react';
import {
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
import { ABILITY_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { PointBuyService } from '../../../domain/services/PointBuyService';
import {
  POINT_BUY_COSTS,
  POINT_BUY_MAX_SCORE,
  POINT_BUY_MIN_SCORE,
  POINT_BUY_TOTAL,
} from '../../../shared/constants/pointBuyConstants';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { AbilityScoreDisplay } from './AbilityScoreDisplay';

function PointBuyAbilityBlock({ ability }: { ability: AbilityName }) {
  const { character, updateCharacter } = useCharacterSheet();
  const score = character.abilities[ability];
  const cost = PointBuyService.getCost(score);
  const canIncrease = PointBuyService.canIncrease(character.abilities, ability);
  const canDecrease = PointBuyService.canDecrease(character.abilities, ability);

  const adjust = (delta: 1 | -1) => {
    const next =
      delta === 1
        ? PointBuyService.increase(character.abilities, ability)
        : PointBuyService.decrease(character.abilities, ability);
    if (next) updateCharacter({ abilities: next });
  };

  return (
    <div className="ability-card ability-card--pointbuy" title={ABILITY_DESCRIPTIONS[ability]}>
      <AbilityScoreDisplay ability={ability} displayMode="base">
        <div className="ability-card__controls">
          <button
            type="button"
            className="ability-step"
            disabled={!canDecrease}
            onClick={() => adjust(-1)}
            aria-label={`Diminuir ${ability}`}
          >
            −
          </button>
          <button
            type="button"
            className="ability-step"
            disabled={!canIncrease}
            onClick={() => adjust(1)}
            aria-label={`Aumentar ${ability}`}
          >
            +
          </button>
        </div>
      </AbilityScoreDisplay>
      <span className="ability-card__cost">{cost} pt</span>
    </div>
  );
}

export function PointBuyAbilitiesSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const spent = PointBuyService.getTotalSpent(character.abilities);
  const remaining = PointBuyService.getRemainingPoints(character.abilities);

  return (
    <div className="point-buy-block">
      <div className="point-buy-bar">
        <span className={`point-buy-pill ${remaining === 0 ? 'point-buy-pill--ok' : ''}`}>
          {remaining} restantes
        </span>
        <span className="point-buy-pill">{spent} gastos</span>
        <span className="point-buy-pill point-buy-pill--muted">
          {POINT_BUY_MIN_SCORE}–{POINT_BUY_MAX_SCORE} · {POINT_BUY_TOTAL} pts
        </span>
        <Button
          size="xs"
          color="light"
          onClick={() => updateCharacter({ abilities: PointBuyService.createDefaultAbilities() })}
        >
          Resetar
        </Button>
      </div>

      <div className="abilities-grid abilities-grid--triple">
        {ABILITY_NAMES.map((ability) => (
          <PointBuyAbilityBlock key={ability} ability={ability} />
        ))}
      </div>

      <details className="point-buy-costs">
        <summary>Tabela de custos</summary>
        <div className="point-buy-costs__grid">
          {Object.entries(POINT_BUY_COSTS).map(([s, c]) => (
            <span key={s}>
              {s}: {c}pt
            </span>
          ))}
        </div>
      </details>
    </div>
  );
}

export function AbilityScoreModeToggle() {
  const { character, updateCharacter } = useCharacterSheet();
  const isPointBuy = (character.abilityScoreMode ?? 'manual') === 'pointBuy';

  const setMode = (pointBuy: boolean) => {
    if (pointBuy) {
      updateCharacter({
        abilityScoreMode: 'pointBuy',
        abilities: PointBuyService.clampToPointBuyRange(character.abilities),
      });
    } else {
      updateCharacter({ abilityScoreMode: 'manual' });
    }
  };

  return (
    <div className="mode-toggle">
      <span className="mode-toggle__label">Atributos base</span>
      <div className="mode-toggle__buttons">
        <button
          type="button"
          className={`mode-toggle__btn ${!isPointBuy ? 'mode-toggle__btn--active' : ''}`}
          onClick={() => setMode(false)}
        >
          Manual
        </button>
        <button
          type="button"
          className={`mode-toggle__btn ${isPointBuy ? 'mode-toggle__btn--active' : ''}`}
          onClick={() => setMode(true)}
        >
          Pontos
        </button>
      </div>
    </div>
  );
}
