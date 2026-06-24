import { useMemo } from 'react';
import { AttackRollService } from '../../../../domain/services/AttackRollService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { SheetPlayAttackRow } from './SheetPlayAttackRow';

export function SheetPlayAttacksPanel() {
  const { character } = useCharacterSheet();

  const weaponAttacks = useMemo(
    () => AttackRollService.getEquippedWeaponAttacks(character),
    [character],
  );

  return (
    <section className="st-sheet-block st-sheet-attacks" aria-label={SHEET_PLAY_UI.attacks}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.attacks}</h4>
      {weaponAttacks.length === 0 ? (
        <p className="st-sheet-attacks__hint">{SHEET_PLAY_UI.attacksHint}</p>
      ) : (
        <ul className="st-sheet-attacks__list">
          {weaponAttacks.map((attack) => (
            <SheetPlayAttackRow key={attack.instanceId} attack={attack} />
          ))}
        </ul>
      )}
    </section>
  );
}
