import { Button, Label } from 'flowbite-react';
import {
  ABILITY_NAMES,
  type AbilityName,
} from '../../../shared/constants/gameConstants';
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
    <AbilityScoreDisplay ability={ability} baseScore={score}>
      <div className="ability-card__controls">
        <Button size="xs" color="light" disabled={!canDecrease} onClick={() => adjust(-1)}>
          −
        </Button>
        <Button size="xs" color="light" disabled={!canIncrease} onClick={() => adjust(1)}>
          +
        </Button>
      </div>
      <span className="ability-card__cost">{cost} pt{cost !== 1 ? 's' : ''}</span>
    </AbilityScoreDisplay>
  );
}

export function PointBuyAbilitiesSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const spent = PointBuyService.getTotalSpent(character.abilities);
  const remaining = PointBuyService.getRemainingPoints(character.abilities);

  return (
    <div className="space-y-3">
      <div className="point-buy-bar">
        <div>
          <p className="text-sm font-semibold text-amber-950">Compra de Pontos</p>
          <p className="text-xs text-amber-900/70">
            {POINT_BUY_MIN_SCORE}–{POINT_BUY_MAX_SCORE} · {POINT_BUY_TOTAL} pts · bônus aplicados depois
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className={`point-buy-pill ${remaining === 0 ? 'point-buy-pill--ok' : ''}`}>
            Restantes: {remaining}
          </span>
          <span className="point-buy-pill">Gastos: {spent}</span>
          <Button
            size="xs"
            color="light"
            onClick={() => updateCharacter({ abilities: PointBuyService.createDefaultAbilities() })}
          >
            Resetar
          </Button>
        </div>
      </div>

      <div className="abilities-grid abilities-grid--compact">
        {ABILITY_NAMES.map((ability) => (
          <PointBuyAbilityBlock key={ability} ability={ability} />
        ))}
      </div>

      <details className="text-xs text-amber-900/80">
        <summary className="cursor-pointer font-semibold">Tabela de custos</summary>
        <div className="mt-1 grid grid-cols-4 gap-1">
          {Object.entries(POINT_BUY_COSTS).map(([s, c]) => (
            <span key={s}>{s}: {c}pt</span>
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
      <Label className="text-xs font-semibold uppercase text-amber-900/70">Base:</Label>
      <div className="mode-toggle__buttons">
        <Button size="xs" color={!isPointBuy ? 'warning' : 'light'} onClick={() => setMode(false)}>
          Manual
        </Button>
        <Button size="xs" color={isPointBuy ? 'warning' : 'light'} onClick={() => setMode(true)}>
          Compra de Pontos
        </Button>
      </div>
    </div>
  );
}
