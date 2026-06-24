import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { CheckboxField, TextField } from '../../ui/FormFields';

export function EncumbranceSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { encumbrance } = character;

  const updateEnc = (partial: Partial<typeof encumbrance>) => {
    updateCharacter({ encumbrance: { ...encumbrance, ...partial } });
  };

  return (
    <div className="encumbrance-panel">
      <h3 className="subsection-title">Sobrecarga</h3>
      <TextField
        label="Peso Carregado"
        value={encumbrance.carriedWeight}
        onChange={(carriedWeight) => updateEnc({ carriedWeight })}
      />
      <CheckboxField
        label="Sobrecarregado"
        checked={encumbrance.encumbered}
        onChange={(encumbered) => updateEnc({ encumbered })}
      />
      <CheckboxField
        label="Gravemente Sobrecarregado"
        checked={encumbrance.heavilyEncumbered}
        onChange={(heavilyEncumbered) => updateEnc({ heavilyEncumbered })}
      />
    </div>
  );
}
