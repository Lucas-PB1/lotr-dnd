import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import {
  AGE_HINTS,
  EYE_OPTIONS,
  getAppearancePresets,
  HAIR_OPTIONS,
  HEIGHT_HINTS,
  LOTR_APPEARANCE_TRAITS,
  SKIN_OPTIONS,
  WEIGHT_HINTS,
} from '../../../shared/data/storySuggestionsData';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { TextArea } from '../ui/FormFields';
import { LoreChipRow } from './LoreChipRow';
import { LoreField, PresetCard } from './LorePicker';

export function AppearanceSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { appearance } = character;
  const cultureId = character.creationChoices?.cultureId ?? null;

  const presets = useMemo(() => getAppearancePresets(cultureId), [cultureId]);

  const updateAppearance = (partial: Partial<typeof appearance>) => {
    updateCharacter({ appearance: { ...appearance, ...partial } });
  };

  const applyPreset = (index: number) => {
    const preset = presets[index];
    if (!preset) return;
    updateCharacter({
      appearance: {
        age: preset.age,
        height: preset.height,
        weight: preset.weight,
        hair: preset.hair,
        eyes: preset.eyes,
        skin: preset.skin,
      },
      characterAppearanceNotes: preset.notes,
    });
  };

  const activePresetIndex = presets.findIndex(
    (p) =>
      p.age === appearance.age &&
      p.height === appearance.height &&
      p.eyes === appearance.eyes,
  );

  return (
    <div className="story-hub story-hub--appearance">
      {presets.length > 0 && (
        <div className="appearance-presets">
          <p className="appearance-presets__kicker">
            Modelos · <span>{character.culture || 'seu povo'}</span>
          </p>
          <div className="appearance-presets__grid">
            {presets.map((preset, i) => (
              <PresetCard
                key={preset.label}
                label={preset.label}
                detail={preset.notes}
                selected={activePresetIndex === i}
                onClick={() => applyPreset(i)}
              />
            ))}
          </div>
        </div>
      )}

      <div className="appearance-grid appearance-grid--lore">
        <LoreField
          label="Idade"
          value={appearance.age}
          onChange={(age) => updateAppearance({ age })}
          suggestions={AGE_HINTS}
          placeholder="Ex.: 33 primaveras"
        />
        <LoreField
          label="Olhos"
          value={appearance.eyes}
          onChange={(eyes) => updateAppearance({ eyes })}
          suggestions={EYE_OPTIONS}
        />
        <LoreField
          label="Altura"
          value={appearance.height}
          onChange={(height) => updateAppearance({ height })}
          suggestions={HEIGHT_HINTS}
        />
        <LoreField
          label="Pele"
          value={appearance.skin}
          onChange={(skin) => updateAppearance({ skin })}
          suggestions={SKIN_OPTIONS}
        />
        <LoreField
          label="Porte"
          value={appearance.weight}
          onChange={(weight) => updateAppearance({ weight })}
          suggestions={WEIGHT_HINTS}
        />
        <LoreField
          label="Cabelo"
          value={appearance.hair}
          onChange={(hair) => updateAppearance({ hair })}
          suggestions={HAIR_OPTIONS}
        />
      </div>

      <LoreChipRow
        label="Traços do olhar"
        options={LOTR_APPEARANCE_TRAITS}
        onPick={(value) =>
          updateCharacter({
            characterAppearanceNotes: StorySuggestionsService.appendSnippet(
              character.characterAppearanceNotes,
              value,
            ),
          })
        }
      />

      <TextArea
        label="Retrato escrito"
        value={character.characterAppearanceNotes}
        onChange={(characterAppearanceNotes) => updateCharacter({ characterAppearanceNotes })}
        description={FIELD_DESCRIPTIONS.appearanceNotes}
        rows={4}
        className="appearance-section__wide"
      />
    </div>
  );
}
