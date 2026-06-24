import { useCallback, useRef, useState } from 'react';
import {
  characterSheetPdfFilename,
  exportCharacterSheetPdf,
} from '../../application/export/exportCharacterSheetPdf';
import { useCharacterSheet } from '../context/CharacterSheetContext';

export function useSheetPdfExport() {
  const { character } = useCharacterSheet();
  const pdfRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const exportPdf = useCallback(async () => {
    const node = pdfRef.current;
    if (!node) return;

    setExporting(true);
    setError(null);

    try {
      const filename = characterSheetPdfFilename(character.name);
      await exportCharacterSheetPdf(node, filename);
    } catch {
      setError('Não foi possível gerar o PDF. Tente novamente.');
    } finally {
      setExporting(false);
    }
  }, [character.name]);

  return { pdfRef, exportPdf, exporting, error, clearError: () => setError(null) };
}
