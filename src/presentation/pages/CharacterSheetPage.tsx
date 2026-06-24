import { useMemo, useState } from 'react';
import { getCreationProgress } from '../../application/creation/creationProgress';
import { getInitialSheetTab } from '../../application/sheet/getInitialSheetTab';
import { CharacterCreationSection } from '../components/sections/CharacterCreationSection';
import { ResetCharacterModal } from '../components/layout/ResetCharacterModal';
import { SheetAppShell } from '../components/layout/shell/SheetAppShell';
import type { SheetTabId } from '../components/layout/shell/sheetTabTypes';
import { SheetFinalTab } from '../components/layout/SheetFinalTab';
import { SheetInventoryTab } from '../components/layout/SheetInventoryTab';
import { SheetDiceTab } from '../components/layout/SheetDiceTab';
import { SheetShopTab } from '../components/layout/SheetShopTab';
import { SheetStoryTab } from '../components/layout/SheetStoryTab';
import { useCharacterSheet } from '../context/CharacterSheetContext';
import { SheetNavigationProvider } from '../context/SheetNavigationContext';

export function CharacterSheetPage() {
  const { character, resetCharacter, isSaving } = useCharacterSheet();
  const [resetOpen, setResetOpen] = useState(false);
  const [sheetKey, setSheetKey] = useState(0);
  const [activeTab, setActiveTab] = useState<SheetTabId>(() => getInitialSheetTab(character));

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

  const tabBadges = useMemo(
    () => ({
      creation: progress.label,
      inventory: (character.inventory?.length ?? 0) > 0 ? String(character.inventory!.length) : undefined,
      story: storyProgress > 0 ? `${storyProgress}/3` : undefined,
    }),
    [progress.label, character.inventory, storyProgress],
  );

  const handleReset = () => {
    resetCharacter();
    setSheetKey((key) => key + 1);
    setResetOpen(false);
    setActiveTab('creation');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const tabContent = (() => {
    switch (activeTab) {
      case 'creation':
        return <CharacterCreationSection />;
      case 'dice':
        return <SheetDiceTab />;
      case 'inventory':
        return <SheetInventoryTab />;
      case 'shop':
        return <SheetShopTab />;
      case 'summary':
        return <SheetFinalTab />;
      case 'story':
        return <SheetStoryTab />;
      default:
        return null;
    }
  })();

  return (
    <SheetNavigationProvider goToTab={setActiveTab}>
      <SheetAppShell
        key={sheetKey}
        character={character}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabBadges={tabBadges}
        isSaving={isSaving}
        onResetClick={() => setResetOpen(true)}
      >
        {tabContent}
      </SheetAppShell>

      <ResetCharacterModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
      />
    </SheetNavigationProvider>
  );
}
