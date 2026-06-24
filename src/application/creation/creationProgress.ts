import type { CreationChoices } from '../../domain/services/CharacterCreationService';
import { CALLINGS } from '../../shared/data/characterCreationData';
import { normalizeCreationChoices } from '../../shared/data/rewardSlotUtils';

export interface CreationProgress {
  done: number;
  total: number;
  label: string;
}

export function getCreationProgress(raw: CreationChoices | undefined): CreationProgress {
  const c = normalizeCreationChoices(raw);
  const calling = c.callingId ? CALLINGS.find((x) => x.id === c.callingId) : null;
  const requiredCallingSkills = calling?.skillChoiceCount ?? 0;
  const isRanger = c.cultureId === 'rangers';

  const checks = [
    Boolean(c.cultureId),
    Boolean(c.backgroundId),
    Boolean(c.callingId),
    !calling || c.callingSkillChoices.length >= requiredCallingSkills,
    !isRanger || c.rangerSkillChoices.length === 2,
    !isRanger || Boolean(c.rangerBonusAbility),
    (c.rewardPicks ?? []).every(
      (p) => (p.rewardType === 'virtue' && p.virtueId) || (p.rewardType === 'craft' && p.craftId),
    ),
  ];

  const total = checks.length;
  const done = checks.filter(Boolean).length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;

  return { done, total, label: `${pct}%` };
}
