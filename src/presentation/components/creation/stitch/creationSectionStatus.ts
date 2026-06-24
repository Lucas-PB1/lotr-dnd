import type { CreationChoices } from '../../../../domain/services/CharacterCreationService';
import { CALLINGS } from '../../../../shared/data/characterCreationData';
import { normalizeCreationChoices } from '../../../../shared/data/rewardSlotUtils';

export type CreationSectionId = 'culture' | 'skills' | 'rewards' | 'equipment';

export function isCreationSectionComplete(
  section: CreationSectionId,
  raw: CreationChoices | undefined,
): boolean {
  const c = normalizeCreationChoices(raw);
  const calling = c.callingId ? CALLINGS.find((x) => x.id === c.callingId) : null;
  const requiredCallingSkills = calling?.skillChoiceCount ?? 0;
  const isRanger = c.cultureId === 'rangers';

  switch (section) {
    case 'culture':
      return (
        Boolean(c.cultureId) &&
        Boolean(c.backgroundId) &&
        Boolean(c.callingId) &&
        (!isRanger || (c.rangerSkillChoices.length === 2 && Boolean(c.rangerBonusAbility)))
      );
    case 'skills':
      return Boolean(calling && c.callingSkillChoices.length >= requiredCallingSkills);
    case 'rewards':
      return (c.rewardPicks ?? []).every(
        (p) => (p.rewardType === 'virtue' && p.virtueId) || (p.rewardType === 'craft' && p.craftId),
      );
    case 'equipment':
      return Boolean(c.callingId);
    default:
      return false;
  }
}

export const CREATION_SECTION_NUMERALS = ['I', 'II', 'III', 'IV'] as const;
