import type { ReactNode } from 'react';
import type { CharacterProps } from '../../../../domain/entities/Character';
import type { SheetTabId } from './sheetTabTypes';
import { SheetAppFooter } from './SheetAppFooter';
import { SheetMainCanvas } from './SheetMainCanvas';
import { SheetSideNav } from './SheetSideNav';
import { SheetTopBar } from './SheetTopBar';

type SheetAppShellProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
  tabBadges?: Partial<Record<SheetTabId, string>>;
  isSaving: boolean;
  onResetClick: () => void;
  onCharactersClick: () => void;
  children: ReactNode;
};

export function SheetAppShell({
  character,
  activeTab,
  onTabChange,
  tabBadges,
  isSaving,
  onResetClick,
  onCharactersClick,
  children,
}: SheetAppShellProps) {
  return (
    <div className="stitch-app st-shell">
      <SheetTopBar
        character={character}
        activeTab={activeTab}
        isSaving={isSaving}
        onResetClick={onResetClick}
        onCharactersClick={onCharactersClick}
      />
      <SheetSideNav
        character={character}
        activeTab={activeTab}
        onTabChange={onTabChange}
        badges={tabBadges}
      />
      <SheetMainCanvas
        character={character}
        activeTab={activeTab}
        onTabChange={onTabChange}
        tabBadges={tabBadges}
      >
        {children}
        <SheetAppFooter />
      </SheetMainCanvas>
    </div>
  );
}
