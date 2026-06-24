import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { NumberField, StatBox } from '../../ui/FormFields';

export function HitPointsSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { hitPoints } = character;

  const updateHp = (partial: Partial<typeof hitPoints>) => {
    updateCharacter({ hitPoints: { ...hitPoints, ...partial } });
  };

  return (
    <div className="hp-grid">
      <StatBox label="Máx." value={hitPoints.maximum} sublabel="auto" />
      <NumberField label="Atual" value={hitPoints.current} onChange={(current) => updateHp({ current })} />
      <NumberField label="Temp." value={hitPoints.temporary} onChange={(temporary) => updateHp({ temporary })} />
      <StatBox label="Dados de Vida" value={character.hitDice || '—'} sublabel="auto" />
    </div>
  );
}
