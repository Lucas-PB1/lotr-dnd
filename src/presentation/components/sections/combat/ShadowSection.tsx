import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { CheckboxField, NumberField, TextField } from '../../ui/FormFields';

export function ShadowSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { shadow } = character;

  const updateShadow = (partial: Partial<typeof shadow>) => {
    updateCharacter({ shadow: { ...shadow, ...partial } });
  };

  return (
    <div className="combat-accordion__body combat-accordion__body--stack">
      <NumberField
        label="Pontuação"
        value={shadow.score}
        onChange={(score) => updateShadow({ score })}
        description={FIELD_DESCRIPTIONS.shadowScore}
        compact
      />
      <div className="combat-check-row">
        <CheckboxField
          label="Miserável"
          checked={shadow.miserable}
          onChange={(miserable) => updateShadow({ miserable })}
          description={FIELD_DESCRIPTIONS.shadowMiserable}
          compact
        />
        <CheckboxField
          label="Angustiado"
          checked={shadow.anguished}
          onChange={(anguished) => updateShadow({ anguished })}
          description={FIELD_DESCRIPTIONS.shadowAnguished}
          compact
        />
      </div>
      <TextField
        label="Cicatrizes"
        value={shadow.scars}
        onChange={(scars) => updateShadow({ scars })}
        description={FIELD_DESCRIPTIONS.shadowScars}
        compact
        placeholder="Opcional"
      />
    </div>
  );
}
