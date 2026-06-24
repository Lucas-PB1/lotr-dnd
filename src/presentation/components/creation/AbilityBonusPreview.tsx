import { Badge } from 'flowbite-react';
import type { AbilityBonusSource } from '../../../domain/services/AbilityBonusService';
import type { AbilityName } from '../../../shared/constants/gameConstants';
import { ABILITY_LABELS } from '../../../shared/constants/gameConstants';

interface AbilityBonusPreviewProps {
  sources: AbilityBonusSource[];
}

export function AbilityBonusPreview({ sources }: AbilityBonusPreviewProps) {
  if (sources.length === 0) return null;

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
