import { useMemo, useState } from 'react';
import { APP_SUBTITLE, APP_TITLE, SHEET_TABS } from '../../shared/constants/appLabels';
import { Badge, Card, TabItem, Tabs } from 'flowbite-react';
import { getCreationProgress } from '../../application/creation/creationProgress';
import { CharacterCreationSection } from '../components/sections/CharacterCreationSection';
import { ResetCharacterModal } from '../components/layout/ResetCharacterModal';
import { SheetToolbar } from '../components/layout/SheetToolbar';
import { SheetFinalTab } from '../components/layout/SheetFinalTab';
import { SheetInventoryTab } from '../components/layout/SheetInventoryTab';
import { SheetMainTab } from '../components/layout/SheetMainTab';
import { SheetPageHeader } from '../components/layout/SheetPageHeader';
import { SheetStoryTab } from '../components/layout/SheetStoryTab';
import { Section } from '../components/ui/FormFields';
import { useCharacterSheet } from '../context/CharacterSheetContext';

export function CharacterSheetPage() {
  const { character, resetCharacter, isSaving } = useCharacterSheet();
  const [resetOpen, setResetOpen] = useState(false);
  const [sheetKey, setSheetKey] = useState(0);

  const progress = useMemo(
    () => getCreationProgress(character.creationChoices),
    [character.creationChoices],
  );

  const storyProgress = useMemo(() => {
    let filled = 0;
    if (character.characterBackstory.trim()) filled += 1;
    if (character.fellowship.fellowshipName.trim() || character.fellowship.patrons.trim()) {
      filled += 1;
    }
    if (character.appearance.age.trim() || character.appearance.hair.trim()) filled += 1;
    return filled;
  }, [character]);

  const handleReset = () => {
    resetCharacter();
    setSheetKey((key) => key + 1);
    setResetOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="sheet-page">
      <SheetPageHeader character={character} />

      <Card className="sheet-content border-2 border-amber-400/50 bg-[var(--color-parchment)] p-4 shadow-xl sm:p-6">
        <SheetToolbar
          isSaving={isSaving}
          onResetClick={() => setResetOpen(true)}
        />
        <Tabs
          key={sheetKey}
          aria-label="Navegação da ficha"
          variant="pills"
          className="sheet-tabs"
        >
          <TabItem
            active
            title={
              <span className="sheet-tab__label">
                {SHEET_TABS.creation}
                <Badge color="warning" size="xs" className="ml-2">
                  {progress.label}
                </Badge>
              </span>
            }
          >
            <Section title="Criação de Personagem">
              <CharacterCreationSection />
            </Section>
          </TabItem>

          <TabItem title={SHEET_TABS.adventure}>
            <SheetMainTab />
          </TabItem>

          <TabItem
            title={
              <span className="sheet-tab__label">
                {SHEET_TABS.inventory}
                {(character.inventory?.length ?? 0) > 0 && (
                  <Badge color="success" size="xs" className="ml-2">
                    {character.inventory.length}
                  </Badge>
                )}
              </span>
            }
          >
            <SheetInventoryTab />
          </TabItem>

          <TabItem title={SHEET_TABS.summary}>
            <SheetFinalTab />
          </TabItem>

          <TabItem
            title={
              <span className="sheet-tab__label">
                {SHEET_TABS.story}
                {storyProgress > 0 && (
                  <Badge color="info" size="xs" className="ml-2">
                    {storyProgress}/3
                  </Badge>
                )}
              </span>
            }
          >
            <SheetStoryTab />
          </TabItem>
        </Tabs>
      </Card>

      <footer className="sheet-footer">
        <p>{APP_TITLE} · Free League Publishing</p>
        <p className="sheet-footer__sub">{APP_SUBTITLE}</p>
      </footer>

      <ResetCharacterModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
    </div>
  );
}
