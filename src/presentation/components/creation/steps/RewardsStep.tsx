import { useEffect, useState } from 'react';
import type { RewardSlotDefinition } from '../../../../shared/data/levelRewardData';
import {
  getPickForSlot,
  getUsedVirtueIds,
  type RewardSlotPick,
} from '../../../../shared/data/rewardSlotUtils';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import {
  getRewardSlotPickLabel,
  isRewardSlotPickComplete,
} from '../rewardSlotDisplay';
import { RewardSlotPicker } from '../RewardSlotPicker';

interface RewardsStepProps {
  choices: CreationChoices;
  rewardSlots: RewardSlotDefinition[];
  onUpdateRewardPick: (pick: RewardSlotPick) => void;
}

export function RewardsStep({ choices, rewardSlots, onUpdateRewardPick }: RewardsStepProps) {
  const [activeSlotId, setActiveSlotId] = useState<string | null>(null);

  useEffect(() => {
    if (rewardSlots.length === 0) {
      setActiveSlotId(null);
      return;
    }

    setActiveSlotId((current) => {
      if (current && rewardSlots.some((slot) => slot.id === current)) {
        return current;
      }

      const firstOpen = rewardSlots.find((slot) => {
        const pick = getPickForSlot(choices.rewardPicks ?? [], slot.id);
        return !isRewardSlotPickComplete(pick);
      });

      return firstOpen?.id ?? rewardSlots[0].id;
    });
  }, [rewardSlots, choices.rewardPicks]);

  if (rewardSlots.length === 0) {
    return (
      <p className="st-creation-empty">
        Escolha cultura, chamado e nível para ver as recompensas disponíveis.
      </p>
    );
  }

  const activeSlot = rewardSlots.find((slot) => slot.id === activeSlotId) ?? rewardSlots[0];
  const activePick = getPickForSlot(choices.rewardPicks ?? [], activeSlot.id);
  const usedVirtueIds = getUsedVirtueIds(choices.rewardPicks ?? [], activeSlot.id);

  return (
    <div className="creation-rewards st-creation-rewards">
      <div className="st-creation-reward-slots-nav" role="tablist" aria-label="Recompensas por nível">
        {rewardSlots.map((slot) => {
          const pick = getPickForSlot(choices.rewardPicks ?? [], slot.id);
          const complete = isRewardSlotPickComplete(pick);
          const active = slot.id === activeSlot.id;

          return (
            <button
              key={slot.id}
              type="button"
              role="tab"
              aria-selected={active}
              className={`st-creation-reward-slot-tab${active ? ' st-creation-reward-slot-tab--active' : ''}${complete ? ' st-creation-reward-slot-tab--done' : ''}`}
              onClick={() => setActiveSlotId(slot.id)}
            >
              <span className="st-creation-reward-slot-tab__level">{slot.labelPt}</span>
              <span className="st-creation-reward-slot-tab__pick">{getRewardSlotPickLabel(pick)}</span>
            </button>
          );
        })}
      </div>

      <RewardSlotPicker
        key={activeSlot.id}
        slot={activeSlot}
        pick={activePick}
        cultureId={choices.cultureId}
        usedVirtueIds={usedVirtueIds}
        onChange={onUpdateRewardPick}
      />
    </div>
  );
}
