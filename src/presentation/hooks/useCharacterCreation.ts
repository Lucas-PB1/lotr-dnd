import { useMemo } from 'react';
import {
  CharacterCreationService,
  type CreationChoices,
} from '../../domain/services/CharacterCreationService';
import {
  CALLINGS,
  getBackground,
  getCulture,
} from '../../shared/data/characterCreationData';
import { getRewardSlots } from '../../shared/data/levelRewardData';
import {
  normalizeCreationChoices,
  upsertPick,
  type RewardSlotPick,
} from '../../shared/data/rewardSlotUtils';
import {
  getCallingEquipment,
  getDefaultEquipmentOptions,
} from '../../shared/data/startingEquipmentData';
import { useCharacterSheet } from '../context/CharacterSheetContext';

export function useCharacterCreation() {
  const { character, updateCharacter } = useCharacterSheet();
  const choices = normalizeCreationChoices(character.creationChoices);

  const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
  const background =
    choices.cultureId && choices.backgroundId
      ? getBackground(choices.cultureId, choices.backgroundId)
      : null;
  const calling = choices.callingId
    ? CALLINGS.find((c) => c.id === choices.callingId)
    : undefined;

  const rewardSlots = useMemo(
    () => getRewardSlots(choices.cultureId, choices.callingId, choices.level),
    [choices.cultureId, choices.callingId, choices.level],
  );

  const callingEquipment = useMemo(
    () => getCallingEquipment(choices.callingId),
    [choices.callingId],
  );

  const bonusPreview = useMemo(
    () => CharacterCreationService.buildAbilityBonusSources(choices),
    [choices],
  );

  const applyChoices = (next: CreationChoices) => {
    const normalized = CharacterCreationService.normalizeChoices(choices, next);
    const merged = { ...character, creationChoices: normalized };
    const updates = CharacterCreationService.applyCreationChoices(merged, normalized);
    updateCharacter({ ...updates, creationChoices: normalized });
  };

  const setChoice = (partial: Partial<CreationChoices>) => {
    let next = { ...choices, ...partial };

    if (partial.cultureId !== undefined) {
      next = {
        ...next,
        subcultureId: null,
        backgroundId: null,
        rangerBonusAbility: null,
        rangerSkillChoices: [],
        rewardPicks: [],
        startingItemChoices: {},
      };
      const c = getCulture(partial.cultureId ?? '');
      if (c?.subcultures.length === 1) {
        next.subcultureId = c.subcultures[0].id;
      }
    }

    if (partial.callingId !== undefined) {
      next = {
        ...next,
        callingSkillChoices: [],
        equipmentOptions: getDefaultEquipmentOptions(partial.callingId),
        scholarToolChoices: [],
        startingItemChoices: {},
      };
    }

    if (partial.backgroundId !== undefined) {
      const { 'background-tool': _, ...rest } = next.startingItemChoices ?? {};
      next.startingItemChoices = rest;
    }

    applyChoices(next);
  };

  const updateRewardPick = (pick: RewardSlotPick) => {
    const rewardPicks = upsertPick(choices.rewardPicks ?? [], pick);
    applyChoices({ ...choices, rewardPicks });
  };

  const updateEquipmentOption = (groupId: string, optionId: string) => {
    const weaponSlotIds = new Set([
      'pick-martial-melee',
      'pick-simple-with-martial',
      'pick-simple-melee-a',
      'pick-simple-melee-b',
      'pick-extra-simple-melee',
    ]);
    const cleanedChoices = { ...(choices.startingItemChoices ?? {}) };
    if (groupId === 'weapons-melee' || groupId === 'weapons-ranged' || groupId === 'weapons-extra') {
      for (const key of weaponSlotIds) {
        delete cleanedChoices[key];
      }
    }

    applyChoices({
      ...choices,
      startingItemChoices: cleanedChoices,
      equipmentOptions: { ...(choices.equipmentOptions ?? {}), [groupId]: optionId },
    });
  };

  const updateStartingItemChoice = (slotId: string, itemId: string) => {
    applyChoices({
      ...choices,
      startingItemChoices: {
        ...(choices.startingItemChoices ?? {}),
        [slotId]: itemId,
      },
    });
  };

  return {
    choices,
    culture,
    background,
    calling,
    rewardSlots,
    callingEquipment,
    bonusPreview,
    setChoice,
    updateRewardPick,
    updateEquipmentOption,
    updateStartingItemChoice,
  };
}
