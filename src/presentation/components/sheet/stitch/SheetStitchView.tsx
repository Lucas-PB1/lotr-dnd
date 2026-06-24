import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { useSheetPdfExport } from '../../../hooks/useSheetPdfExport';
import { SheetPdfContent } from '../pdf/SheetPdfContent';
import { SheetPlayAbilitiesPanel } from './SheetPlayAbilitiesPanel';
import { SheetPlayAttacksPanel } from './SheetPlayAttacksPanel';
import { SheetPlayCombatStrip } from './SheetPlayCombatStrip';
import { SheetPlayDeathSaves } from './SheetPlayDeathSaves';
import { SheetPlayHero } from './SheetPlayHero';
import { SheetPlayHpBlock } from './SheetPlayHpBlock';
import { SheetPlayReferencePanel } from './SheetPlayReferencePanel';
import { SheetPlayShadowPanel } from './SheetPlayShadowPanel';
import { SheetPlayVirtuesPanel } from './SheetPlayVirtuesPanel';
import { SheetPlaySavesPanel } from './SheetPlaySavesPanel';
import { SheetPlaySkillsPanel } from './SheetPlaySkillsPanel';
import { SheetPlayToolbar } from './SheetPlayToolbar';

export function SheetStitchView() {
  const { character } = useCharacterSheet();
  const { pdfRef, exportPdf, exporting, error } = useSheetPdfExport();

  return (
    <div className="st-sheet">
      <SheetPlayToolbar onExportPdf={exportPdf} exportingPdf={exporting} exportError={error} />
      <SheetPlayHero />

      <div className="st-sheet-play-grid">
        <div className="st-sheet-play-col st-sheet-play-col--combat">
          <SheetPlayHpBlock />
          <SheetPlayCombatStrip />
          <SheetPlayDeathSaves />
          <SheetPlayShadowPanel />
          <SheetPlayAttacksPanel />
        </div>

        <div className="st-sheet-play-col st-sheet-play-col--stats">
          <SheetPlayAbilitiesPanel />
          <SheetPlaySavesPanel />
          <SheetPlaySkillsPanel />
          <SheetPlayVirtuesPanel />
        </div>
      </div>

      <SheetPlayReferencePanel />

      <div ref={pdfRef} className="st-pdf-root" aria-hidden="true">
        <SheetPdfContent character={character} />
      </div>
    </div>
  );
}
