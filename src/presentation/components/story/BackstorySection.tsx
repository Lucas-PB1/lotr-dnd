import { useMemo, useState } from 'react';
import { StorySuggestionsService } from '../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import { buildBackstoryLoreGroups } from '../../../shared/data/storySuggestionsData';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { LoreAction, LorePicker } from './LorePicker';
import { StoryContextPanel } from './StoryContextPanel';
import { StoryEditor } from './StoryEditor';

export function BackstorySection() {
  const { character, updateCharacter } = useCharacterSheet();
  const [asideOpen, setAsideOpen] = useState(false);

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

  return (
    <div className="story-hub story-hub--backstory">
      <div className="story-hub__main">
        <StoryEditor
          chronicle={character.characterBackstory}
          treasure={character.additionalEquipment}
          onChronicleChange={(characterBackstory) => updateCharacter({ characterBackstory })}
          onTreasureChange={(additionalEquipment) => updateCharacter({ additionalEquipment })}
          chronicleDescription={FIELD_DESCRIPTIONS.characterBackstory}
          treasureHint="Relíquias e heranças que não estão na aba Inventário."
        />

        <div className="story-hub__actions">
          <LoreAction
            onClick={applyStarter}
            disabled={!character.creationChoices?.cultureId}
          >
            Transcrever do antecedente
          </LoreAction>
          <LoreAction variant="ghost" onClick={() => setAsideOpen((v) => !v)}>
            {asideOpen ? 'Ocultar painel' : 'Origem & inspirações'}
          </LoreAction>
        </div>
      </div>

      <aside className={`story-hub__aside${asideOpen ? ' story-hub__aside--open' : ''}`}>
        <StoryContextPanel />
        <LorePicker
          groups={loreGroups}
          onPick={handleLorePick}
          defaultTabId="hooks"
          title="Inspirações da Terra-média"
        />
      </aside>
    </div>
  );
}
