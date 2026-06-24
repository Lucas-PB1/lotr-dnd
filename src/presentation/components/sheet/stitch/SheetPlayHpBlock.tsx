import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function SheetPlayHpBlock() {
  const { character, updateCharacter } = useCharacterSheet();
  const { hitPoints } = character;
  const max = Math.max(hitPoints.maximum, 1);
  const pct = Math.min(100, Math.round((hitPoints.current / max) * 100));
  const isLow = pct <= 25 && hitPoints.current > 0;
  const isDown = hitPoints.current <= 0;

  const updateHp = (partial: Partial<typeof hitPoints>) => {
    updateCharacter({ hitPoints: { ...hitPoints, ...partial } });
  };

  const bump = (delta: number) => {
    updateHp({ current: Math.max(0, hitPoints.current + delta) });
  };

  return (
    <section className="st-sheet-block st-sheet-hp" aria-label="Pontos de vida">
      <div
        className={`st-sheet-hp__hero${isDown ? ' st-sheet-hp__hero--down' : isLow ? ' st-sheet-hp__hero--low' : ''}`}
      >
        <div className="st-sheet-hp__head">
          <span className="st-sheet-block__title">Pontos de vida</span>
          <span className="st-sheet-hp__dice" title={FIELD_DESCRIPTIONS.hitDice}>
            {character.hitDice || '—'} DV
          </span>
        </div>
        <div className="st-sheet-hp__display">
          <span className="st-sheet-hp__current">{hitPoints.current}</span>
          <span className="st-sheet-hp__sep">/</span>
          <span className="st-sheet-hp__max">{hitPoints.maximum}</span>
          {hitPoints.temporary > 0 ? (
            <span className="st-sheet-hp__temp">+{hitPoints.temporary}</span>
          ) : null}
        </div>
        <div
          className="st-sheet-hp__bar"
          role="progressbar"
          aria-valuenow={hitPoints.current}
          aria-valuemin={0}
          aria-valuemax={max}
        >
          <div className="st-sheet-hp__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="st-sheet-hp__quick no-print">
        <button type="button" className="st-sheet-hp__step" onClick={() => bump(-1)} aria-label="Menos 1 PV">
          −1
        </button>
        <button type="button" className="st-sheet-hp__step" onClick={() => bump(1)} aria-label="Mais 1 PV">
          +1
        </button>
        <button type="button" className="st-sheet-hp__step" onClick={() => bump(5)} aria-label="Mais 5 PV">
          +5
        </button>
      </div>

      <div className="st-sheet-hp__inputs">
        <label className="st-sheet-hp__field">
          <span>Atual</span>
          <input
            type="number"
            value={hitPoints.current}
            onChange={(e) => updateHp({ current: Number(e.target.value) || 0 })}
            aria-label={FIELD_DESCRIPTIONS.hitPointsCurrent}
          />
        </label>
        <label className="st-sheet-hp__field">
          <span>Temp.</span>
          <input
            type="number"
            value={hitPoints.temporary}
            onChange={(e) => updateHp({ temporary: Number(e.target.value) || 0 })}
            aria-label={FIELD_DESCRIPTIONS.hitPointsTemp}
          />
        </label>
        <label className="st-sheet-hp__field">
          <span>Máx.</span>
          <input
            type="number"
            value={hitPoints.maximum}
            onChange={(e) => updateHp({ maximum: Number(e.target.value) || 0 })}
            aria-label={FIELD_DESCRIPTIONS.hitPointsMax}
          />
        </label>
      </div>
    </section>
  );
}
