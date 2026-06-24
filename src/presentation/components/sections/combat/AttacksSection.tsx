import { TextInput } from 'flowbite-react';
import type { AttackProps } from '../../../../domain/value-objects/CharacterValues';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

export function AttacksSection() {
  const { character, updateCharacter } = useCharacterSheet();

  const updateAttack = (index: number, partial: Partial<AttackProps>) => {
    const attacks = character.attacks.map((atk, i) =>
      i === index ? { ...atk, ...partial } : atk,
    );
    updateCharacter({ attacks });
  };

  return (
    <div className="attacks-panel">
      <h3 className="subsection-title">Ataques</h3>
      <div className="attacks-table-wrap">
        <table className="attacks-table">
          <thead>
            <tr>
              <th>Arma</th>
              <th>Bônus Atq.</th>
              <th>Dano</th>
              <th>Alcance</th>
            </tr>
          </thead>
          <tbody>
            {character.attacks.map((attack, index) => (
              <tr key={index}>
                <td>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.weapon}
                    placeholder="Arma"
                    onChange={(e) => updateAttack(index, { weapon: e.target.value })}
                    className="field__input"
                  />
                </td>
                <td>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.atkBonus}
                    placeholder="+0"
                    onChange={(e) => updateAttack(index, { atkBonus: e.target.value })}
                    className="field__input field__input--number"
                  />
                </td>
                <td>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.damage}
                    placeholder="1d8"
                    onChange={(e) => updateAttack(index, { damage: e.target.value })}
                    className="field__input"
                  />
                </td>
                <td>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.range}
                    placeholder="1,5 m"
                    onChange={(e) => updateAttack(index, { range: e.target.value })}
                    className="field__input"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
