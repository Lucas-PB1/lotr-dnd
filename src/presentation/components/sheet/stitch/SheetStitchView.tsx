import { SheetPlayAbilitiesPanel } from './SheetPlayAbilitiesPanel';
import { SheetPlayAttacksPanel } from './SheetPlayAttacksPanel';
import { SheetPlayCombatStrip } from './SheetPlayCombatStrip';
import { SheetPlayDeathSaves } from './SheetPlayDeathSaves';
import { SheetPlayHero } from './SheetPlayHero';
import { SheetPlayHpBlock } from './SheetPlayHpBlock';
import { SheetPlayReferencePanel } from './SheetPlayReferencePanel';
import { SheetPlaySavesPanel } from './SheetPlaySavesPanel';
import { SheetPlaySkillsPanel } from './SheetPlaySkillsPanel';
import { SheetPlayToolbar } from './SheetPlayToolbar';

export function SheetStitchView() {
  return (
    <div className="st-sheet">
      <SheetPlayToolbar />
      <SheetPlayHero />

      <div className="st-sheet-play-grid">
        <div className="st-sheet-play-col st-sheet-play-col--combat">
          <SheetPlayHpBlock />
          <SheetPlayCombatStrip />
          <SheetPlayDeathSaves />
          <SheetPlayAttacksPanel />
        </div>

        <div className="st-sheet-play-col st-sheet-play-col--stats">
          <SheetPlayAbilitiesPanel />
          <SheetPlaySavesPanel />
          <SheetPlaySkillsPanel />
        </div>
      </div>

      <SheetPlayReferencePanel />
    </div>
  );
}
