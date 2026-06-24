import { useState } from 'react';
import { Badge, Button } from 'flowbite-react';
import { ABILITY_LABELS, ABILITY_NAMES } from '../../../shared/constants/gameConstants';
import { AbilityBonusService } from '../../../domain/services/AbilityBonusService';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { AbilityBonusesModal } from './AbilityBonusesModal';

function formatSourceBonuses(bonuses: Partial<Record<string, number>>): string {
  const parts = ABILITY_NAMES.filter((a) => (bonuses[a] ?? 0) !== 0).map((a) => {
    const v = bonuses[a] ?? 0;
    return `${ABILITY_LABELS[a].slice(0, 3)} ${v > 0 ? '+' : ''}${v}`;
  });
  return parts.length > 0 ? parts.join(', ') : 'sem bônus';
}

export function AbilityBonusesSection() {
  const { character } = useCharacterSheet();
  const [modalOpen, setModalOpen] = useState(false);
  const sources = character.abilityBonusSources ?? [];
  const totals = AbilityBonusService.getAllBonuses(sources);
  const hasAnyBonus = ABILITY_NAMES.some((a) => totals[a] !== 0);

  return (
    <>
      <div className="bonus-summary">
        <div className="bonus-summary__header">
          <div className="bonus-summary__title-row">
            <span className="bonus-summary__title">Bônus de atributos</span>
            {sources.length > 0 && (
              <Badge color="info" size="xs">
                {sources.length}
              </Badge>
            )}
          </div>
          <Button size="xs" color="warning" onClick={() => setModalOpen(true)}>
            {sources.length === 0 ? 'Adicionar' : 'Editar'}
          </Button>
        </div>

        {sources.length === 0 ? (
          <p className="bonus-summary__empty">Cultura, chamado, virtudes e outros bônus somam aqui.</p>
        ) : (
          <>
            <ul className="bonus-summary__list">
              {sources.map((source) => (
                <li key={source.id} className="bonus-summary__item">
                  <span className="bonus-summary__item-label">{source.label || 'Sem nome'}</span>
                  <span className="bonus-summary__item-bonuses">{formatSourceBonuses(source.bonuses)}</span>
                </li>
              ))}
            </ul>

            {hasAnyBonus && (
              <div className="bonus-summary__totals">
                {ABILITY_NAMES.map((ability) => {
                  const v = totals[ability];
                  if (v === 0) return null;
                  return (
                    <span key={ability} className="bonus-summary__total-chip">
                      {ABILITY_LABELS[ability].slice(0, 3)} {v > 0 ? '+' : ''}
                      {v}
                    </span>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      <AbilityBonusesModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
