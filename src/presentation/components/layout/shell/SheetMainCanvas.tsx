import type { ReactNode } from 'react';
import { SHEET_TABS } from '../../../../shared/constants/appLabels';
import { FadeSlide } from '../../stitch/motion/FadeSlide';
import type { SheetTabId } from './sheetTabTypes';
import { SHEET_TAB_ORDER } from './sheetTabTypes';

type SheetMainCanvasProps = {
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
  tabBadges?: Partial<Record<SheetTabId, string>>;
  children: ReactNode;
};

export function SheetMainCanvas({ activeTab, onTabChange, tabBadges, children }: SheetMainCanvasProps) {
  return (
    <main className="st-main">
      <div className="st-main__inner">
        <nav className="st-mobile-nav no-print" aria-label="Abas da ficha">
          {SHEET_TAB_ORDER.map((tabId) => (
            <button
              key={tabId}
              type="button"
              className={`st-mobile-nav__btn${tabId === activeTab ? ' st-mobile-nav__btn--active' : ''}`}
              onClick={() => onTabChange(tabId)}
            >
              {SHEET_TABS[tabId]}
              {tabBadges?.[tabId] ? ` (${tabBadges[tabId]})` : ''}
            </button>
          ))}
        </nav>

        <FadeSlide motionKey={activeTab}>{children}</FadeSlide>
      </div>
    </main>
  );
}
