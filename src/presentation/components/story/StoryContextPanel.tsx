import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../domain/services/StorySuggestionsService';
import { DISTINCTIVE_FEATURE_LABELS } from '../../../shared/data/storySuggestionsData';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { LoreScroll } from './LorePicker';

export function StoryContextPanel() {
  const { character } = useCharacterSheet();

  const ctx = useMemo(
    () => StorySuggestionsService.getContext(character.creationChoices),
    [character.creationChoices],
  );

  if (!ctx) {
    return (
      <LoreScroll title="Origem" badge="Criação">
        <p className="lore-scroll__empty">
          Complete cultura, antecedente e chamado para ver o pano de fundo do livro.
        </p>
      </LoreScroll>
    );
  }

  return (
    <LoreScroll title="Origem na Terra-média" badge="Cap. III">
      <dl className="lore-provenance">
        <div className="lore-provenance__row">
          <dt>Povo</dt>
          <dd>
            {ctx.cultureName}
            {ctx.subcultureName ? ` · ${ctx.subcultureName}` : ''}
          </dd>
        </div>

        {ctx.backgroundName && (
          <div className="lore-provenance__row lore-provenance__row--wide">
            <dt>Antecedente</dt>
            <dd>
              <strong>{ctx.backgroundName}</strong>
              {ctx.backgroundSummary && (
                <p className="lore-provenance__quote">{ctx.backgroundSummary}</p>
              )}
            </dd>
          </div>
        )}

        {ctx.distinctiveFeatures.length > 0 && (
          <div className="lore-provenance__traits">
            {ctx.distinctiveFeatures.map((f) => (
              <span key={f} className="lore-provenance__trait">
                {DISTINCTIVE_FEATURE_LABELS[f] ?? f}
              </span>
            ))}
          </div>
        )}

        {ctx.callingName && (
          <div className="lore-provenance__row lore-provenance__row--wide">
            <dt>Chamado</dt>
            <dd>
              <strong>{ctx.callingName}</strong>
              {ctx.callingDescription && (
                <p className="lore-provenance__quote">{ctx.callingDescription}</p>
              )}
              {ctx.shadowPath && (
                <p className="lore-provenance__shadow">Sombra · {ctx.shadowPath}</p>
              )}
            </dd>
          </div>
        )}
      </dl>
    </LoreScroll>
  );
}
