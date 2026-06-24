import { useMemo, type ReactNode } from 'react';
import { CreationManuscriptSection } from '../../creation/stitch/CreationManuscriptSection';
import {
  STORY_SECTION_NUMERALS,
  STORY_UI,
  type StorySectionId,
} from '../../../../shared/constants/storyLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { StoryAppearancePanel } from './StoryAppearancePanel';
import { StoryChroniclePanel } from './StoryChroniclePanel';
import { StoryFellowshipPanel } from './StoryFellowshipPanel';
import { StoryOriginStrip } from './StoryOriginStrip';
import { StoryProgressHeader, useStoryProgressFilled } from './StoryProgressHeader';
import { getStorySectionSummary } from './storySectionSummaries';
import { isStorySectionComplete } from './storySectionStatus';

const STORY_SECTIONS: { id: StorySectionId; title: string; content: ReactNode }[] = [
  { id: 'appearance', title: STORY_UI.sectionAppearance, content: <StoryAppearancePanel /> },
  { id: 'fellowship', title: STORY_UI.sectionFellowship, content: <StoryFellowshipPanel /> },
  { id: 'chronicle', title: STORY_UI.sectionChronicle, content: <StoryChroniclePanel /> },
];

export function StoryStitchView() {
  const { character } = useCharacterSheet();
  const filled = useStoryProgressFilled(character);

  const defaultOpenId = useMemo(() => {
    const incomplete = STORY_SECTIONS.find((s) => !isStorySectionComplete(s.id, character));
    return incomplete?.id ?? 'appearance';
  }, [character]);

  return (
    <div className="st-story">
      <StoryProgressHeader filled={filled} />
      <StoryOriginStrip />

      <div className="st-story-flow">
        {STORY_SECTIONS.map((section, index) => (
          <CreationManuscriptSection
            key={section.id}
            numeral={STORY_SECTION_NUMERALS[index]}
            title={section.title}
            complete={isStorySectionComplete(section.id, character)}
            summary={getStorySectionSummary(section.id, character)}
            defaultOpen={section.id === defaultOpenId}
          >
            {section.content}
          </CreationManuscriptSection>
        ))}
      </div>
    </div>
  );
}
