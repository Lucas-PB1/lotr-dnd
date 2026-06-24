import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { DisplayStat } from '../DisplayField';

interface FinalCombatStripProps {
  inspiration: boolean;
  proficiencyBonus: number;
  armorClass: number;
  initiative: number;
  speed: number;
}

function formatMod(n: number) {
  return n >= 0 ? `+${n}` : `${n}`;
}

export function FinalCombatStrip({
  inspiration,
  proficiencyBonus,
  armorClass,
  initiative,
  speed,
}: FinalCombatStripProps) {
  return (
    <div className="final-combat-strip">
      <div
        className={`final-inspiration-chip ${inspiration ? 'final-inspiration-chip--active' : ''}`}
        title={FIELD_DESCRIPTIONS.inspiration}
      >
        <span aria-hidden>✦</span>
        {inspiration ? 'Inspirado' : 'Inspiração'}
      </div>
      <div className="final-combat-strip__stats">
        <DisplayStat
          label="Prof."
          value={formatMod(proficiencyBonus)}
          description={FIELD_DESCRIPTIONS.proficiencyBonus}
          compact
        />
        <DisplayStat
          label="CA"
          value={armorClass}
          description={FIELD_DESCRIPTIONS.armorClass}
          accent="slate"
          compact
        />
        <DisplayStat
          label="Inic."
          value={formatMod(initiative)}
          description={FIELD_DESCRIPTIONS.initiative}
          compact
        />
        <DisplayStat
          label="Desl."
          value={`${speed}m`}
          description={FIELD_DESCRIPTIONS.speed}
          accent="emerald"
          compact
        />
      </div>
    </div>
  );
}
