import { TapScale } from '../stitch/motion/TapScale';

type RewardOptionCardProps = {
  title: string;
  summary: string;
  stats?: string[];
  selected?: boolean;
  disabled?: boolean;
  onClick: () => void;
};

export function RewardOptionCard({
  title,
  summary,
  stats,
  selected,
  disabled,
  onClick,
}: RewardOptionCardProps) {
  return (
    <TapScale
      type="button"
      className={`st-creation-reward-card${selected ? ' st-creation-reward-card--selected' : ''}${disabled ? ' st-creation-reward-card--disabled' : ''}`}
      disabled={disabled}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="st-creation-reward-card__title">{title}</span>
      {stats && stats.length > 0 && (
        <span className="st-creation-reward-card__stats">
          {stats.map((stat) => (
            <span key={stat} className="st-creation-reward-card__stat">
              {stat}
            </span>
          ))}
        </span>
      )}
      <span className="st-creation-reward-card__summary">{summary}</span>
    </TapScale>
  );
}
