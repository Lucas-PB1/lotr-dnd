import { useMemo, useState } from 'react';
import { StorySuggestionsService } from '../../../domain/services/StorySuggestionsService';
import { FIELD_DESCRIPTIONS } from '../../../shared/constants/sheetFieldDescriptions';
import {
  buildFellowshipLoreGroups,
  FELLOWSHIP_NAME_SUGGESTIONS,
} from '../../../shared/data/storySuggestionsData';
import { useCharacterSheet } from '../../context/CharacterSheetContext';
import { NumberField, TextField } from '../ui/FormFields';
import { FellowshipEditor, type FellowshipEditorTab } from './FellowshipEditor';
import { LoreChipRow } from './LoreChipRow';
import { LorePicker } from './LorePicker';

const EDITOR_TO_LORE_TAB: Record<FellowshipEditorTab, string> = {
  patrons: 'haven',
  investment: 'invest',
};

const LORE_TAB_TO_EDITOR: Record<string, FellowshipEditorTab> = {
  haven: 'patrons',
  patrons: 'patrons',
  invest: 'investment',
};

export function FellowshipSection() {
  const { character, updateCharacter } = useCharacterSheet();
  const { fellowship } = character;
  const [editorTab, setEditorTab] = useState<FellowshipEditorTab>('patrons');
  const [loreTab, setLoreTab] = useState('haven');

  const loreGroups = useMemo(() => buildFellowshipLoreGroups(), []);

  const nameOptions = useMemo(
    () => FELLOWSHIP_NAME_SUGGESTIONS.map((name) => ({ label: name, value: name })),
    [],
  );

  const updateFellowship = (partial: Partial<typeof fellowship>) => {
    updateCharacter({ fellowship: { ...fellowship, ...partial } });
  };

  const handleEditorTabChange = (tab: FellowshipEditorTab) => {
    setEditorTab(tab);
    setLoreTab(EDITOR_TO_LORE_TAB[tab]);
  };

  const handleLoreTabChange = (tabId: string) => {
    setLoreTab(tabId);
    const mapped = LORE_TAB_TO_EDITOR[tabId];
    if (mapped) setEditorTab(mapped);
  };

  const handleLorePick = (
    value: string,
    target?: 'backstory' | 'treasure' | 'patrons' | 'investment',
  ) => {
    if (target === 'investment') {
      setEditorTab('investment');
      setLoreTab('invest');
      updateFellowship({
        investment: StorySuggestionsService.appendSnippet(fellowship.investment, value),
      });
      return;
    }
    setEditorTab('patrons');
    setLoreTab('haven');
    updateFellowship({
      patrons: StorySuggestionsService.appendSnippet(fellowship.patrons, value),
    });
  };

  return (
    <div className="story-hub story-hub--fellowship">
      <div className="story-hub__main">
        <section className="fellowship-identity" aria-label="Identidade da Comunidade">
          <TextField
            label="Nome da Comunidade"
            value={fellowship.fellowshipName}
            onChange={(fellowshipName) => updateFellowship({ fellowshipName })}
            description={FIELD_DESCRIPTIONS.fellowshipName}
            placeholder="Ex.: Companhia da Estrada Verde"
          />

          <LoreChipRow
            label="Sugestões"
            options={nameOptions}
            selectedValue={fellowship.fellowshipName}
            onPick={(fellowshipName) => updateFellowship({ fellowshipName })}
          />

          <div className="fellowship-identity__meta">
            <TextField
              label="Nome do Herdeiro"
              value={fellowship.heirName}
              onChange={(heirName) => updateFellowship({ heirName })}
              description={FIELD_DESCRIPTIONS.heirName}
              placeholder="Quem herdará legado e pontos"
            />
            <NumberField
              label="Pontos"
              value={fellowship.fellowshipPoints}
              onChange={(fellowshipPoints) => updateFellowship({ fellowshipPoints })}
              description={FIELD_DESCRIPTIONS.fellowshipPoints}
            />
          </div>
        </section>

        <FellowshipEditor
          patrons={fellowship.patrons}
          investment={fellowship.investment}
          onPatronsChange={(patrons) => updateFellowship({ patrons })}
          onInvestmentChange={(investment) => updateFellowship({ investment })}
          patronsDescription={FIELD_DESCRIPTIONS.patrons}
          investmentDescription={FIELD_DESCRIPTIONS.investment}
          activeTab={editorTab}
          onTabChange={handleEditorTabChange}
        />
      </div>

      <aside className="story-hub__aside story-hub__aside--open">
        <LorePicker
          groups={loreGroups}
          onPick={handleLorePick}
          activeTabId={loreTab}
          onTabChange={handleLoreTabChange}
          defaultTabId="haven"
          title="Fase da Comunidade"
          variant="compact"
          insertTargetLabel={
            editorTab === 'investment' ? 'Investimentos' : 'Refúgios & laços'
          }
        />
      </aside>
    </div>
  );
}
