import { Badge } from 'flowbite-react';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { TextArea, NumberField, TextField } from '../ui/FormFields';

export function EquipmentSection() {
  const { character, updateCharacter } = useCharacterSheet();

  return (
    <div className="equipment-grid">
      <TextArea
        label="Proficiências em Ferramentas e Idiomas"
        value={character.toolProficiencies}
        onChange={(toolProficiencies) => updateCharacter({ toolProficiencies })}
        rows={5}
      />
      <div>
        <div className="mb-1 flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-amber-900/70">
            Equipamento
          </span>
          <Badge color="success" size="xs">
            auto
          </Badge>
        </div>
        <TextArea
          label=""
          value={character.equipment}
          onChange={(equipment) => updateCharacter({ equipment })}
          rows={5}
        />
        <p className="mt-1 text-xs text-amber-900/55">
          Gerado pela cultura + chamado. Edite manualmente se necessário.
        </p>
      </div>
      <TextArea
        label="Características, Traços e Virtudes"
        value={character.featuresTraitsVirtues}
        onChange={(featuresTraitsVirtues) => updateCharacter({ featuresTraitsVirtues })}
        rows={5}
      />
      <TextArea
        label="Recompensas e Itens Mágicos"
        value={character.rewardsAndMagicalItems}
        onChange={(rewardsAndMagicalItems) => updateCharacter({ rewardsAndMagicalItems })}
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
      />
      <NumberField
        label="Pontos de Comunidade"
        value={fellowship.fellowshipPoints}
        onChange={(fellowshipPoints) => updateFellowship({ fellowshipPoints })}
      />
      <TextField
        label="Nome do Herdeiro"
        value={fellowship.heirName}
        onChange={(heirName) => updateFellowship({ heirName })}
      />
      <TextField
        label="Investimento"
        value={fellowship.investment}
        onChange={(investment) => updateFellowship({ investment })}
      />
      <TextArea
        label="Comunidade, Herdeiro e Patronos"
        value={fellowship.patrons}
        onChange={(patrons) => updateFellowship({ patrons })}
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
      <TextField label="Idade" value={appearance.age} onChange={(age) => updateAppearance({ age })} />
      <TextField label="Olhos" value={appearance.eyes} onChange={(eyes) => updateAppearance({ eyes })} />
      <TextField label="Altura" value={appearance.height} onChange={(height) => updateAppearance({ height })} />
      <TextField label="Pele" value={appearance.skin} onChange={(skin) => updateAppearance({ skin })} />
      <TextField label="Peso" value={appearance.weight} onChange={(weight) => updateAppearance({ weight })} />
      <TextField label="Cabelo" value={appearance.hair} onChange={(hair) => updateAppearance({ hair })} />
      <TextArea
        label="Aparência do Personagem"
        value={character.characterAppearanceNotes}
        onChange={(characterAppearanceNotes) => updateCharacter({ characterAppearanceNotes })}
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
