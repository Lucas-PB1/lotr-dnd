import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { CheckboxField, NumberField, TextField } from '../../ui/FormFields';

export function ShadowSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { shadow } = character;

  const updateShadow = (partial: Partial<typeof shadow>) => {
    updateCharacter({ shadow: { ...shadow, ...partial } });
  };

  return (
    <div className="shadow-panel">
      <h3 className="subsection-title">Sombra</h3>
      <NumberField
        label="Pontuação de Sombra"
        value={shadow.score}
        onChange={(score) => updateShadow({ score })}
      />
      <CheckboxField
        label="Miserável"
        checked={shadow.miserable}
        onChange={(miserable) => updateShadow({ miserable })}
      />
      <CheckboxField
        label="Angustiado"
        checked={shadow.anguished}
        onChange={(anguished) => updateShadow({ anguished })}
      />
      <TextField
        label="Cicatrizes de Sombra"
        value={shadow.scars}
        onChange={(scars) => updateShadow({ scars })}
      />
    </div>
  );
}
