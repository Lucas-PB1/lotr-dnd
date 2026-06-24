import { Badge } from 'flowbite-react';
import type { AbilityBonusSource } from '../../../domain/services/AbilityBonusService';
import type { AbilityName } from '../../../shared/constants/gameConstants';
import { ABILITY_LABELS } from '../../../shared/constants/gameConstants';
import { CREATION_UI } from '../../../shared/constants/creationLabels';

interface AbilityBonusPreviewProps {
  sources: AbilityBonusSource[];
  variant?: 'legacy' | 'stitch';
}

export function AbilityBonusPreview({ sources, variant = 'legacy' }: AbilityBonusPreviewProps) {
  if (sources.length === 0) return null;

  if (variant === 'stitch') {
    return (
      <div className="st-creation-bonus">
        <p className="st-creation-bonus__title">{CREATION_UI.bonusTitle}</p>
        <div className="st-creation-bonus__chips">
          {sources.map((src) => (
            <span key={src.id} className="st-creation-bonus__chip">
              {src.label}:{' '}
              {Object.entries(src.bonuses)
                .map(
                  ([k, v]) =>
                    `${ABILITY_LABELS[k as AbilityName]?.slice(0, 3) ?? k} ${v! >= 0 ? '+' : ''}${v}`,
                )
                .join(', ')}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bonus-preview rounded-lg border border-amber-300/50 bg-white/40 p-3">
      <p className="mb-2 text-xs font-bold uppercase text-amber-900/70">Bônus de atributos aplicados</p>
      <div className="flex flex-wrap gap-2">
        {sources.map((src) => (
          <Badge key={src.id} color="info">
            {src.label}:{' '}
            {Object.entries(src.bonuses)
              .map(
                ([k, v]) =>
                  `${ABILITY_LABELS[k as AbilityName]?.slice(0, 3) ?? k} ${v! >= 0 ? '+' : ''}${v}`,
              )
              .join(', ')}
          </Badge>
        ))}
      </div>
    </div>
  );
}
