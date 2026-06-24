import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

function formatMod(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

export function SheetPlayCombatStrip() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <section className="st-sheet-block st-sheet-combat" aria-label={SHEET_PLAY_UI.combat}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.combat}</h4>
      <button
        type="button"
        className={`st-sheet-inspiration${character.inspiration ? ' st-sheet-inspiration--on' : ''}`}
        onClick={() => updateCharacter({ inspiration: !character.inspiration })}
        title={FIELD_DESCRIPTIONS.inspiration}
        aria-pressed={character.inspiration}
      >
        <span aria-hidden>✦</span>
        {character.inspiration ? SHEET_PLAY_UI.inspired : SHEET_PLAY_UI.inspiration}
      </button>
      <div className="st-sheet-combat__grid">
        <div className="st-sheet-stat">
          <span className="st-sheet-stat__label">Prof.</span>
          <span className="st-sheet-stat__value">{formatMod(character.proficiencyBonus)}</span>
        </div>
        <div className="st-sheet-stat st-sheet-stat--accent">
          <span className="st-sheet-stat__label">CA</span>
          <span className="st-sheet-stat__value">{character.armorClass}</span>
        </div>
        <div className="st-sheet-stat">
          <span className="st-sheet-stat__label">Inic.</span>
          <span className="st-sheet-stat__value">{formatMod(character.initiative)}</span>
        </div>
        <div className="st-sheet-stat st-sheet-stat--speed">
          <span className="st-sheet-stat__label">Desl.</span>
          <span className="st-sheet-stat__value">{character.speed}m</span>
        </div>
      </div>
    </section>
  );
}
