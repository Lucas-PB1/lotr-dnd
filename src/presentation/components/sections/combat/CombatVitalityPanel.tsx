import { AttacksSection } from './AttacksSection';
import { CombatStatsSection } from './CombatStatsSection';
import { CurrencySection } from './CurrencySection';
import { DeathSavesSection } from './DeathSavesSection';
import { EncumbranceSection } from './EncumbranceSection';
import { HitPointsSection } from './HitPointsSection';
import { ShadowSection } from './ShadowSection';

export function CombatVitalityPanel() {
  return (
    <div className="combat-vitality">
      <CombatStatsSection />
      <HitPointsSection />

      <div className="combat-accordion">
        <details className="combat-accordion__item combat-accordion__item--danger" open>
          <summary className="combat-accordion__summary">
            <span>Salvaguardas</span>
            <span className="combat-accordion__hint">0 PV</span>
          </summary>
          <DeathSavesSection />
        </details>

        <details className="combat-accordion__item combat-accordion__item--shadow">
          <summary className="combat-accordion__summary">
            <span>Sombra</span>
          </summary>
          <ShadowSection />
        </details>

        <details className="combat-accordion__item combat-accordion__item--encumbrance">
          <summary className="combat-accordion__summary">
            <span>Sobrecarga</span>
          </summary>
          <EncumbranceSection />
        </details>
      </div>

      <AttacksSection />
      <CurrencySection />
    </div>
  );
}
