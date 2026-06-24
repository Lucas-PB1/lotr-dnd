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
    <div className="st-sheet-death" title={description}>
      <span className="st-sheet-death__label">{label}</span>
      <div className="st-sheet-death__track" role="group" aria-label={label}>
        {Array.from({ length: 3 }, (_, i) => (
          <button
            key={i}
            type="button"
            className={`st-sheet-death__dot st-sheet-death__dot--${variant}${i < value ? ' st-sheet-death__dot--filled' : ''}`}
            aria-label={`${label} ${i + 1} de 3`}
            aria-pressed={i < value}
            onClick={() => onChange(i < value && value === i + 1 ? i : i + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export function SheetPlayDeathSaves() {
  const { character, updateCharacter } = useCharacterSheet();
  const { deathSaves } = character;

  return (
    <section className="st-sheet-block st-sheet-death-saves" aria-label="Salvaguardas contra a morte">
      <h4 className="st-sheet-block__title">Salvaguardas</h4>
      <DeathSaveDots
        label="Sucessos"
        value={deathSaves.successes}
        variant="success"
        description={FIELD_DESCRIPTIONS.deathSaveSuccesses}
        onChange={(successes) => updateCharacter({ deathSaves: { ...deathSaves, successes } })}
      />
      <DeathSaveDots
        label="Falhas"
        value={deathSaves.failures}
        variant="failure"
        description={FIELD_DESCRIPTIONS.deathSaveFailures}
        onChange={(failures) => updateCharacter({ deathSaves: { ...deathSaves, failures } })}
      />
    </section>
  );
}
