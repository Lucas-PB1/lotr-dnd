import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { NumberField } from '../../ui/FormFields';

export function DeathSavesSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { deathSaves } = character;

  return (
    <div className="death-saves">
      <h3 className="subsection-title">Salvaguardas contra Morte</h3>
      <div className="death-saves__grid">
        <NumberField
          label="Sucessos"
          value={deathSaves.successes}
          min={0}
          max={3}
          onChange={(successes) =>
            updateCharacter({ deathSaves: { ...deathSaves, successes } })
          }
        />
        <NumberField
          label="Falhas"
          value={deathSaves.failures}
          min={0}
          max={3}
          onChange={(failures) =>
            updateCharacter({ deathSaves: { ...deathSaves, failures } })
          }
        />
      </div>
    </div>
  );
}
