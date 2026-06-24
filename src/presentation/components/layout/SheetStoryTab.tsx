import {
  AppearanceSection,
  BackstorySection,
  FellowshipSection,
} from '../sections/DetailsSection';
import { Section } from '../ui/FormFields';

export function SheetStoryTab() {
  return (
    <div className="sheet-page-2">
      <div className="sheet-page2-grid">
        <Section title="Comunidade & Herdeiro">
          <FellowshipSection />
        </Section>
        <Section title="Aparência">
          <AppearanceSection />
        </Section>
      </div>
      <Section title="História & Notas Adicionais">
        <BackstorySection />
      </Section>
    </div>
  );
}
