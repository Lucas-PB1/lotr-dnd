import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { CheckboxField, TextField } from '../../ui/FormFields';

export function EncumbranceSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { encumbrance } = character;

  const updateEnc = (partial: Partial<typeof encumbrance>) => {
    updateCharacter({ encumbrance: { ...encumbrance, ...partial } });
  };

  return (
    <div className="combat-accordion__body combat-accordion__body--stack">
      <TextField
        label="Peso"
        value={encumbrance.carriedWeight}
        onChange={(carriedWeight) => updateEnc({ carriedWeight })}
        description={FIELD_DESCRIPTIONS.carriedWeight}
        compact
        placeholder="kg"
      />
      <div className="combat-check-row">
        <CheckboxField
          label="Sobrecarregado"
          checked={encumbrance.encumbered}
          onChange={(encumbered) => updateEnc({ encumbered })}
          description={FIELD_DESCRIPTIONS.encumbered}
          compact
        />
        <CheckboxField
          label="Grave"
          checked={encumbrance.heavilyEncumbered}
          onChange={(heavilyEncumbered) => updateEnc({ heavilyEncumbered })}
          description={FIELD_DESCRIPTIONS.heavilyEncumbered}
          compact
        />
      </div>
    </div>
  );
}
