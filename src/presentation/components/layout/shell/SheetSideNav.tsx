import type { CharacterProps } from '../../../../domain/entities/Character';
import { SHEET_TABS } from '../../../../shared/constants/appLabels';
import type { SheetTabId } from './sheetTabTypes';
import { SHEET_TAB_ICONS, SHEET_TAB_ORDER } from './sheetTabTypes';

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
          return (
            <button
              key={tabId}
              type="button"
              className={`st-sidenav__link${active ? ' st-sidenav__link--active' : ''}`}
              aria-current={active ? 'page' : undefined}
              onClick={() => onTabChange(tabId)}
            >
              <span
                className={`material-symbols-outlined${active && tabId === 'inventory' ? ' material-symbols-outlined--filled' : ''}`}
              >
                {SHEET_TAB_ICONS[tabId]}
              </span>
              <span>{SHEET_TABS[tabId]}</span>
              {badge && <span className="st-sidenav__badge">{badge}</span>}
            </button>
          );
        })}
      </nav>
    </aside>
  );
}
