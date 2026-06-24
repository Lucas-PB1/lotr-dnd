import { useMemo } from 'react';
import { CharacterFeaturesService } from '../../../../domain/services/CharacterFeaturesService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function SheetPlayVirtuesPanel() {
  const { character } = useCharacterSheet();

  const cards = useMemo(
    () => CharacterFeaturesService.getFeatureCards(character.creationChoices),
    [character.creationChoices],
  );

  if (cards.length === 0) {
    return null;
  }

  return (
    <section className="st-sheet-block st-sheet-virtues" aria-label={SHEET_PLAY_UI.virtues}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.virtues}</h4>
      <ul className="st-sheet-virtues__list">
        {cards.map((card) => (
          <li key={card.id} className="st-sheet-virtues__card">
            <strong>{card.title}</strong>
            {card.subtitle ? <span className="st-sheet-virtues__sub">{card.subtitle}</span> : null}
            {card.lines.slice(0, 2).map((line) => (
              <p key={line} className="st-sheet-virtues__line">
                {line}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </section>
  );
}
