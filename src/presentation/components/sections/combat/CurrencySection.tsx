import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { NumberField } from '../../ui/FormFields';

export function CurrencySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { currency } = character;

  const updateCurrency = (partial: Partial<typeof currency>) => {
    updateCharacter({ currency: { ...currency, ...partial } });
  };

  return (
    <div className="currency-row">
      <NumberField
        label="Cobre"
        value={currency.copper}
        onChange={(copper) => updateCurrency({ copper })}
        description={FIELD_DESCRIPTIONS.copper}
        compact
      />
      <NumberField
        label="Prata"
        value={currency.silver}
        onChange={(silver) => updateCurrency({ silver })}
        description={FIELD_DESCRIPTIONS.silver}
        compact
      />
      <NumberField
        label="Ouro"
        value={currency.gold}
        onChange={(gold) => updateCurrency({ gold })}
        description={FIELD_DESCRIPTIONS.gold}
        compact
      />
    </div>
  );
}
