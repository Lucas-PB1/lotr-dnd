import type { AbilityName } from '../../shared/constants/gameConstants';
import { ABILITY_NAMES, LOTR_SKILLS } from '../../shared/constants/gameConstants';
import type { CharacterProps } from '../entities/Character';
import type { AbilityBonusSource } from './AbilityBonusService';
import {
  getBackground,
  getCalling,
  getCulture,
  getSubculture,
} from '../../shared/data/characterCreationData';
import { getRewardSlots } from '../../shared/data/levelRewardData';
import type { RewardSlotPick } from '../../shared/data/rewardSlotUtils';
import {
  getPickForSlot,
  trimRewardPicks,
  upsertPick,
} from '../../shared/data/rewardSlotUtils';
import {
  getDefaultEquipmentOptions,
} from '../../shared/data/startingEquipmentData';
import {
  normalizeStartingItemChoices,
} from '../../shared/data/startingItemSlots';
import {
  buildStartingInventory,
  inventoryToSummaryText,
} from '../../shared/data/startingInventoryBuilder';
import {
  getCraftById,
  getVirtueById,
} from '../../shared/data/virtuesAndCraftsData';

export interface CreationChoices {
  cultureId: string | null;
  subcultureId: string | null;
  backgroundId: string | null;
  callingId: string | null;
  level: number;
  rangerBonusAbility: AbilityName | null;
  callingSkillChoices: string[];
  rangerSkillChoices: string[];
  rewardPicks: RewardSlotPick[];
  equipmentOptions: Record<string, string>;
  scholarToolChoices: string[];
  /** Escolhas de itens reais do catálogo (armas, ferramentas de origem, etc.) */
  startingItemChoices: Record<string, string>;
}

export const DEFAULT_CREATION_CHOICES: CreationChoices = {
  cultureId: null,
  subcultureId: null,
  backgroundId: null,
  callingId: null,
  level: 1,
  rangerBonusAbility: null,
  callingSkillChoices: [],
  rangerSkillChoices: [],
  rewardPicks: [],
  equipmentOptions: {},
  scholarToolChoices: [],
  startingItemChoices: {},
};

const RANGER_SKILL_OPTIONS = ['explore', 'hunting', 'oldLore', 'perception', 'stealth', 'travel'];

export class CharacterCreationService {
  static normalizeChoices(prev: CreationChoices, next: CreationChoices): CreationChoices {
    const slots = getRewardSlots(next.cultureId, next.callingId, next.level);
    const slotIds = slots.map((s) => s.id);
    let rewardPicks = trimRewardPicks(next.rewardPicks ?? [], slotIds);

    for (const slot of slots) {
      const existing = getPickForSlot(rewardPicks, slot.id);
      const pick: RewardSlotPick = {
        ...existing,
        slotId: slot.id,
        rewardType: slot.kind === 'craft' ? 'craft' : existing.rewardType,
      };
      rewardPicks = upsertPick(rewardPicks, pick);
    }

    let equipmentOptions = next.equipmentOptions ?? {};
    if (next.callingId !== prev.callingId || Object.keys(equipmentOptions).length === 0) {
      equipmentOptions = getDefaultEquipmentOptions(next.callingId);
    }

    let scholarToolChoices = next.scholarToolChoices ?? [];
    if (next.callingId !== 'scholar') {
      scholarToolChoices = [];
    }

    const startingItemChoices = normalizeStartingItemChoices({
      ...next,
      rewardPicks,
      equipmentOptions,
      scholarToolChoices,
    });

    return {
      ...next,
      rewardPicks,
      equipmentOptions,
      scholarToolChoices,
      startingItemChoices,
    };
  }

  static buildAbilityBonusSources(choices: CreationChoices): AbilityBonusSource[] {
    const sources: AbilityBonusSource[] = [];

    if (choices.cultureId) {
      const culture = getCulture(choices.cultureId);
      if (culture && Object.keys(culture.abilityBonuses).length > 0) {
        sources.push({
          id: `culture-${culture.id}`,
          label: `Cultura: ${culture.namePt}`,
          bonuses: { ...culture.abilityBonuses },
        });
      }
    }

    if (choices.cultureId && choices.subcultureId) {
      const sub = getSubculture(choices.cultureId, choices.subcultureId);
      if (sub && Object.keys(sub.abilityBonuses).length > 0) {
        sources.push({
          id: `subculture-${sub.id}`,
          label: `Subcultura: ${sub.name}`,
          bonuses: { ...sub.abilityBonuses },
        });
      }
    }

    if (choices.cultureId === 'rangers' && choices.rangerBonusAbility) {
      sources.push({
        id: 'ranger-free-bonus',
        label: 'Patrulheiro: bônus livre',
        bonuses: { [choices.rangerBonusAbility]: 1 },
      });
    }

    for (const pick of choices.rewardPicks ?? []) {
      if (pick.rewardType !== 'virtue' || !pick.virtueId) continue;
      const virtue = getVirtueById(pick.virtueId);
      if (!virtue) continue;

      const bonuses: Partial<Record<AbilityName, number>> = { ...virtue.abilityBonuses };
      if (virtue.abilityChoice && pick.virtueAbilityChoice) {
        bonuses[pick.virtueAbilityChoice] = (bonuses[pick.virtueAbilityChoice] ?? 0) + 1;
      }
      if (Object.keys(bonuses).length > 0) {
        sources.push({
          id: `virtue-${pick.slotId}-${virtue.id}`,
          label: `Virtude: ${virtue.namePt}`,
          bonuses,
        });
      }
    }

    return sources;
  }

