import type { ReactNode } from 'react';
import type { CharacterProps } from '../../../../domain/entities/Character';
import type { SheetTabId } from './sheetTabTypes';
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
  children: ReactNode;
  footer?: ReactNode;
};

export function SheetAppShell({
  character,
  activeTab,
  onTabChange,
  tabBadges,
  isSaving,
  onResetClick,
  children,
  footer,
}: SheetAppShellProps) {
  return (
    <div className="stitch-app st-shell">
      <SheetTopBar isSaving={isSaving} onResetClick={onResetClick} />
      <SheetSideNav
        character={character}
        activeTab={activeTab}
        onTabChange={onTabChange}
        badges={tabBadges}
      />
      <SheetMainCanvas activeTab={activeTab} onTabChange={onTabChange} tabBadges={tabBadges}>
        {children}
      </SheetMainCanvas>
      {footer}
    </div>
  );
}
