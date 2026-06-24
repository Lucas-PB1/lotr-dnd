import {
  AbilitiesAndSavesPanel,
  HeaderSection,
} from '../sections/HeaderAndAbilities';
import { SkillsSection } from '../sections/SkillsSection';
import { CombatVitalityPanel } from '../sections/CombatSection';
import { EquipmentSection } from '../sections/DetailsSection';
import { SECTION_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { Section } from '../ui/FormFields';
import { SheetPanel } from './SheetPanel';

export function SheetMainTab() {
  return (
    <div className="sheet-page-1">
      <Section
        title="Identidade"
        description={SECTION_DESCRIPTIONS.identity}
        icon="⚔"
        className="sheet-page-1__identity"
      >
        <HeaderSection />
      </Section>

      <div className="sheet-main-grid">
        <SheetPanel
          title="Atributos & Resistências"
          description={SECTION_DESCRIPTIONS.abilities}
          accent="gold"
          className="sheet-panel--left"
        >
          <AbilitiesAndSavesPanel />
        </SheetPanel>

        <SheetPanel
          title="Perícias"
          description={SECTION_DESCRIPTIONS.skills}
          accent="emerald"
          className="sheet-panel--skills"
        >
          <SkillsSection />
        </SheetPanel>

        <SheetPanel
          title="Combate & Vitalidade"
          description={SECTION_DESCRIPTIONS.vitality}
          accent="slate"
          className="sheet-panel--combat"
        >
          <CombatVitalityPanel />
        </SheetPanel>
      </div>

      <Section
        title="Equipamento, Traços & Recompensas"
        description={SECTION_DESCRIPTIONS.equipment}
        icon="🎒"
      >
        <EquipmentSection />
      </Section>
    </div>
  );
}
