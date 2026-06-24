import {
  AppearanceSection,
  BackstorySection,
  FellowshipSection,
} from '../sections/DetailsSection';
import { SECTION_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { Section } from '../ui/FormFields';

export function SheetStoryTab() {
  return (
    <div className="sheet-page-2">
      <div className="sheet-page2-grid">
        <Section
          title="Comunidade & Herdeiro"
          description={SECTION_DESCRIPTIONS.fellowship}
          icon="🏛"
        >
          <FellowshipSection />
        </Section>
        <Section
          title="Aparência"
          description={SECTION_DESCRIPTIONS.appearance}
          icon="👤"
        >
          <AppearanceSection />
        </Section>
      </div>
      <Section
        title="História & Notas Adicionais"
        description={SECTION_DESCRIPTIONS.backstory}
        icon="📜"
      >
        <BackstorySection />
      </Section>
    </div>
  );
}
