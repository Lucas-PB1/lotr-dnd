import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import type { CallingDefinition, CultureDefinition } from '../../../../shared/data/characterCreationData';
import type { RewardSlotDefinition } from '../../../../shared/data/levelRewardData';
import { getPickForSlot } from '../../../../shared/data/rewardSlotUtils';
import type { CreationSectionId } from './creationSectionStatus';

export function getCreationSectionSummary(
  sectionId: CreationSectionId,
  choices: CreationChoices,
  culture: CultureDefinition | null | undefined,
  calling: CallingDefinition | undefined,
  rewardSlots: RewardSlotDefinition[],
): string | undefined {
  switch (sectionId) {
    case 'culture': {
      if (!choices.cultureId || !culture) return undefined;
      const parts = [culture.namePt];
      if (calling) parts.push(calling.namePt);
      if (choices.level > 1) parts.push(`Nv. ${choices.level}`);
      return parts.join(' · ');
    }
    case 'skills': {
      if (!calling) return undefined;
      return `${choices.callingSkillChoices.length}/${calling.skillChoiceCount} perícias`;
    }
    case 'rewards': {
      if (rewardSlots.length === 0) return undefined;
      const filled = rewardSlots.filter((slot) => {
        const pick = getPickForSlot(choices.rewardPicks ?? [], slot.id);
        return (
          (pick.rewardType === 'virtue' && pick.virtueId) ||
          (pick.rewardType === 'craft' && pick.craftId)
        );
      }).length;
      return `${filled}/${rewardSlots.length} escolhas`;
    }
    case 'equipment':
      return calling ? `Equip. ${calling.namePt}` : undefined;
    default:
      return undefined;
  }
}