  static buildRewardsAndFeaturesText(choices: CreationChoices): string {
    const lines: string[] = [];
    const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
    const background =
      choices.cultureId && choices.backgroundId
        ? getBackground(choices.cultureId, choices.backgroundId)
        : null;
    const calling = choices.callingId ? getCalling(choices.callingId) : null;
    const subculture =
      choices.cultureId && choices.subcultureId
        ? getSubculture(choices.cultureId, choices.subcultureId)
        : null;

    if (culture) {
      lines.push(`=== ${culture.namePt} ===`);
      lines.push(...culture.traits);
      if (subculture) {
        lines.push(`Subcultura: ${subculture.name}`);
        lines.push(...subculture.traits);
      }
    }
    if (background) {
      lines.push(`\n=== Antecedente: ${background.name} ===`);
      lines.push(`Traços: ${background.distinctiveFeatures.join(', ')}`);
    }
    if (calling) {
      lines.push(`\n=== Chamado: ${calling.namePt} (nível ${choices.level}) ===`);
      lines.push(calling.description);
      lines.push(`Armaduras: ${calling.armorProficiencies}`);
      lines.push(`Armas: ${calling.weaponProficiencies}`);
    }

    const slots = getRewardSlots(choices.cultureId, choices.callingId, choices.level);
    for (const slot of slots) {
      const pick = choices.rewardPicks?.find((p) => p.slotId === slot.id);
      if (!pick) continue;

      if (pick.rewardType === 'virtue' && pick.virtueId) {
        const virtue = getVirtueById(pick.virtueId);
        if (virtue) {
          lines.push(`\n=== ${slot.labelPt}: Virtude ${virtue.namePt} ===`);
          lines.push(virtue.summaryPt);
          if (virtue.abilityChoice && pick.virtueAbilityChoice) {
            lines.push(`Atributo: ${pick.virtueAbilityChoice}`);
          }
          if (virtue.acBonus) lines.push(`CA: +${virtue.acBonus}`);
        }
      } else if (pick.rewardType === 'craft' && pick.craftId) {
        const craft = getCraftById(pick.craftId);
        if (craft) {
          lines.push(`\n=== ${slot.labelPt}: Ofício ${craft.namePt} ===`);
          lines.push(craft.summaryPt);
        }
      }
    }

    return lines.join('\n');
  }

  static applyCreationChoices(
    props: CharacterProps,
    choices: CreationChoices,
  ): Partial<CharacterProps> {
    const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
    const background =
      choices.cultureId && choices.backgroundId
        ? getBackground(choices.cultureId, choices.backgroundId)
        : null;
    const calling = choices.callingId ? getCalling(choices.callingId) : null;
    const subculture =
      choices.cultureId && choices.subcultureId
        ? getSubculture(choices.cultureId, choices.subcultureId)
        : null;

    const equipmentOptions =
      Object.keys(choices.equipmentOptions ?? {}).length > 0
        ? choices.equipmentOptions
        : getDefaultEquipmentOptions(choices.callingId);

    const normalizedChoices = {
      ...choices,
      equipmentOptions,
      startingItemChoices: normalizeStartingItemChoices({
        ...choices,
        equipmentOptions,
      }),
    };

    const inventory = buildStartingInventory(normalizedChoices);

    const living = culture?.standardOfLiving ?? 'Comum';
    const silverByLiving: Record<string, number> = { Frugal: 10, Comum: 15, Próspero: 20 };
    const silver = silverByLiving[living] ?? 15;

    const skills = { ...props.skills };
    for (const skill of LOTR_SKILLS) {
      skills[skill.id] = { proficient: false, expertise: false };
    }

    const markProficient = (skillId: string) => {
      if (skills[skillId]) {
        skills[skillId] = { ...skills[skillId], proficient: true };
      }
    };

    culture?.skillProficiencies.forEach(markProficient);
    background?.skills.forEach(markProficient);
    choices.callingSkillChoices.forEach(markProficient);
    choices.rangerSkillChoices.forEach(markProficient);

    const savingThrows = { ...props.savingThrows };
    for (const ability of ABILITY_NAMES) {
      savingThrows[ability] = { proficient: false };
    }
    calling?.savingThrows.forEach((ability) => {
      savingThrows[ability] = { proficient: true };
    });

    const toolParts: string[] = [];
    if (background) toolParts.push(`${background.name}: ${background.toolProficiency}`);
    if (subculture) {
      toolParts.push(
        ...subculture.traits.filter((t) => t.includes('tools') || t.includes('instrument')),
      );
    }
    if (choices.callingId === 'scholar' && choices.scholarToolChoices.length > 0) {
      toolParts.push(`Erudito: ${choices.scholarToolChoices.join(', ')}`);
    }

    return {
      creationChoices: normalizedChoices,
      culture: culture?.namePt ?? '',
      distinctiveFeatures: background?.distinctiveFeatures.join(', ') ?? props.distinctiveFeatures,
      shadowPath: calling?.shadowPathPt ?? props.shadowPath,
      callingAndLevel: calling ? `${calling.namePt} ${choices.level}` : props.callingAndLevel,
      speed: culture?.speed ?? props.speed,
      abilityBonusSources: this.buildAbilityBonusSources(choices),
      skills,
      savingThrows,
      toolProficiencies: toolParts.join('\n'),
      featuresTraitsVirtues: this.buildRewardsAndFeaturesText(choices),
      inventory,
      equipment: inventoryToSummaryText(inventory),
      currency: culture
        ? { ...props.currency, silver }
        : props.currency,
      hitDice: calling ? `1d${calling.hitDie}` : props.hitDice,
    };
  }
}

export { RANGER_SKILL_OPTIONS };
