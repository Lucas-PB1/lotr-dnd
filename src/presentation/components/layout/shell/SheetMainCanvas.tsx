import type { ReactNode } from 'react';
import { SHEET_TABS } from '../../../../shared/constants/appLabels';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { SHEET_TAB_ICONS, StitchIconPair } from '../../icons';
import { FadeSlide } from '../../stitch/motion/FadeSlide';
import type { SheetTabId } from './sheetTabTypes';
import { SHEET_TAB_ORDER } from './sheetTabTypes';
import { SheetMobileProgress } from './SheetMobileProgress';

const MOBILE_TAB_SHORT: Record<SheetTabId, string> = {
  creation: 'Criação',
  dice: 'Atributos',
  inventory: 'Inv.',
  shop: 'Merc.',
  story: 'Hist.',
  summary: 'Ficha',
};

type SheetMainCanvasProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
  tabBadges?: Partial<Record<SheetTabId, string>>;
  children: ReactNode;
};

export function SheetMainCanvas({
  character,
  activeTab,
  onTabChange,
  tabBadges,
  children,
}: SheetMainCanvasProps) {
  return (
    <main className="st-main">
      <div className="st-main__inner">
        <div className="st-mobile-shell no-print">
          <nav className="st-mobile-nav" aria-label="Abas da ficha">
            {SHEET_TAB_ORDER.map((tabId) => {
              const active = tabId === activeTab;
              const badge = tabBadges?.[tabId];
              return (
                <button
                  key={tabId}
                  type="button"
                  className={`st-mobile-nav__btn${active ? ' st-mobile-nav__btn--active' : ''}${tabId === 'summary' ? ' st-mobile-nav__btn--sheet' : ''}`}
                  aria-current={active ? 'page' : undefined}
                  onClick={() => onTabChange(tabId)}
                >
                  <StitchIconPair pair={SHEET_TAB_ICONS[tabId]} solid={active} size="md" />
                  <span className="st-mobile-nav__label">{MOBILE_TAB_SHORT[tabId] ?? SHEET_TABS[tabId]}</span>
                  {badge ? <span className="st-mobile-nav__badge">{badge}</span> : null}
                </button>
              );
            })}
          </nav>
          <SheetMobileProgress character={character} activeTab={activeTab} onTabChange={onTabChange} />
        </div>

        <FadeSlide motionKey={activeTab}>{children}</FadeSlide>
      </div>
    </main>
  );
}
