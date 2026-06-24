import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function SheetPlayShadowPanel() {
  const { character, updateCharacter } = useCharacterSheet();
  const { shadow } = character;

  const updateShadow = (partial: Partial<typeof shadow>) => {
    updateCharacter({ shadow: { ...shadow, ...partial } });
  };

  return (
    <section className="st-sheet-block st-sheet-shadow" aria-label="Sombra">
      <h4 className="st-sheet-block__title">Sombra</h4>
      <div className="st-sheet-shadow__grid">
        <label className="st-sheet-shadow__field">
          <span>Pontuação</span>
          <input
            type="number"
            value={shadow.score}
            onChange={(e) => updateShadow({ score: Number(e.target.value) || 0 })}
          />
        </label>
        <button
          type="button"
          className={`st-sheet-shadow__toggle${shadow.miserable ? ' st-sheet-shadow__toggle--on' : ''}`}
          aria-pressed={shadow.miserable}
          onClick={() => updateShadow({ miserable: !shadow.miserable })}
        >
          Miserável
        </button>
        <button
          type="button"
          className={`st-sheet-shadow__toggle${shadow.anguished ? ' st-sheet-shadow__toggle--on' : ''}`}
          aria-pressed={shadow.anguished}
          onClick={() => updateShadow({ anguished: !shadow.anguished })}
        >
          Angustiado
        </button>
      </div>
      {shadow.scars.trim() ? <p className="st-sheet-shadow__scars">{shadow.scars}</p> : null}
      <p className="st-sheet-shadow__hint">{SHEET_PLAY_UI.shadowHint}</p>
    </section>
  );
}
