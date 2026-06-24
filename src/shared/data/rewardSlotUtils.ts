import type { AbilityName } from '../../shared/constants/gameConstants';
import {
  DEFAULT_CREATION_CHOICES,
  type CreationChoices,
} from '../../domain/services/CharacterCreationService';
import { getDefaultEquipmentOptions } from './startingEquipmentData';

/** Escolha preenchida para um slot de virtude/ofício. */
export interface RewardSlotPick {
  slotId: string;
  rewardType: 'virtue' | 'craft';
  virtueId: string | null;
  craftId: string | null;
  virtueAbilityChoice: AbilityName | null;
}

export function createEmptyPick(slotId: string): RewardSlotPick {
  return {
    slotId,
    rewardType: 'virtue',
    virtueId: null,
    craftId: null,
    virtueAbilityChoice: null,
  };
}

/** Garante campos novos em saves antigos do localStorage. */
export function migrateCreationChoices(
  choices: CreationChoices | undefined | null,
): CreationChoices {
  const base: CreationChoices = {
    ...DEFAULT_CREATION_CHOICES,
    ...(choices ?? {}),
    rewardPicks: choices?.rewardPicks ?? [],
    equipmentOptions: choices?.equipmentOptions ?? {},
    scholarToolChoices: choices?.scholarToolChoices ?? [],
    rangerSkillChoices: choices?.rangerSkillChoices ?? [],
    callingSkillChoices: choices?.callingSkillChoices ?? [],
  };

  const legacy = choices as CreationChoices & {
    rewardType?: 'virtue' | 'craft' | null;
    virtueId?: string | null;
    craftId?: string | null;
    virtueAbilityChoice?: AbilityName | null;
  };

  if (
    base.rewardPicks.length === 0 &&
    legacy?.rewardType &&
    (legacy.virtueId || legacy.craftId)
  ) {
    const slotId =
      legacy.rewardType === 'craft' ? 'legacy-craft-1' : 'culture-starting-virtue';
    base.rewardPicks = [
      {
        slotId,
        rewardType: legacy.rewardType,
        virtueId: legacy.virtueId ?? null,
        craftId: legacy.craftId ?? null,
        virtueAbilityChoice: legacy.virtueAbilityChoice ?? null,
      },
    ];
  }

  if (
    base.callingId &&
    Object.keys(base.equipmentOptions).length === 0
  ) {
    base.equipmentOptions = getDefaultEquipmentOptions(base.callingId);
  }

  return base;
}

export function trimRewardPicks(
  picks: RewardSlotPick[],
  activeSlotIds: string[],
): RewardSlotPick[] {
  const active = new Set(activeSlotIds);
  return picks.filter((p) => active.has(p.slotId));
}

export function getPickForSlot(
  picks: RewardSlotPick[],
  slotId: string,
): RewardSlotPick {
  return picks.find((p) => p.slotId === slotId) ?? createEmptyPick(slotId);
}

export function upsertPick(
  picks: RewardSlotPick[],
  pick: RewardSlotPick,
): RewardSlotPick[] {
  const rest = picks.filter((p) => p.slotId !== pick.slotId);
  return [...rest, pick];
}

export function getUsedVirtueIds(picks: RewardSlotPick[], exceptSlotId?: string): string[] {
  return picks
    .filter((p) => p.slotId !== exceptSlotId && p.rewardType === 'virtue' && p.virtueId)
    .map((p) => p.virtueId!);
}
