import {
  AppearanceSection,
  BackstorySection,
  FellowshipSection,
} from '../sections/DetailsSection';
import { SHEET_SECTIONS } from '../../../shared/constants/appLabels';
import { SECTION_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { SheetPanel } from './SheetPanel';

export function SheetStoryTab() {
  return (
    <div className="sheet-page-2">
      <div className="sheet-page2-grid">
        <SheetPanel
          title={SHEET_SECTIONS.fellowship}
          description={SECTION_DESCRIPTIONS.fellowship}
          accent="emerald"
        >
          <FellowshipSection />
        </SheetPanel>
        <SheetPanel
          title="Aparência"
          description={SECTION_DESCRIPTIONS.appearance}
          accent="gold"
        >
          <AppearanceSection />
        </SheetPanel>
      </div>

      <SheetPanel
        title={SHEET_SECTIONS.storyChronicle}
        description={SECTION_DESCRIPTIONS.backstory}
        accent="slate"
        className="sheet-panel--story"
      >
        <BackstorySection />
      </SheetPanel>
    </div>
  );
}
