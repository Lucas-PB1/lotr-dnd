import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, TextArea, TextField } from '../ui/FormFields';

export function EquipmentSection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="equipment-grid">
      <TextArea
        label="Proficiências em Ferramentas e Idiomas"
        value={character.toolProficiencies}
        onChange={(toolProficiencies) => updateCharacter({ toolProficiencies })}
        description={FIELD_DESCRIPTIONS.toolProficiencies}
        rows={5}
      />
      <TextArea
        label="Equipamento"
        value={character.equipment}
        onChange={(equipment) => updateCharacter({ equipment })}
        description={FIELD_DESCRIPTIONS.equipment}
        hint="Gerado pela cultura + chamado na criação. Edite se necessário."
        rows={5}
        className="equipment-grid__auto"
      />
      <TextArea
        label="Características, Traços e Virtudes"
        value={character.featuresTraitsVirtues}
        onChange={(featuresTraitsVirtues) => updateCharacter({ featuresTraitsVirtues })}
        description={FIELD_DESCRIPTIONS.featuresTraitsVirtues}
        rows={5}
      />
      <TextArea
        label="Recompensas e Itens Mágicos"
        value={character.rewardsAndMagicalItems}
        onChange={(rewardsAndMagicalItems) => updateCharacter({ rewardsAndMagicalItems })}
        description={FIELD_DESCRIPTIONS.rewardsAndMagicalItems}
        rows={5}
      />
    </div>
  );
}

export function FellowshipSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { fellowship } = character;

  const updateFellowship = (partial: Partial<typeof fellowship>) => {
    updateCharacter({ fellowship: { ...fellowship, ...partial } });
  };

  return (
    <div className="fellowship-grid">
      <TextField
        label="Nome da Comunidade"
        value={fellowship.fellowshipName}
        onChange={(fellowshipName) => updateFellowship({ fellowshipName })}
        description={FIELD_DESCRIPTIONS.fellowshipName}
      />
      <NumberField
        label="Pontos de Comunidade"
        value={fellowship.fellowshipPoints}
        onChange={(fellowshipPoints) => updateFellowship({ fellowshipPoints })}
        description={FIELD_DESCRIPTIONS.fellowshipPoints}
      />
      <TextField
        label="Nome do Herdeiro"
        value={fellowship.heirName}
        onChange={(heirName) => updateFellowship({ heirName })}
        description={FIELD_DESCRIPTIONS.heirName}
      />
      <TextField
        label="Investimento"
        value={fellowship.investment}
        onChange={(investment) => updateFellowship({ investment })}
        description={FIELD_DESCRIPTIONS.investment}
      />
      <TextArea
        label="Comunidade, Herdeiro e Patronos"
        value={fellowship.patrons}
        onChange={(patrons) => updateFellowship({ patrons })}
        description={FIELD_DESCRIPTIONS.patrons}
        rows={4}
        className="fellowship-grid__wide"
      />
    </div>
  );
}

export function AppearanceSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { appearance } = character;

  const updateAppearance = (partial: Partial<typeof appearance>) => {
    updateCharacter({ appearance: { ...appearance, ...partial } });
  };

  return (
    <div className="appearance-grid">
      <TextField label="Idade" value={appearance.age} onChange={(age) => updateAppearance({ age })} description={FIELD_DESCRIPTIONS.age} />
      <TextField label="Olhos" value={appearance.eyes} onChange={(eyes) => updateAppearance({ eyes })} description={FIELD_DESCRIPTIONS.eyes} />
      <TextField label="Altura" value={appearance.height} onChange={(height) => updateAppearance({ height })} description={FIELD_DESCRIPTIONS.height} />
      <TextField label="Pele" value={appearance.skin} onChange={(skin) => updateAppearance({ skin })} description={FIELD_DESCRIPTIONS.skin} />
      <TextField label="Peso" value={appearance.weight} onChange={(weight) => updateAppearance({ weight })} description={FIELD_DESCRIPTIONS.weight} />
      <TextField label="Cabelo" value={appearance.hair} onChange={(hair) => updateAppearance({ hair })} description={FIELD_DESCRIPTIONS.hair} />
      <TextArea
        label="Aparência do Personagem"
        value={character.characterAppearanceNotes}
        onChange={(characterAppearanceNotes) => updateCharacter({ characterAppearanceNotes })}
        description={FIELD_DESCRIPTIONS.appearanceNotes}
        rows={6}
        className="appearance-grid__wide"
      />
    </div>
  );
}

export function BackstorySection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="backstory-grid">
      <TextArea
        label="História do Personagem"
        value={character.characterBackstory}
        onChange={(characterBackstory) => updateCharacter({ characterBackstory })}
        description={FIELD_DESCRIPTIONS.characterBackstory}
        rows={8}
      />
      <TextArea
        label="Equipamento e Tesouro Adicional"
        value={character.additionalEquipment}
        onChange={(additionalEquipment) => updateCharacter({ additionalEquipment })}
        rows={8}
      />
      <TextArea
        label="Características, Traços e Virtudes Adicionais"
        value={character.additionalFeatures}
        onChange={(additionalFeatures) => updateCharacter({ additionalFeatures })}
        rows={8}
      />
    </div>
  );
}
