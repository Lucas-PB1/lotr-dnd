import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import {
  AGE_HINTS,
  EYE_OPTIONS,
  getAppearancePresets,
  HAIR_OPTIONS,
  HEIGHT_HINTS,
  LOTR_APPEARANCE_TRAITS,
  SKIN_OPTIONS,
  WEIGHT_HINTS,
} from '../../../../shared/data/storySuggestionsData';
import { STORY_UI } from '../../../../shared/constants/storyLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { LoreField, PresetCard } from '../LorePicker';
import { LoreChipRow } from '../LoreChipRow';

export function StoryAppearancePanel() {
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
      p.age === appearance.age && p.height === appearance.height && p.eyes === appearance.eyes,
  );

  return (
    <div className="st-story-panel">
      {presets.length > 0 && (
        <div className="st-story-presets">
          <p className="st-story-presets__label">
            {STORY_UI.presetsKicker} · {character.culture || 'seu povo'}
          </p>
          <div className="st-story-presets__track">
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

      <div className="st-story-fields st-story-fields--triple">
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
        label={STORY_UI.traitsLabel}
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

      <label className="st-story-textarea-field">
        <span className="st-story-textarea-field__label">{STORY_UI.portraitLabel}</span>
        <span className="st-story-textarea-field__hint">{FIELD_DESCRIPTIONS.appearanceNotes}</span>
        <textarea
          className="st-story-textarea"
          rows={4}
          value={character.characterAppearanceNotes}
          onChange={(e) => updateCharacter({ characterAppearanceNotes: e.target.value })}
          placeholder="Como os outros descreveriam o herói num relance…"
        />
      </label>
    </div>
  );
}
