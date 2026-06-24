import { useMemo } from 'react';
import { CharacterFeaturesService } from '../../../domain/services/CharacterFeaturesService';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

interface TraitsVirtuesPanelProps {
  compact?: boolean;
}

export function TraitsVirtuesPanel({ compact = false }: TraitsVirtuesPanelProps) {
  const { character } = useCharacterSheet();

  const cards = useMemo(
    () => CharacterFeaturesService.getFeatureCards(character.creationChoices),
    [character.creationChoices],
  );

  const proficiencies = useMemo(
    () => CharacterFeaturesService.getProficiencyEntries(character),
    [character],
  );

  if (cards.length === 0 && proficiencies.length === 0) {
    const fallback = character.featuresTraitsVirtues.trim();
    if (!fallback) {
      return (
        <p className="traits-panel__empty">
          Complete a criação do personagem para ver cultura, chamado e virtudes.
        </p>
      );
    }
    return (
      <div className="traits-panel traits-panel--fallback">
        <pre className="traits-panel__pre">{fallback}</pre>
      </div>
    );
  }

  return (
    <div className={`traits-panel${compact ? ' traits-panel--compact' : ''}`}>
      {proficiencies.length > 0 && (
        <div className="traits-panel__proficiencies">
          <h3 className="traits-panel__section-title">Proficiências</h3>
          <ul className="traits-panel__prof-list">
            {proficiencies.map((entry) => (
              <li key={entry.id} className="traits-panel__prof">
                <span className="traits-panel__prof-source">{entry.source}</span>
                <span className="traits-panel__prof-text">{entry.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {cards.length > 0 && (
        <div className="traits-panel__cards">
          <h3 className="traits-panel__section-title">Traços &amp; virtudes</h3>
          <div className="traits-panel__grid">
            {cards.map((card) => (
              <article
                key={card.id}
                className={`traits-card traits-card--${card.kind}`}
              >
                <header className="traits-card__head">
                  <h4 className="traits-card__title">{card.title}</h4>
                  {card.subtitle && (
                    <span className="traits-card__subtitle">{card.subtitle}</span>
                  )}
                </header>
                {card.lines.map((line) => (
                  <p key={line} className="traits-card__line">
                    {line}
                  </p>
                ))}
                {card.tags.length > 0 && (
                  <div className="traits-card__tags">
                    {card.tags.map((tag) => (
                      <span
                        key={tag.text}
                        className={`traits-card__tag traits-card__tag--${tag.kind}`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
