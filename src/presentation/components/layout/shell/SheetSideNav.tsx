import { countJourneyDone } from '../../../../application/sheet/getSheetJourney';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { SHEET_TABS } from '../../../../shared/constants/appLabels';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';
import { SHEET_TAB_ICONS, StitchIconPair } from '../../icons';
import type { SheetTabId } from './sheetTabTypes';
import { SHEET_TAB_ORDER } from './sheetTabTypes';

type TabBadge = Partial<Record<SheetTabId, string>>;

type SheetSideNavProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  onTabChange: (tab: SheetTabId) => void;
  badges?: TabBadge;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function SheetSideNav({ character, activeTab, onTabChange, badges }: SheetSideNavProps) {
  const displayName = character.name.trim() || 'Herói sem nome';
  const subtitle = [character.culture, character.callingAndLevel].filter(Boolean).join(' · ') || 'Aventureiro';
  const { done, total } = countJourneyDone(character);
  const onSheetTab = activeTab === 'summary';

  return (
    <aside className="st-sidenav no-print" aria-label="Navegação da ficha">
      <div className="st-sidenav__profile">
        <div className="st-sidenav__avatar" aria-hidden>
          {initials(displayName)}
        </div>
        <div>
          <p className="st-sidenav__name">{displayName}</p>
          <p className="st-sidenav__subtitle">{subtitle}</p>
        </div>
      </div>

      <nav className="st-sidenav__nav">
        {SHEET_TAB_ORDER.map((tabId) => {
          const active = tabId === activeTab;
          const badge = badges?.[tabId];
          const isSheet = tabId === 'summary';
          return (
            <button
              key={tabId}
              type="button"
              className={`st-sidenav__link${active ? ' st-sidenav__link--active' : ''}${isSheet ? ' st-sidenav__link--sheet' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => onTabChange(tabId)}
            >
              <StitchIconPair
                pair={SHEET_TAB_ICONS[tabId]}
                solid={active}
                size="md"
                className="shrink-0"
              />
              <span>{SHEET_TABS[tabId]}</span>
              {badge && <span className="st-sidenav__badge">{badge}</span>}
            </button>
          );
        })}
      </nav>

      <div className="st-sidenav__footer">
        <p className="st-sidenav__progress">
          {character.sheetFinalized ? SHELL_UI.sheetReady : SHELL_UI.finishHint}
        </p>
        <p className="st-sidenav__progress-count" aria-live="polite">
          {done}/{total} passos
        </p>
        {!onSheetTab ? (
          <button
            type="button"
            className="st-sidenav__cta"
            onClick={() => onTabChange('summary')}
          >
            {character.sheetFinalized ? SHELL_UI.goToSheet : SHELL_UI.openSheet}
          </button>
        ) : null}
      </div>
    </aside>
  );
}
