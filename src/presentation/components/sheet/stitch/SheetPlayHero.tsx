import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function SheetPlayHero() {
  const { character } = useCharacterSheet();

  return (
    <header className="st-sheet-hero">
      <span className="st-sheet-hero__badge">{SHEET_PLAY_UI.heroBadge}</span>
      <h3 className="st-sheet-hero__name">{character.name?.trim() || 'Herói sem nome'}</h3>
      <p className="st-sheet-hero__subtitle">
        {[character.callingAndLevel, character.culture].filter(Boolean).join(' · ') || '—'}
      </p>
      <div className="st-sheet-hero__meta">
        {character.playerName.trim() ? (
          <span className="st-sheet-chip" title={FIELD_DESCRIPTIONS.playerName}>
            {character.playerName}
          </span>
        ) : null}
        {character.distinctiveFeatures.trim() ? (
          <span className="st-sheet-chip st-sheet-chip--muted" title={FIELD_DESCRIPTIONS.distinctiveFeatures}>
            {character.distinctiveFeatures}
          </span>
        ) : null}
        {character.shadowPath.trim() ? (
          <span className="st-sheet-chip st-sheet-chip--muted" title={FIELD_DESCRIPTIONS.shadowPath}>
            {character.shadowPath}
          </span>
        ) : null}
      </div>
    </header>
  );
}
