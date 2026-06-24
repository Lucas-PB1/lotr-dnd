import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';

interface DeathSaveDotsProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  variant: 'success' | 'failure';
  description?: string;
}

function DeathSaveDots({ label, value, onChange, variant, description }: DeathSaveDotsProps) {
  return (
    <div className="death-dots" title={description}>
      <span className="death-dots__label">{label}</span>
      <div className="death-dots__track" role="group" aria-label={label}>
        {Array.from({ length: 3 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`death-dot death-dot--${variant} ${i < value ? 'death-dot--filled' : ''}`}
            aria-label={`${label} ${i + 1} de 3`}
            aria-pressed={i < value}
            onClick={() => onChange(i < value && value === i + 1 ? i : i + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export function DeathSavesSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { deathSaves } = character;

  return (
    <div className="combat-accordion__body">
      <DeathSaveDots
        label="Sucessos"
        value={deathSaves.successes}
        variant="success"
        description={FIELD_DESCRIPTIONS.deathSaveSuccesses}
        onChange={(successes) =>
          updateCharacter({ deathSaves: { ...deathSaves, successes } })
        }
      />
      <DeathSaveDots
        label="Falhas"
        value={deathSaves.failures}
        variant="failure"
        description={FIELD_DESCRIPTIONS.deathSaveFailures}
        onChange={(failures) =>
          updateCharacter({ deathSaves: { ...deathSaves, failures } })
        }
      />
    </div>
  );
}
