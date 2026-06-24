import { Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow, TextInput } from 'flowbite-react';
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
      <div className="overflow-x-auto">
        <Table hoverable className="text-sm">
          <TableHead>
            <TableRow>
              <TableHeadCell>Arma</TableHeadCell>
              <TableHeadCell>Bônus Atq.</TableHeadCell>
              <TableHeadCell>Dano</TableHeadCell>
              <TableHeadCell>Alcance</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {character.attacks.map((attack, index) => (
              <TableRow key={index}>
                <TableCell>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.weapon}
                    placeholder="Arma"
                    onChange={(e) => updateAttack(index, { weapon: e.target.value })}
                    className="bg-white/60"
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.atkBonus}
                    placeholder="+0"
                    onChange={(e) => updateAttack(index, { atkBonus: e.target.value })}
                    className="bg-white/60"
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.damage}
                    placeholder="1d8"
                    onChange={(e) => updateAttack(index, { damage: e.target.value })}
                    className="bg-white/60"
                  />
                </TableCell>
                <TableCell>
                  <TextInput
                    sizing="sm"
                    color="gray"
                    value={attack.range}
                    placeholder="1,5m"
                    onChange={(e) => updateAttack(index, { range: e.target.value })}
                    className="bg-white/60"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
