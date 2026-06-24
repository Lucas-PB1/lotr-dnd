import {
  AbilitiesAndSavesPanel,
  CombatStatsSection,
  HeaderSection,
} from '../sections/HeaderAndAbilities';
import { SkillsSection } from '../sections/SkillsSection';
import {
  AttacksSection,
  CurrencySection,
  DeathSavesSection,
  EncumbranceSection,
  HitPointsSection,
  ShadowSection,
} from '../sections/CombatSection';
import { EquipmentSection } from '../sections/DetailsSection';
import { Section } from '../ui/FormFields';
import { SheetPanel } from './SheetPanel';

export function SheetMainTab() {
  return (
    <div className="sheet-page-1">
      <Section title="Identidade">
        <HeaderSection />
      </Section>

      <div className="sheet-main-grid">
        <SheetPanel title="Atributos & Resistências" className="sheet-panel--left">
          <AbilitiesAndSavesPanel />
        </SheetPanel>

        <SheetPanel title="Perícias" className="sheet-panel--skills">
          <SkillsSection />
        </SheetPanel>

        <SheetPanel title="Combate & Vitalidade" className="sheet-panel--combat">
          <CombatStatsSection />

          <div className="combat-subgrid">
            <div className="combat-subgrid__hp">
              <h4 className="mini-title">Pontos de Vida</h4>
              <HitPointsSection />
            </div>
            <div className="combat-subgrid__secondary">
              <DeathSavesSection />
              <ShadowSection />
              <EncumbranceSection />
            </div>
          </div>

          <AttacksSection />
          <CurrencySection />
        </SheetPanel>
      </div>

      <Section title="Equipamento, Traços & Recompensas">
        <EquipmentSection />
      </Section>
    </div>
  );
}
