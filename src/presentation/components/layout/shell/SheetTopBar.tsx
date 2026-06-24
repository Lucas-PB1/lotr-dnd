import { useMemo } from 'react';
import { getSheetJourney } from '../../../../application/sheet/getSheetJourney';
import type { CharacterProps } from '../../../../domain/entities/Character';
import { APP_SUBTITLE, APP_TITLE } from '../../../../shared/constants/appLabels';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';
import type { SheetTabId } from './sheetTabTypes';
import { SheetJourneyStrip } from './SheetJourneyStrip';

type SheetTopBarProps = {
  character: CharacterProps;
  activeTab: SheetTabId;
  isSaving: boolean;
  onResetClick: () => void;
  onTabChange: (tab: SheetTabId) => void;
};

export function SheetTopBar({
  character,
  activeTab,
  isSaving,
  onResetClick,
  onTabChange,
}: SheetTopBarProps) {
  const journeySteps = useMemo(
    () => getSheetJourney(character, activeTab),
    [character, activeTab],
  );

  const heroName = character.name.trim();
  const inPlayMode = Boolean(character.sheetFinalized);

  return (
    <header className="st-topbar no-print">
      <div className="st-topbar__row st-topbar__row--primary">
        <div className="st-topbar__brand">
          <span className="st-topbar__emblem" aria-hidden>
            ◆
          </span>
          <div>
            <p className="st-topbar__eyebrow">{SHELL_UI.appEyebrow}</p>
            <h1 className="st-topbar__title">{APP_TITLE}</h1>
            <p className="st-topbar__subtitle">{APP_SUBTITLE}</p>
          </div>
        </div>

        <div className="st-topbar__context">
          {heroName ? (
            <p className="st-topbar__hero" title="Personagem ativo">
              {heroName}
            </p>
          ) : null}
          <span
            className={`st-topbar__mode${inPlayMode ? ' st-topbar__mode--play' : ''}`}
          >
            {inPlayMode ? SHELL_UI.modePlay : SHELL_UI.modeBuilding}
          </span>
        </div>

        <div className="st-topbar__actions">
          <div className="st-topbar__save" title={SHELL_UI.saveHint}>
            <span
              className={`st-topbar__save-dot${isSaving ? ' st-topbar__save-dot--busy' : ''}`}
              aria-hidden
            />
            <span className="st-topbar__save-label">
              {isSaving ? SHELL_UI.saveBusy : SHELL_UI.saveIdle}
            </span>
          </div>
          <button type="button" className="st-topbar__reset" onClick={onResetClick}>
            {SHELL_UI.reset}
          </button>
        </div>
      </div>

      <div className="st-topbar__row st-topbar__row--journey">
        <SheetJourneyStrip steps={journeySteps} onStepClick={onTabChange} />
      </div>
    </header>
  );
}
