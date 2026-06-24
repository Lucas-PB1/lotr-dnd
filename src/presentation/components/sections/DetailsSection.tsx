import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { TextArea } from '../ui/FormFields';
import { EquipmentOverviewPanel } from '../equipment/EquipmentOverviewPanel';
import { TraitsVirtuesPanel } from '../equipment/TraitsVirtuesPanel';

export function EquipmentSection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="equipment-section">
      <div className="equipment-section__structured">
        <EquipmentOverviewPanel />
        <TraitsVirtuesPanel />
      </div>

      <div className="equipment-grid equipment-grid--notes">
        <TextArea
          label="Proficiências adicionais"
          value={character.toolProficiencies}
          onChange={(toolProficiencies) => updateCharacter({ toolProficiencies })}
          description="Ferramentas, idiomas e proficiências extras (uma por linha)."
          rows={3}
        />
        <TextArea
          label="Recompensas e itens mágicos"
          value={character.rewardsAndMagicalItems}
          onChange={(rewardsAndMagicalItems) => updateCharacter({ rewardsAndMagicalItems })}
          description={FIELD_DESCRIPTIONS.rewardsAndMagicalItems}
          rows={3}
        />
        <TextArea
          label="Complementos (traços e virtudes)"
          value={character.additionalFeatures}
          onChange={(additionalFeatures) => updateCharacter({ additionalFeatures })}
          description="Notas livres: tesouros únicos, variantes de casa, etc."
          rows={3}
          className="equipment-grid__wide"
        />
      </div>
    </div>
  );
}

export { AppearanceSection } from '../story/AppearanceSection';
export { BackstorySection } from '../story/BackstorySection';
export { FellowshipSection } from '../story/FellowshipSection';
