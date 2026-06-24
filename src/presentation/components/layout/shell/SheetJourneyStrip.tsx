import type { JourneyStep } from '../../../../application/sheet/getSheetJourney';
import { SHELL_UI } from '../../../../shared/constants/shellLabels';

type SheetJourneyStripProps = {
  steps: JourneyStep[];
  onStepClick: (tabId: JourneyStep['tabId']) => void;
};

export function SheetJourneyStrip({ steps, onStepClick }: SheetJourneyStripProps) {
  return (
    <nav className="st-journey no-print" aria-label={SHELL_UI.journeyLabel}>
      <ol className="st-journey__list">
        {steps.map((step, index) => (
          <li key={step.id} className="st-journey__item">
            <button
              type="button"
              className={`st-journey__step st-journey__step--${step.status}`}
              aria-current={step.status === 'current' ? 'step' : undefined}
              onClick={() => onStepClick(step.tabId)}
            >
              <span className="st-journey__dot" aria-hidden />
              <span className="st-journey__label">{step.label}</span>
            </button>
            {index < steps.length - 1 ? <span className="st-journey__connector" aria-hidden /> : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
