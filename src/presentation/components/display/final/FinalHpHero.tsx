import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import type { HitPointsProps } from '../../../../domain/value-objects/CharacterValues';
import { DisplayStat } from '../DisplayField';

interface FinalHpHeroProps {
  hitPoints: HitPointsProps;
  hitDice: string;
}

export function FinalHpHero({ hitPoints, hitDice }: FinalHpHeroProps) {
  const max = Math.max(hitPoints.maximum, 1);
  const pct = Math.min(100, Math.round((hitPoints.current / max) * 100));
  const isLow = pct <= 25 && hitPoints.current > 0;
  const isDown = hitPoints.current <= 0;

  return (
    <div className={`final-hp-hero ${isDown ? 'final-hp-hero--down' : isLow ? 'final-hp-hero--low' : ''}`}>
      <div className="final-hp-hero__header">
        <span className="final-hp-hero__label">Pontos de Vida</span>
        <span className="final-hp-hero__dice" title={FIELD_DESCRIPTIONS.hitDice}>
          {hitDice || '—'} DV
        </span>
      </div>
      <div className="final-hp-hero__display">
        <span className="final-hp-hero__current">{hitPoints.current}</span>
        <span className="final-hp-hero__sep">/</span>
        <span className="final-hp-hero__max" title={FIELD_DESCRIPTIONS.hitPointsMax}>
          {hitPoints.maximum}
        </span>
        {hitPoints.temporary > 0 && (
          <span className="final-hp-hero__temp" title={FIELD_DESCRIPTIONS.hitPointsTemp}>
            +{hitPoints.temporary}
          </span>
        )}
      </div>
      <div
        className="final-hp-hero__bar"
        role="progressbar"
        aria-valuenow={hitPoints.current}
        aria-valuemin={0}
        aria-valuemax={max}
      >
        <div className="final-hp-hero__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="final-hp-hero__meta">
        <DisplayStat label="Atual" value={hitPoints.current} compact accent="emerald" />
        <DisplayStat label="Temp." value={hitPoints.temporary || '—'} compact />
        <DisplayStat label="Máx." value={hitPoints.maximum} compact accent="slate" />
      </div>
    </div>
  );
}
