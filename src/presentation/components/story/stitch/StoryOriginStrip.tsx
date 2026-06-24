import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../../domain/services/StorySuggestionsService';
import { DISTINCTIVE_FEATURE_LABELS } from '../../../../shared/data/storySuggestionsData';
import { STORY_UI } from '../../../../shared/constants/storyLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function StoryOriginStrip() {
  const { character } = useCharacterSheet();

  const ctx = useMemo(
    () => StorySuggestionsService.getContext(character.creationChoices),
    [character.creationChoices],
  );

  if (!ctx) {
    return (
      <aside className="st-story-origin st-story-origin--empty">
        <p className="st-story-origin__empty">{STORY_UI.originEmpty}</p>
      </aside>
    );
  }

  return (
    <aside className="st-story-origin" aria-label={STORY_UI.originTitle}>
      <p className="st-story-origin__eyebrow">{STORY_UI.originTitle}</p>
      <div className="st-story-origin__chips">
        <span className="st-story-chip">{ctx.cultureName}</span>
        {ctx.backgroundName ? <span className="st-story-chip">{ctx.backgroundName}</span> : null}
        {ctx.callingName ? <span className="st-story-chip">{ctx.callingName}</span> : null}
        {ctx.distinctiveFeatures.map((f) => (
          <span key={f} className="st-story-chip st-story-chip--muted">
            {DISTINCTIVE_FEATURE_LABELS[f] ?? f}
          </span>
        ))}
      </div>
      {(ctx.backgroundSummary || ctx.callingDescription) && (
        <details className="st-story-origin__details">
          <summary>{STORY_UI.originExpand}</summary>
          <div className="st-story-origin__body">
            {ctx.backgroundSummary ? <p>{ctx.backgroundSummary}</p> : null}
            {ctx.callingDescription ? <p>{ctx.callingDescription}</p> : null}
            {ctx.shadowPath ? (
              <p className="st-story-origin__shadow">Sombra · {ctx.shadowPath}</p>
            ) : null}
          </div>
        </details>
      )}
    </aside>
  );
}
