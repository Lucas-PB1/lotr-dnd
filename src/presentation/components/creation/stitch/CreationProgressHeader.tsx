import { CREATION_UI } from '../../../../shared/constants/creationLabels';

type CreationProgressHeaderProps = {
  percent: number;
  label: string;
};

export function CreationProgressHeader({ percent, label }: CreationProgressHeaderProps) {
  return (
    <header className="st-creation-header">
      <div className="st-creation-header__copy">
        <h2 className="st-creation-header__title">{CREATION_UI.pageTitle}</h2>
        <p className="st-creation-header__hint">{CREATION_UI.pageHint}</p>
      </div>
      <div className="st-creation-header__progress">
        <div className="st-creation-header__progress-meta">
          <span className="st-creation-header__progress-label">{CREATION_UI.progressLabel}</span>
          <span className="st-creation-header__progress-badge">{label}</span>
        </div>
        <div className="st-creation-header__progress-track" role="progressbar" aria-valuenow={percent} aria-valuemin={0} aria-valuemax={100}>
          <div className="st-creation-header__progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>
    </header>
  );
}
