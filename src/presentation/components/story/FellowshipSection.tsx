import { useMemo } from 'react';
import { StorySuggestionsService } from '../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import {
  buildFellowshipLoreGroups,
  FELLOWSHIP_NAME_SUGGESTIONS,
} from '../../../shared/data/storySuggestionsData';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, TextArea, TextField } from '../ui/FormFields';
import { LoreField, LorePicker } from './LorePicker';

export function FellowshipSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { fellowship } = character;

  const loreGroups = useMemo(() => buildFellowshipLoreGroups(), []);

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
    <div className="story-hub story-hub--fellowship">
      <div className="story-hub__main">
        <div className="fellowship-grid fellowship-grid--lore">
          <LoreField
            label="Nome da Comunidade"
            value={fellowship.fellowshipName}
            onChange={(fellowshipName) => updateFellowship({ fellowshipName })}
            suggestions={FELLOWSHIP_NAME_SUGGESTIONS}
            placeholder="Ex.: Companhia da Estrada Verde"
            description={FIELD_DESCRIPTIONS.fellowshipName}
          />
          <TextField
            label="Nome do Herdeiro"
            value={fellowship.heirName}
            onChange={(heirName) => updateFellowship({ heirName })}
            description={FIELD_DESCRIPTIONS.heirName}
            placeholder="Quem herdará legado e pontos"
          />
          <NumberField
            label="Pontos de Comunidade"
            value={fellowship.fellowshipPoints}
            onChange={(fellowshipPoints) => updateFellowship({ fellowshipPoints })}
            description={FIELD_DESCRIPTIONS.fellowshipPoints}
          />
        </div>

        <TextArea
          label="Refúgio, patronos e laços"
          value={fellowship.patrons}
          onChange={(patrons) => updateFellowship({ patrons })}
          description={FIELD_DESCRIPTIONS.patrons}
          rows={4}
        />

        <TextArea
          label="Investimentos da Comunidade"
          value={fellowship.investment}
          onChange={(investment) => updateFellowship({ investment })}
          description={FIELD_DESCRIPTIONS.investment}
          rows={3}
        />
      </div>

      <aside className="story-hub__aside story-hub__aside--open">
        <LorePicker
          groups={loreGroups}
          onPick={handleLorePick}
          defaultTabId="haven"
          title="Fase da Comunidade"
        />
      </aside>
    </div>
  );
}
