import { useMemo } from 'react';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { APP_SUBTITLE, APP_TITLE } from '../../../../shared/constants/appLabels';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';
import type { SheetTabId } from './sheetTabTypes';

type SheetTopBarProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  isSaving: boolean;
  onResetClick: () => void;
  onCharactersClick: () => void;
};

export function SheetTopBar({
  character,
  activeTab,
  isSaving,
  onResetClick,
  onCharactersClick,
}: SheetTopBarProps) {
  const heroName = character.name.trim();
  const inPlayMode = Boolean(character.sheetFinalized);
  const activeLabel = useMemo(() => {
    const labels: Record<SheetTabId, string> = {
      creation: 'Criação',
      dice: 'Atributos',
      inventory: 'Inventário',
      shop: 'Mercado',
      story: 'História',
      summary: 'Ficha',
    };
    return labels[activeTab];
  }, [activeTab]);

  return (
    <header className="st-topbar no-print">
      <div className="st-topbar__row st-topbar__row--primary">
        <div className="st-topbar__brand">
          <span className="st-topbar__emblem" aria-hidden>
            ◆
          </span>
          <div className="st-topbar__brand-text">
            <p className="st-topbar__eyebrow">{SHELL_UI.appEyebrow}</p>
            <h1 className="st-topbar__title st-topbar__title--full">{APP_TITLE}</h1>
            <h1 className="st-topbar__title st-topbar__title--short">{SHELL_UI.appTitleShort}</h1>
            <p className="st-topbar__subtitle">{APP_SUBTITLE}</p>
            <p className="st-topbar__active-tab">{activeLabel}</p>
          </div>
        </div>

        <div className="st-topbar__toolbar">
          {heroName ? (
            <p className="st-topbar__hero" title="Personagem ativo">
              {heroName}
            </p>
          ) : null}

          <div className="st-topbar__status" aria-label="Estado da ficha">
            <span
              className={`st-topbar__chip st-topbar__chip--mode${inPlayMode ? ' st-topbar__chip--play' : ''}`}
            >
              {inPlayMode ? SHELL_UI.modePlay : SHELL_UI.modeBuilding}
            </span>
            <div className="st-topbar__chip st-topbar__chip--save" title={SHELL_UI.saveHint}>
              <span
                className={`st-topbar__save-dot${isSaving ? ' st-topbar__save-dot--busy' : ''}`}
                aria-hidden
              />
              <span className="st-topbar__save-label">
                {isSaving ? SHELL_UI.saveBusy : SHELL_UI.saveIdle}
              </span>
            </div>
          </div>

          <span className="st-topbar__divider" aria-hidden />

          <div className="st-topbar__tools">
            <button
              type="button"
              className="st-topbar__chip st-topbar__chip--action"
              onClick={onCharactersClick}
            >
              <span className="st-topbar__chip-label--full">{SHELL_UI.characters}</span>
              <span className="st-topbar__chip-label--short">{SHELL_UI.charactersShort}</span>
            </button>
            <button
              type="button"
              className="st-topbar__chip st-topbar__chip--danger"
              onClick={onResetClick}
            >
              <span className="st-topbar__chip-label--full">{SHELL_UI.reset}</span>
              <span className="st-topbar__chip-label--short">{SHELL_UI.resetShort}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
