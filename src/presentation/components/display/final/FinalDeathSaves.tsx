import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import type { DeathSavesProps } from '../../../../domain/value-objects/CharacterValues';

interface DeathSaveDotsDisplayProps {
  label: string;
  value: number;
  variant: 'success' | 'failure';
  description?: string;
}

function DeathSaveDotsDisplay({ label, value, variant, description }: DeathSaveDotsDisplayProps) {
  return (
    <div className="final-death-dots" title={description}>
      <span className="final-death-dots__label">{label}</span>
      <div className="final-death-dots__track" aria-label={`${label}: ${value} de 3`}>
        {Array.from({ length: 3 }, (_, i) => (
          <span
            key={i}
            className={`final-death-dot final-death-dot--${variant} ${i < value ? 'final-death-dot--filled' : ''}`}
          />
        ))}
      </div>
    </div>
  );
}

interface FinalDeathSavesProps {
  deathSaves: DeathSavesProps;
}

export function FinalDeathSaves({ deathSaves }: FinalDeathSavesProps) {
  return (
    <div className="final-death-saves">
      <DeathSaveDotsDisplay
        label="Sucessos"
        value={deathSaves.successes}
        variant="success"
        description={FIELD_DESCRIPTIONS.deathSaveSuccesses}
      />
      <DeathSaveDotsDisplay
        label="Falhas"
        value={deathSaves.failures}
        variant="failure"
        description={FIELD_DESCRIPTIONS.deathSaveFailures}
      />
    </div>
  );
}
