import { getCraftById, getVirtueById } from '../../../shared/data/virtuesAndCraftsData';
import type { RewardSlotPick } from '../../../shared/data/rewardSlotUtils';

export function isRewardSlotPickComplete(pick: RewardSlotPick): boolean {
  if (pick.rewardType === 'virtue') return Boolean(pick.virtueId);
  return Boolean(pick.craftId);
}

export function getRewardSlotPickLabel(pick: RewardSlotPick): string {
  if (pick.rewardType === 'virtue' && pick.virtueId) {
    return getVirtueById(pick.virtueId)?.namePt ?? pick.virtueId;
  }
  if (pick.craftId) {
    return getCraftById(pick.craftId)?.namePt ?? pick.craftId;
  }
  return 'Escolher…';
}
