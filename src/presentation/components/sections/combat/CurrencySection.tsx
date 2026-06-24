import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { NumberField } from '../../ui/FormFields';

export function CurrencySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { currency } = character;

  const updateCurrency = (partial: Partial<typeof currency>) => {
    updateCharacter({ currency: { ...currency, ...partial } });
  };

  return (
    <div className="currency-panel">
      <h3 className="subsection-title">Moedas</h3>
      <NumberField
        label="Cobre"
        value={currency.copper}
        onChange={(copper) => updateCurrency({ copper })}
      />
      <NumberField
        label="Prata"
        value={currency.silver}
        onChange={(silver) => updateCurrency({ silver })}
      />
      <NumberField
        label="Ouro"
        value={currency.gold}
        onChange={(gold) => updateCurrency({ gold })}
      />
    </div>
  );
}
