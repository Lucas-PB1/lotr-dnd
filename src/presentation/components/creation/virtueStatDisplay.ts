import type { AbilityName } from '../../../shared/constants/gameConstants';
import { ABILITY_ABBREVIATIONS } from '../../../shared/constants/gameConstants';
import type { VirtueDefinition } from '../../../shared/data/virtuesAndCraftsData';

function abilityAbbrs(abilities: AbilityName[]): string {
  return abilities.map((a) => ABILITY_ABBREVIATIONS[a]).join(' · ');
}

/** Rótulos curtos de bônus mecânico para os cards de virtude. */
export function getVirtueStatTags(virtue: VirtueDefinition): string[] {
  const tags: string[] = [];

  if (virtue.abilityBonuses) {
    for (const [key, value] of Object.entries(virtue.abilityBonuses) as [AbilityName, number][]) {
      if (value) {
        tags.push(`${value >= 0 ? '+' : ''}${value} ${ABILITY_ABBREVIATIONS[key]}`);
      }
    }
  }

  if (virtue.acBonus) {
    tags.push(`+${virtue.acBonus} CA`);
  }

  if (virtue.abilityChoice?.length) {
    const choices = abilityAbbrs(virtue.abilityChoice);
    switch (virtue.id) {
      case 'confidence':
        tags.push(`Save ${choices}`);
        break;
      case 'prowess':
        tags.push('+2 ou +1/+1');
        break;
      case 'mastery':
        tags.push('Proficiência +');
        break;
      default:
        tags.push(`+1 ${choices}`);
    }
  }

  return tags;
}
