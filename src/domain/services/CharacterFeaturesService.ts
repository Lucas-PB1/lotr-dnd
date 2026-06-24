import type { AbilityName } from '../../shared/constants/gameConstants';
import { ABILITY_LABELS } from '../../shared/constants/gameConstants';
import type { CharacterProps } from '../entities/Character';
import {
  getBackground,
  getCalling,
  getCulture,
  getSubculture,
} from '../../shared/data/characterCreationData';
import { getRewardSlots } from '../../shared/data/levelRewardData';
import {
  getCraftById,
  getVirtueById,
  type VirtueDefinition,
} from '../../shared/data/virtuesAndCraftsData';
import type { CreationChoices } from './CharacterCreationService';

export interface MechanicalTag {
  text: string;
  kind: 'bonus' | 'note';
}

export interface FeatureCard {
  id: string;
  title: string;
  subtitle?: string;
  lines: string[];
  tags: MechanicalTag[];
  kind: 'culture' | 'background' | 'calling' | 'virtue' | 'craft';
}

export interface ProficiencyEntry {
  id: string;
  source: string;
  text: string;
}

function virtueMechanicalTags(
  virtue: VirtueDefinition,
  abilityChoice?: AbilityName | null,
): MechanicalTag[] {
  const tags: MechanicalTag[] = [];

  if (virtue.acBonus) {
    tags.push({ text: `+${virtue.acBonus} CA`, kind: 'bonus' });
  }

  for (const [ability, bonus] of Object.entries(virtue.abilityBonuses ?? {})) {
    tags.push({
      text: `+${bonus} ${ABILITY_LABELS[ability as AbilityName]}`,
      kind: 'bonus',
    });
  }

  if (virtue.abilityChoice && abilityChoice) {
    tags.push({
      text: `+1 ${ABILITY_LABELS[abilityChoice]}`,
      kind: 'bonus',
    });
  }

  if (virtue.id === 'dour-handed') {
    tags.push({ text: '+1 dano (Força)', kind: 'bonus' });
  }
  if (virtue.id === 'hardiness') {
    tags.push({ text: '+1 PV máx./nível', kind: 'bonus' });
  }
  if (virtue.id === 'deadly-archery') {
    tags.push({ text: 'Vantagem (arco, sem mover)', kind: 'note' });
  }
  if (virtue.id === 'dragon-slayer') {
    tags.push({ text: 'Vantagem vs. Grande+', kind: 'note' });
  }
  if (virtue.id === 'fierce-shot') {
    tags.push({ text: 'Arco com For ou Des', kind: 'note' });
  }
  if (virtue.id === 'sure-at-the-mark') {
    tags.push({ text: 'Prof. armas improvisadas', kind: 'note' });
  }

  return tags;
}

export class CharacterFeaturesService {
  static getFeatureCards(choices: CreationChoices | undefined | null): FeatureCard[] {
    if (!choices?.cultureId) return [];

    const cards: FeatureCard[] = [];
    const culture = getCulture(choices.cultureId);
    const background =
      choices.backgroundId ? getBackground(choices.cultureId, choices.backgroundId) : null;
    const calling = choices.callingId ? getCalling(choices.callingId) : null;
    const subculture =
      choices.subcultureId ? getSubculture(choices.cultureId, choices.subcultureId) : null;

    if (culture) {
      cards.push({
        id: `culture-${culture.id}`,
        title: culture.namePt,
        subtitle: subculture ? subculture.name : undefined,
        lines: [
          ...culture.traits,
          ...(subculture ? subculture.traits : []),
        ],
        tags: [],
        kind: 'culture',
      });
    }

    if (background) {
      cards.push({
        id: `background-${background.id}`,
        title: `Antecedente: ${background.name}`,
        lines: [`Traços: ${background.distinctiveFeatures.join(', ')}`],
        tags: [{ text: background.toolProficiency, kind: 'note' }],
        kind: 'background',
      });
    }

    if (calling) {
      cards.push({
        id: `calling-${calling.id}`,
        title: `${calling.namePt} · nível ${choices.level}`,
        lines: [
          calling.description,
          `Armaduras: ${calling.armorProficiencies}`,
          `Armas: ${calling.weaponProficiencies}`,
        ],
        tags: [],
        kind: 'calling',
      });
    }

    const slots = getRewardSlots(choices.cultureId, choices.callingId, choices.level);
    for (const slot of slots) {
      const pick = choices.rewardPicks?.find((p) => p.slotId === slot.id);
      if (!pick) continue;

      if (pick.rewardType === 'virtue' && pick.virtueId) {
        const virtue = getVirtueById(pick.virtueId);
        if (!virtue) continue;
        cards.push({
          id: `virtue-${slot.id}-${virtue.id}`,
          title: virtue.namePt,
          subtitle: slot.labelPt,
          lines: [virtue.summaryPt],
          tags: virtueMechanicalTags(virtue, pick.virtueAbilityChoice),
          kind: 'virtue',
        });
      } else if (pick.rewardType === 'craft' && pick.craftId) {
        const craft = getCraftById(pick.craftId);
        if (!craft) continue;
        cards.push({
          id: `craft-${slot.id}-${craft.id}`,
          title: craft.namePt,
          subtitle: slot.labelPt,
          lines: [craft.summaryPt],
          tags: [],
          kind: 'craft',
        });
      }
    }

    return cards;
  }

  static getProficiencyEntries(props: CharacterProps): ProficiencyEntry[] {
    const choices = props.creationChoices;
    const entries: ProficiencyEntry[] = [];

    if (choices?.cultureId && choices.backgroundId) {
      const bg = getBackground(choices.cultureId, choices.backgroundId);
      if (bg) {
        entries.push({
          id: `bg-${bg.id}`,
          source: bg.name,
          text: bg.toolProficiency,
        });
      }
    }

    if (choices?.cultureId && choices.subcultureId) {
      const sub = getSubculture(choices.cultureId, choices.subcultureId);
      sub?.traits
        .filter((t) => t.includes('tools') || t.includes('instrument'))
        .forEach((trait, i) => {
          entries.push({ id: `sub-${i}`, source: sub.name, text: trait });
        });
    }

    if (choices?.callingId === 'scholar' && choices.scholarToolChoices.length > 0) {
      entries.push({
        id: 'scholar-tools',
        source: 'Erudito',
        text: choices.scholarToolChoices.join(', '),
      });
    }

    if (entries.length === 0 && props.toolProficiencies.trim()) {
      props.toolProficiencies
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .forEach((line, i) => {
          const colon = line.indexOf(':');
          if (colon > 0) {
            entries.push({
              id: `manual-${i}`,
              source: line.slice(0, colon).trim(),
              text: line.slice(colon + 1).trim(),
            });
          } else {
            entries.push({ id: `manual-${i}`, source: 'Outros', text: line });
          }
        });
    }

    return entries;
  }
}
