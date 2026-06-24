import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../../shared/constants/sheetFieldDescriptions';
import {
  buildFellowshipLoreGroups,
  FELLOWSHIP_NAME_SUGGESTIONS,
} from '../../../../shared/data/storySuggestionsData';
import { STORY_UI } from '../../../../shared/constants/storyLabels';
import { useCharacterSheet } from '../../../context/CharacterSheetContext';
import { LoreChipRow } from '../LoreChipRow';
import { LorePicker } from '../LorePicker';

export function StoryFellowshipPanel() {
  const { character, updateCharacter } = useCharacterSheet();
  const { fellowship } = character;

  const loreGroups = useMemo(() => buildFellowshipLoreGroups(), []);

  const nameOptions = useMemo(
    () => FELLOWSHIP_NAME_SUGGESTIONS.map((name) => ({ label: name, value: name })),
    [],
  );

  const updateFellowship = (partial: Partial<typeof fellowship>) => {
    updateCharacter({ fellowship: { ...fellowship, ...partial } });
  };

  const handleLorePick = (
    value: string,
    target?: 'backstory' | 'treasure' | 'patrons' | 'investment',
  ) => {
    if (target === 'investment') {
      updateFellowship({
        investment: StorySuggestionsService.appendSnippet(fellowship.investment, value),
      });
      return;
    }
    updateFellowship({
      patrons: StorySuggestionsService.appendSnippet(fellowship.patrons, value),
    });
  };

  return (
    <div className="st-story-panel">
      <fieldset className="st-story-fellowship-id">
        <legend className="st-story-fellowship-id__legend">{STORY_UI.fellowshipIdentity}</legend>
        <div className="st-story-fellowship-id__grid">
          <label className="st-story-inline-field st-story-inline-field--wide">
            <span>{STORY_UI.fellowshipName}</span>
            <input
              type="text"
              value={fellowship.fellowshipName}
              onChange={(e) => updateFellowship({ fellowshipName: e.target.value })}
              placeholder="Ex.: Companhia da Estrada Verde"
            />
          </label>
          <label className="st-story-inline-field">
            <span>{STORY_UI.fellowshipHeir}</span>
            <input
              type="text"
              value={fellowship.heirName}
              onChange={(e) => updateFellowship({ heirName: e.target.value })}
              placeholder="Herdeiro"
            />
          </label>
          <label className="st-story-inline-field st-story-inline-field--narrow">
            <span>{STORY_UI.fellowshipPoints}</span>
            <input
              type="number"
              min={0}
              value={fellowship.fellowshipPoints}
              onChange={(e) =>
                updateFellowship({ fellowshipPoints: Number(e.target.value) || 0 })
              }
            />
          </label>
        </div>
      </fieldset>

      <LoreChipRow
        label={STORY_UI.fellowshipNameSuggestions}
        options={nameOptions}
        selectedValue={fellowship.fellowshipName}
        onPick={(fellowshipName) => updateFellowship({ fellowshipName })}
      />

      <label className="st-story-textarea-field">
        <span className="st-story-textarea-field__label">{STORY_UI.fellowshipPatrons}</span>
        <span className="st-story-textarea-field__hint">{FIELD_DESCRIPTIONS.patrons}</span>
        <textarea
          className="st-story-textarea"
          rows={5}
          value={fellowship.patrons}
          onChange={(e) => updateFellowship({ patrons: e.target.value })}
          placeholder="Refúgios, patronos e vínculos…"
        />
      </label>

      <label className="st-story-textarea-field">
        <span className="st-story-textarea-field__label">{STORY_UI.fellowshipInvestment}</span>
        <span className="st-story-textarea-field__hint">{FIELD_DESCRIPTIONS.investment}</span>
        <textarea
          className="st-story-textarea"
          rows={4}
          value={fellowship.investment}
          onChange={(e) => updateFellowship({ investment: e.target.value })}
          placeholder="Como a Comunidade gasta pontos…"
        />
      </label>

      <details className="st-story-lore-details">
        <summary>{STORY_UI.loreInspire}</summary>
        <div className="st-story-lore-details__body">
          <LorePicker
            groups={loreGroups}
            onPick={handleLorePick}
            defaultTabId="haven"
            title={STORY_UI.fellowshipLoreTitle}
            variant="compact"
          />
        </div>
      </details>
    </div>
  );
}
