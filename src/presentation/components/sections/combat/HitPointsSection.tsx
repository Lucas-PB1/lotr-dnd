import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { NumberField } from '../../ui/FormFields';

export function HitPointsSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { hitPoints } = character;
  const max = Math.max(hitPoints.maximum, 1);
  const pct = Math.min(100, Math.round((hitPoints.current / max) * 100));
  const isLow = pct <= 25 && hitPoints.current > 0;
  const isDown = hitPoints.current <= 0;

  const updateHp = (partial: Partial<typeof hitPoints>) => {
    updateCharacter({ hitPoints: { ...hitPoints, ...partial } });
  };

  return (
    <div className="hp-block">
      <div className={`hp-hero ${isDown ? 'hp-hero--down' : isLow ? 'hp-hero--low' : ''}`}>
        <div className="hp-hero__header">
          <span className="hp-hero__label">Pontos de Vida</span>
          <span className="hp-hero__dice" title={FIELD_DESCRIPTIONS.hitDice}>
            {character.hitDice || '—'} DV
          </span>
        </div>
        <div className="hp-hero__display">
          <span className="hp-hero__current">{hitPoints.current}</span>
          <span className="hp-hero__sep">/</span>
          <span className="hp-hero__max" title={FIELD_DESCRIPTIONS.hitPointsMax}>
            {hitPoints.maximum}
          </span>
        </div>
        <div className="hp-hero__bar" role="progressbar" aria-valuenow={hitPoints.current} aria-valuemin={0} aria-valuemax={max}>
          <div className="hp-hero__fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="hp-block__inputs">
        <NumberField
          label="Atual"
          value={hitPoints.current}
          onChange={(current) => updateHp({ current })}
          description={FIELD_DESCRIPTIONS.hitPointsCurrent}
          compact
        />
        <NumberField
          label="Temp."
          value={hitPoints.temporary}
          onChange={(temporary) => updateHp({ temporary })}
          description={FIELD_DESCRIPTIONS.hitPointsTemp}
          compact
        />
        <NumberField
          label="Máx."
          value={hitPoints.maximum}
          onChange={(maximum) => updateHp({ maximum })}
          description={FIELD_DESCRIPTIONS.hitPointsMax}
          compact
        />
      </div>
    </div>
  );
}
