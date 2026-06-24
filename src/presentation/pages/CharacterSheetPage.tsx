import { lazy, Suspense, useEffect, useMemo, useState } from 'react';
import { getCreationProgress } from '../../application/creation/creationProgress';
import { getInitialSheetTab } from '../../application/sheet/getInitialSheetTab';
import { CharacterManagerModal } from '../components/layout/CharacterManagerModal';
import { ResetCharacterModal } from '../components/layout/ResetCharacterModal';
import { SheetAppShell } from '../components/layout/shell/SheetAppShell';
import type { SheetTabId } from '../components/layout/shell/sheetTabTypes';
import { useCharacterSheet } from '../context/CharacterSheetContext';
import { SheetNavigationProvider } from '../context/SheetNavigationContext';

const CharacterCreationSection = lazy(() =>
  import('../components/sections/CharacterCreationSection').then((m) => ({
    default: m.CharacterCreationSection,
  })),
);
const SheetDiceTab = lazy(() =>
  import('../components/layout/SheetDiceTab').then((m) => ({ default: m.SheetDiceTab })),
);
const SheetInventoryTab = lazy(() =>
  import('../components/layout/SheetInventoryTab').then((m) => ({ default: m.SheetInventoryTab })),
);
const SheetShopTab = lazy(() =>
  import('../components/layout/SheetShopTab').then((m) => ({ default: m.SheetShopTab })),
);
const SheetStoryTab = lazy(() =>
  import('../components/layout/SheetStoryTab').then((m) => ({ default: m.SheetStoryTab })),
);
const SheetFinalTab = lazy(() =>
  import('../components/layout/SheetFinalTab').then((m) => ({ default: m.SheetFinalTab })),
);

function TabFallback() {
  return <p className="st-tab-loading">Carregando…</p>;
}

export function CharacterSheetPage() {
  const { character, resetCharacter, isSaving } = useCharacterSheet();
  const [resetOpen, setResetOpen] = useState(false);
  const [charactersOpen, setCharactersOpen] = useState(false);
  const [sheetKey, setSheetKey] = useState(0);
  const [activeTab, setActiveTab] = useState<SheetTabId>(() => getInitialSheetTab(character));

  useEffect(() => {
    setActiveTab(getInitialSheetTab(character));
    setSheetKey((key) => key + 1);
  }, [character.id]);

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

  const handleCharacterChanged = () => {
    setSheetKey((key) => key + 1);
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
        onCharactersClick={() => setCharactersOpen(true)}
      >
        <Suspense fallback={<TabFallback />}>{tabContent}</Suspense>
      </SheetAppShell>

      <ResetCharacterModal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        onConfirm={handleReset}
      />

      <CharacterManagerModal
        open={charactersOpen}
        onClose={() => setCharactersOpen(false)}
        onCharacterChanged={handleCharacterChanged}
      />
    </SheetNavigationProvider>
  );
}
