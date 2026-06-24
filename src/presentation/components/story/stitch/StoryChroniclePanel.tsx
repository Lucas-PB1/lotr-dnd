import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import { buildBackstoryLoreGroups } from '../../../../shared/data/storySuggestionsData';
import { STORY_UI } from '../../../../shared/constants/storyLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { LorePicker } from '../LorePicker';

export function StoryChroniclePanel() {
  const { character, updateCharacter } = useCharacterSheet();

  const ctx = useMemo(
    () => StorySuggestionsService.getContext(character.creationChoices),
    [character.creationChoices],
  );

  const loreGroups = useMemo(() => {
    if (!ctx) return buildBackstoryLoreGroups([], []);
    return buildBackstoryLoreGroups([...ctx.motivations], ctx.backgroundHooks);
  }, [ctx]);

  const applyStarter = () => {
    const choices = character.creationChoices;
    if (!choices?.cultureId) return;
    updateCharacter({
      characterBackstory: StorySuggestionsService.buildStarterBackstory(choices),
    });
  };

  const handleLorePick = (value: string, target?: 'backstory' | 'treasure' | 'patrons' | 'investment') => {
    if (target === 'treasure') {
      updateCharacter({
        additionalEquipment: StorySuggestionsService.appendSnippet(
          character.additionalEquipment,
          value,
        ),
      });
      return;
    }
    updateCharacter({
      characterBackstory: StorySuggestionsService.appendSnippet(
        character.characterBackstory,
        value,
      ),
    });
  };

  const wordCount = character.characterBackstory.trim()
    ? character.characterBackstory.trim().split(/\s+/).length
    : 0;

  return (
    <div className="st-story-panel">
      <div className="st-story-chronicle-head">
        <label className="st-story-textarea-field st-story-textarea-field--primary">
          <span className="st-story-textarea-field__label">{STORY_UI.chronicleLabel}</span>
          <span className="st-story-textarea-field__hint">
            {FIELD_DESCRIPTIONS.characterBackstory}
          </span>
          <textarea
            className="st-story-textarea st-story-textarea--tall"
            rows={9}
            value={character.characterBackstory}
            onChange={(e) => updateCharacter({ characterBackstory: e.target.value })}
            placeholder="Motivações, segredos e o que trouxe o herói até aqui…"
          />
        </label>
        <p className="st-story-chronicle-meta" aria-live="polite">
          {wordCount} {wordCount === 1 ? 'palavra' : 'palavras'}
        </p>
      </div>

      <div className="st-story-chronicle-actions">
        <button
          type="button"
          className="st-story-btn"
          disabled={!character.creationChoices?.cultureId}
          onClick={applyStarter}
        >
          {STORY_UI.applyStarter}
        </button>
      </div>

      <label className="st-story-textarea-field">
        <span className="st-story-textarea-field__label">{STORY_UI.relicsLabel}</span>
        <span className="st-story-textarea-field__hint">{STORY_UI.relicsHint}</span>
        <textarea
          className="st-story-textarea"
          rows={4}
          value={character.additionalEquipment}
          onChange={(e) => updateCharacter({ additionalEquipment: e.target.value })}
          placeholder="Heranças e relíquias fora do inventário…"
        />
      </label>

      <details className="st-story-lore-details">
        <summary>{STORY_UI.loreInspire}</summary>
        <div className="st-story-lore-details__body">
          <LorePicker
            groups={loreGroups}
            onPick={handleLorePick}
            defaultTabId="hooks"
            title={STORY_UI.chronicleLoreTitle}
            variant="compact"
          />
        </div>
      </details>
    </div>
  );
}
