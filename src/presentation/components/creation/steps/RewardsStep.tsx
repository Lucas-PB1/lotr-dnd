import { Label } from 'flowbite-react';
import type { RewardSlotDefinition } from '../../../../shared/data/levelRewardData';
import {
  getPickForSlot,
  getUsedVirtueIds,
  type RewardSlotPick,
} from '../../../../shared/data/rewardSlotUtils';
import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import { RewardSlotPicker } from '../RewardSlotPicker';

interface RewardsStepProps {
  choices: CreationChoices;
  rewardSlots: RewardSlotDefinition[];
  onUpdateRewardPick: (pick: RewardSlotPick) => void;
}

export function RewardsStep({ choices, rewardSlots, onUpdateRewardPick }: RewardsStepProps) {
  if (rewardSlots.length === 0) {
    return (
      <p className="text-sm text-amber-900/60">
        Escolha cultura, chamado e nível para ver as recompensas disponíveis.
      </p>
    );
  }

  return (
    <div className="creation-rewards border-t border-amber-300/40 pt-3">
      <Label className="text-xs font-semibold uppercase text-amber-900/70">
        Virtudes e Ofícios ({rewardSlots.length} no nível {choices.level})
      </Label>
      <div className="mt-2 grid gap-2 sm:grid-cols-2">
        {rewardSlots.map((slot) => {
          const pick = getPickForSlot(choices.rewardPicks ?? [], slot.id);
          const usedVirtueIds = getUsedVirtueIds(choices.rewardPicks ?? [], slot.id);
          return (
            <RewardSlotPicker
              key={slot.id}
              slot={slot}
              pick={pick}
              cultureId={choices.cultureId}
              usedVirtueIds={usedVirtueIds}
              onChange={onUpdateRewardPick}
            />
          );
        })}
      </div>
    </div>
  );
}
