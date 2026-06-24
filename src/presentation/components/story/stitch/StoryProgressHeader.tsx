import { STORY_UI } from '../../../../shared/constants/storyLabels';
import { countStorySectionsComplete } from './storySectionStatus';

type StoryProgressHeaderProps = {
  filled: number;
};

const STORY_SECTION_TOTAL = 3;

export function StoryProgressHeader({ filled }: StoryProgressHeaderProps) {
  const percent = Math.round((filled / STORY_SECTION_TOTAL) * 100);

  return (
    <header className="st-story-header">
      <div className="st-story-header__copy">
        <h2 className="st-story-header__title">{STORY_UI.pageTitle}</h2>
        <p className="st-story-header__hint">{STORY_UI.pageHint}</p>
      </div>
      <div className="st-story-header__progress">
        <div className="st-story-header__progress-meta">
          <span className="st-story-header__progress-label">{STORY_UI.progressLabel}</span>
          <span className="st-story-header__progress-badge">
            {filled}/{STORY_SECTION_TOTAL}
          </span>
        </div>
        <div
          className="st-story-header__progress-track"
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className="st-story-header__progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  );
}

export function useStoryProgressFilled(character: Parameters<typeof countStorySectionsComplete>[0]) {
  return countStorySectionsComplete(character);
}
