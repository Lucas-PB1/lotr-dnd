import { CREATION_UI } from '../../../../shared/constants/creationLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { useSheetNavigation } from '../../../context/SheetNavigationContext';

type CreationFinalizeBarProps = {
  creationComplete: boolean;
};

export function CreationFinalizeBar({ creationComplete }: CreationFinalizeBarProps) {
  const { character, updateCharacter } = useCharacterSheet();
  const { goToTab } = useSheetNavigation();

  const openSheet = () => {
    if (!character.sheetFinalized) {
      updateCharacter({ sheetFinalized: true });
    }
    goToTab('summary');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (character.sheetFinalized) {
    return (
      <footer className="st-creation-finalize st-creation-finalize--done">
        <p className="st-creation-finalize__hint">{CREATION_UI.alreadyFinalized}</p>
        <button type="button" className="st-creation-finalize__btn" onClick={openSheet}>
          {CREATION_UI.openSheetButton}
        </button>
      </footer>
    );
  }

  return (
    <footer className="st-creation-finalize">
      <div className="st-creation-finalize__copy">
        <p className="st-creation-finalize__title">{CREATION_UI.finalizeTitle}</p>
        <p className="st-creation-finalize__hint">
          {creationComplete ? CREATION_UI.finalizeHint : CREATION_UI.finalizeDisabled}
        </p>
      </div>
      <button
        type="button"
        className="st-creation-finalize__btn st-creation-finalize__btn--primary"
        disabled={!creationComplete}
        onClick={openSheet}
      >
        {CREATION_UI.finalizeButton}
      </button>
    </footer>
  );
}
