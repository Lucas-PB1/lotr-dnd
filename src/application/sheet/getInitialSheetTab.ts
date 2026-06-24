import type { CharacterProps } from '../../domain/entities/Character';
import type { SheetTabId } from '../../presentation/components/layout/shell/sheetTabTypes';

/** Aba inicial ao abrir a ficha — heróis finalizados vão direto para a ficha completa. */
export function getInitialSheetTab(character: CharacterProps): SheetTabId {
  return character.sheetFinalized ? 'summary' : 'creation';
}
