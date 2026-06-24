import { useMemo } from 'react';
import { AttackRollService } from '../../../../domain/services/AttackRollService';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function AttacksSection() {
  const { character } = useCharacterSheet();

  const weaponAttacks = useMemo(
    () => AttackRollService.getEquippedWeaponAttacks(character),
    [character],
  );

  const extraAttacks = useMemo(() => {
    return character.attacks.slice(weaponAttacks.length);
  }, [character.attacks, weaponAttacks.length]);

  return (
    <div className="attacks-panel">
      <h3 className="subsection-title">Ataques &amp; dano</h3>

      {weaponAttacks.length === 0 ? (
        <p className="attacks-panel__hint">
          Equipe uma arma no inventário para ver bônus de ataque e dano calculados.
        </p>
      ) : (
        <div className="attack-roll-list">
          {weaponAttacks.map((roll) => (
            <article key={roll.instanceId} className="attack-roll-card">
              <header className="attack-roll-card__head">
                <h4 className="attack-roll-card__name">{roll.weaponName}</h4>
                {!roll.proficient && (
                  <span className="attack-roll-card__tag attack-roll-card__tag--warn">
                    sem proficiência
                  </span>
                )}
              </header>

              <div className="attack-roll-card__row">
                <span className="attack-roll-card__label">Ataque</span>
                <span className="attack-roll-card__formula">{roll.attackFormula}</span>
              </div>

              <div className="attack-roll-card__row">
                <span className="attack-roll-card__label">Dano</span>
                <span className="attack-roll-card__formula">{roll.damageFormula}</span>
              </div>

              {roll.range ? (
                <div className="attack-roll-card__meta">Alcance: {roll.range}</div>
              ) : null}

              {roll.properties.length > 0 ? (
                <div className="attack-roll-card__meta">
                  {roll.properties.join(' · ')}
                </div>
              ) : null}

              {roll.breakdown.virtueNotes.length > 0 ? (
                <ul className="attack-roll-card__virtues">
                  {roll.breakdown.virtueNotes.map((note) => (
                    <li key={note}>{note}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      )}

      {extraAttacks.length > 0 && (
        <p className="attacks-panel__hint attacks-panel__hint--spaced">
          Linhas extras (socos, magia, etc.) — edite na ficha final se necessário.
        </p>
      )}

      <p className="attacks-panel__legend">
        Perícias e resistências: use <strong>d20 + modificador</strong> na coluna ao lado.
        Virtudes com vantagem ou condições aparecem como lembrete — aplique na mesa.
      </p>
    </div>
  );
}
