import type { CreationChoices } from '../../../domain/services/CharacterCreationService';
import { getCulture } from '../../../shared/data/characterCreationData';
import {
  STANDARD_OF_LIVING_GEAR,
  type CallingEquipmentDefinition,
} from '../../../shared/data/startingEquipmentData';
import { getCultureGearPreview } from '../../../shared/data/startingItemSlots';
import type { HeroIcon } from '../icons/iconMaps';
import {
  ArchiveBoxIcon,
  BanknotesIcon,
  BeakerIcon,
  BoltIcon,
  GiftIcon,
  ShieldCheckIcon,
  WrenchScrewdriverIcon,
} from '@heroicons/react/24/outline';

export type EquipmentGearKind =
  | 'travel'
  | 'armor'
  | 'weapon'
  | 'tool'
  | 'kit'
  | 'coin'
  | 'generic';

export type EquipmentGearPreviewItem = {
  id: string;
  title: string;
  subtitle: string;
  kind: EquipmentGearKind;
};

export const GEAR_KIND_ICONS: Record<EquipmentGearKind, HeroIcon> = {
  travel: ArchiveBoxIcon,
  armor: ShieldCheckIcon,
  weapon: BoltIcon,
  tool: WrenchScrewdriverIcon,
  kit: BeakerIcon,
  coin: BanknotesIcon,
  generic: GiftIcon,
};

function inferGearKind(label: string): EquipmentGearKind {
  const text = label.toLowerCase();
  if (text.includes('armadura') || text.includes('couro') || text.includes('cota') || text.includes('escudo')) {
    return 'armor';
  }
  if (
    text.includes('arma')
    || text.includes('espada')
    || text.includes('arco')
    || text.includes('flecha')
    || text.includes('lâmina')
  ) {
    return 'weapon';
  }
  if (
    text.includes('ferramenta')
    || text.includes('kit de')
    || text.includes('suprimentos')
    || text.includes('cachimbo')
  ) {
    return 'tool';
  }
  if (text.includes('curandeiro') || text.includes('refeição') || text.includes('aventura')) {
    return 'kit';
  }
  if (
    text.includes('mochila')
    || text.includes('odre')
    || text.includes('raç')
    || text.includes('tocha')
    || text.includes('corda')
    || text.includes('tenda')
    || text.includes('lanterna')
  ) {
    return 'travel';
  }
  return 'generic';
}

export function buildAutomaticGearPreview(
  choices: CreationChoices,
  callingEquipment: CallingEquipmentDefinition | null,
): EquipmentGearPreviewItem[] {
  const culture = choices.cultureId ? getCulture(choices.cultureId) : null;
  const living = culture?.standardOfLiving ?? 'Comum';
  const cultureGear = STANDARD_OF_LIVING_GEAR[living] ?? STANDARD_OF_LIVING_GEAR.Comum;
  const items: EquipmentGearPreviewItem[] = [];

  for (const item of getCultureGearPreview(choices)) {
    items.push({
      id: `culture-${item}`,
      title: item,
      subtitle: `Cultura · ${cultureGear.labelPt}`,
      kind: inferGearKind(item),
    });
  }

  items.push({
    id: 'silver-pouch',
    title: 'Bolsa com moedas',
    subtitle: `${cultureGear.silver} peças de prata`,
    kind: 'coin',
  });

  if (!callingEquipment) return items;

  for (const fixed of callingEquipment.fixedItems) {
    if (choices.callingId === 'scholar' && fixed.includes('2 ferramentas')) {
      const tools = choices.scholarToolChoices ?? [];
      items.push({
        id: 'scholar-tools-fixed',
        title: tools.length > 0 ? tools.join(' · ') : '2 ferramentas do erudito',
        subtitle: tools.length > 0 ? 'Chamado · escolhidas' : 'Chamado · escolher abaixo',
        kind: 'tool',
      });
      continue;
    }

    items.push({
      id: `fixed-${fixed}`,
      title: fixed,
      subtitle: 'Chamado · incluso',
      kind: inferGearKind(fixed),
    });
  }

  return items;
}
