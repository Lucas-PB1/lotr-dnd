import { useMemo, useState } from 'react';
import { AttackRollService, type WeaponAttackRoll } from '../../../../domain/services/AttackRollService';
import {
  formatRollResult,
  rollD20,
  rollDiceNotation,
  type DiceRollResult,
} from '../../../../domain/services/DiceRollService';
import { SHEET_PLAY_UI } from '../../../../shared/constants/sheetLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

type RollKind = 'attack' | 'damage';

interface LastRoll {
  kind: RollKind;
  result: DiceRollResult;
  text: string;
}

function parseDamageFormula(formula: string): { notation: string; modifier: number } | null {
  const match = formula.trim().match(/^(\d+d\d+)([+-]\d+)?/i);
  if (!match) return null;
  const notation = match[1];
  const modifier = match[2] ? Number(match[2]) : 0;
  return { notation, modifier };
}

function rollAttack(attack: WeaponAttackRoll): LastRoll {
  const result = rollD20(attack.attackTotal, attack.weaponName);
  return { kind: 'attack', result, text: formatRollResult(result) };
}

function rollDamage(attack: WeaponAttackRoll): LastRoll | null {
  const parsed = parseDamageFormula(attack.damageFormula);
  if (!parsed) return null;
  const result = rollDiceNotation(parsed.notation, parsed.modifier, attack.weaponName);
  if (!result) return null;
  return { kind: 'damage', result, text: formatRollResult(result) };
}

export function SheetPlayAttacksPanel() {
  const { character } = useCharacterSheet();
  const [lastRolls, setLastRolls] = useState<Record<string, LastRoll>>({});

  const weaponAttacks = useMemo(
    () => AttackRollService.getEquippedWeaponAttacks(character),
    [character],
  );

  const handleRoll = (attack: WeaponAttackRoll, kind: RollKind) => {
    const roll = kind === 'attack' ? rollAttack(attack) : rollDamage(attack);
    if (!roll) return;
    setLastRolls((prev) => ({ ...prev, [attack.instanceId]: roll }));
  };

  return (
    <section className="st-sheet-block st-sheet-attacks" aria-label={SHEET_PLAY_UI.attacks}>
      <h4 className="st-sheet-block__title">{SHEET_PLAY_UI.attacks}</h4>
      {weaponAttacks.length === 0 ? (
        <p className="st-sheet-attacks__hint">{SHEET_PLAY_UI.attacksHint}</p>
      ) : (
        <ul className="st-sheet-attacks__list">
          {weaponAttacks.map((attack) => {
            const last = lastRolls[attack.instanceId];
            return (
              <li key={attack.instanceId} className="st-sheet-attack">
                <div className="st-sheet-attack__head">
                  <span className="st-sheet-attack__name">{attack.weaponName}</span>
                  {!attack.proficient ? (
                    <span className="st-sheet-attack__warn">sem prof.</span>
                  ) : null}
                </div>
                <div className="st-sheet-attack__formulas">
                  <span title="Ataque">{attack.attackFormula}</span>
                  <span title="Dano">{attack.damageFormula}</span>
                </div>
                <div className="st-sheet-attack__actions no-print">
                  <button
                    type="button"
                    className="st-sheet-btn st-sheet-btn--sm"
                    onClick={() => handleRoll(attack, 'attack')}
                  >
                    {SHEET_PLAY_UI.rollAttack}
                  </button>
                  <button
                    type="button"
                    className="st-sheet-btn st-sheet-btn--sm st-sheet-btn--accent"
                    onClick={() => handleRoll(attack, 'damage')}
                  >
                    {SHEET_PLAY_UI.rollDamage}
                  </button>
                </div>
                {last ? (
                  <p className="st-sheet-attack__result" role="status" aria-live="polite">
                    <span className="st-sheet-attack__result-kind">
                      {last.kind === 'attack' ? 'Ataque' : 'Dano'}
                    </span>
                    {last.text}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
