import { SparklesIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';
import { ABILITY_LABELS } from '../../../shared/constants/gameConstants';
import type { RewardSlotDefinition } from '../../../shared/data/levelRewardData';
import type { RewardSlotPick } from '../../../shared/data/rewardSlotUtils';
import type { VirtueDefinition } from '../../../shared/data/virtuesAndCraftsData';
import {
  getVirtuesForCulture,
  SCHOLAR_CRAFTS,
} from '../../../shared/data/virtuesAndCraftsData';
import { StitchIcon } from '../icons';
import { RewardOptionCard } from './RewardOptionCard';
import { getVirtueStatTags } from './virtueStatDisplay';

interface RewardSlotPickerProps {
  slot: RewardSlotDefinition;
  pick: RewardSlotPick;
  cultureId: string | null;
  usedVirtueIds: string[];
  onChange: (pick: RewardSlotPick) => void;
}

function VirtueGrid({
  label,
  virtues,
  pick,
  usedVirtueIds,
  onChange,
}: {
  label: string;
  virtues: VirtueDefinition[];
  pick: RewardSlotPick;
  usedVirtueIds: string[];
  onChange: (pick: RewardSlotPick) => void;
}) {
  if (virtues.length === 0) return null;

  return (
    <div className="st-creation-reward-group">
      <p className="st-creation-reward-group__label">{label}</p>
      <div className="st-creation-reward-grid">
        {virtues.map((virtue) => {
          const disabled = usedVirtueIds.includes(virtue.id);
          const selected = pick.virtueId === virtue.id;
          return (
            <RewardOptionCard
              key={virtue.id}
              title={virtue.namePt}
              stats={getVirtueStatTags(virtue)}
              summary={virtue.summaryPt}
              selected={selected}
              disabled={disabled && !selected}
              onClick={() =>
                onChange({
                  ...pick,
                  rewardType: 'virtue',
                  virtueId: selected ? null : virtue.id,
                  virtueAbilityChoice: null,
                })
              }
            />
          );
        })}
      </div>
    </div>
  );
}

export function RewardSlotPicker({
  slot,
  pick,
  cultureId,
  usedVirtueIds,
  onChange,
}: RewardSlotPickerProps) {
  const virtues = getVirtuesForCulture(cultureId);
  const commonVirtues = virtues.filter((v) => v.scopes.includes('common'));
  const culturalVirtues = virtues.filter((v) => !v.scopes.includes('common'));

  const canChooseCraft = slot.kind === 'craft' || slot.kind === 'virtue-or-craft';
  const canChooseVirtue = slot.kind === 'virtue' || slot.kind === 'virtue-or-craft';
  const rewardType =
    slot.kind === 'craft'
      ? 'craft'
      : slot.kind === 'virtue'
        ? 'virtue'
        : pick.rewardType;

  const selectedVirtue = virtues.find((v) => v.id === pick.virtueId);

  const setType = (type: 'virtue' | 'craft') => {
    onChange({
      ...pick,
      rewardType: type,
      virtueId: type === 'virtue' ? pick.virtueId : null,
      craftId: type === 'craft' ? pick.craftId : null,
      virtueAbilityChoice: type === 'virtue' ? pick.virtueAbilityChoice : null,
    });
  };

  return (
    <div className="reward-slot st-creation-reward-slot st-creation-reward-slot--editor">
      {slot.kind === 'virtue-or-craft' && (
        <div className="st-creation-reward-type" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={rewardType === 'virtue'}
            className={`st-creation-reward-type__btn${rewardType === 'virtue' ? ' st-creation-reward-type__btn--active' : ''}`}
            onClick={() => setType('virtue')}
          >
            <StitchIcon icon={SparklesIcon} size="sm" />
            Virtude
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={rewardType === 'craft'}
            className={`st-creation-reward-type__btn${rewardType === 'craft' ? ' st-creation-reward-type__btn--active' : ''}`}
            onClick={() => setType('craft')}
          >
            <StitchIcon icon={WrenchScrewdriverIcon} size="sm" />
            Ofício
          </button>
        </div>
      )}

      {canChooseVirtue && rewardType === 'virtue' && (
        <div className="st-creation-reward-slot__fields">
          <VirtueGrid
            label="Virtudes comuns"
            virtues={commonVirtues}
            pick={pick}
            usedVirtueIds={usedVirtueIds}
            onChange={onChange}
          />
          {culturalVirtues.length > 0 && (
            <VirtueGrid
              label="Virtudes culturais"
              virtues={culturalVirtues}
              pick={pick}
              usedVirtueIds={usedVirtueIds}
              onChange={onChange}
            />
          )}

          {selectedVirtue?.abilityChoice && (
            <div className="st-creation-ability-pick">
              <p className="st-creation-ability-pick__label">Bônus de atributo</p>
              <div className="toggle-group__chips">
                {selectedVirtue.abilityChoice.map((ability) => (
                  <button
                    key={ability}
                    type="button"
                    className={`st-creation-chip${pick.virtueAbilityChoice === ability ? ' st-creation-chip--on' : ''}`}
                    onClick={() =>
                      onChange({
                        ...pick,
                        virtueAbilityChoice: ability,
                      })
                    }
                  >
                    {ABILITY_LABELS[ability]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {canChooseCraft && rewardType === 'craft' && (
        <div className="st-creation-reward-slot__fields">
          <div className="st-creation-reward-grid">
            {SCHOLAR_CRAFTS.map((craft) => {
              const selected = pick.craftId === craft.id;
              return (
                <RewardOptionCard
                  key={craft.id}
                  title={craft.namePt}
                  summary={craft.summaryPt}
                  selected={selected}
                  onClick={() =>
                    onChange({
                      ...pick,
                      rewardType: 'craft',
                      craftId: selected ? null : craft.id,
                    })
                  }
                />
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
