import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { StatBox } from '../../ui/FormFields';

function formatMod(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

export function CombatStatsSection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="combat-strip">
      <button
        type="button"
        className={`inspiration-chip ${character.inspiration ? 'inspiration-chip--active' : ''}`}
        onClick={() => updateCharacter({ inspiration: !character.inspiration })}
        title={FIELD_DESCRIPTIONS.inspiration}
        aria-pressed={character.inspiration}
      >
        <span className="inspiration-chip__icon" aria-hidden>✦</span>
        Inspiração
      </button>

      <div className="combat-strip__stats">
        <StatBox
          label="Prof."
          value={formatMod(character.proficiencyBonus)}
          description={FIELD_DESCRIPTIONS.proficiencyBonus}
          compact
        />
        <StatBox
          label="CA"
          value={character.armorClass}
          description={FIELD_DESCRIPTIONS.armorClass}
          accent="slate"
          compact
        />
        <StatBox
          label="Inic."
          value={`d20 ${formatMod(character.initiative)}`}
          description={FIELD_DESCRIPTIONS.initiative}
          compact
        />
        <StatBox
          label="Desl."
          value={`${character.speed}m`}
          description={FIELD_DESCRIPTIONS.speed}
          accent="emerald"
          compact
        />
      </div>
    </div>
  );
}
