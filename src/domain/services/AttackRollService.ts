import type { AbilityName } from '../../shared/constants/gameConstants';
import { ABILITY_ABBREVIATIONS } from '../../shared/constants/gameConstants';
import type { CharacterProps } from '../entities/Character';
import { Character } from '../entities/Character';
import { getCalling } from '../../shared/data/characterCreationData';
import type { ItemDefinition } from '../value-objects/Item';
import { getItemDefinition } from '../../shared/data/itemCatalog';
import {
  MARTIAL_MELEE_WEAPON_IDS,
  SIMPLE_MELEE_WEAPON_IDS,
} from '../../shared/data/startingItemSlots';
import { getVirtueById } from '../../shared/data/virtuesAndCraftsData';
import type { InventoryItem } from '../value-objects/Item';
import type { AbilityScores } from '../value-objects/CharacterValues';
import { CharacterCalculator } from './CharacterCalculator';
import { MagicalItemService } from './MagicalItemService';

export interface AttackRollBreakdown {
  abilityMod: number;
  ability: AbilityName;
  abilityAlt?: AbilityName;
  proficiency: number;
  virtueDamageBonus: number;
  magicalAttackBonus: number;
  magicalDamageBonus: number;
  virtueNotes: string[];
  magicalNotes: string[];
}

export interface WeaponAttackRoll {
  instanceId: string;
  weaponName: string;
  definitionId: string;
  attackTotal: number;
  attackFormula: string;
  damageFormula: string;
  damageType?: string;
  range?: string;
  proficient: boolean;
  breakdown: AttackRollBreakdown;
  properties: string[];
}

function formatMod(n: number): string {
  return n >= 0 ? `+${n}` : `${n}`;
}

function hasProperty(def: ItemDefinition, token: string): boolean {
  return def.properties?.some((p) => p.toLowerCase().includes(token)) ?? false;
}

function isRangedWeapon(def: ItemDefinition): boolean {
  return Boolean(def.range) || hasProperty(def, 'munição');
}

function isWeaponProficient(props: CharacterProps, definitionId: string): boolean {
  const callingId = props.creationChoices?.callingId;
  if (!callingId) return false;

  const calling = getCalling(callingId);
  const text = (calling?.weaponProficiencies ?? '').toLowerCase();

  const isSimpleMelee = (SIMPLE_MELEE_WEAPON_IDS as readonly string[]).includes(definitionId);
  const isMartialMelee = (MARTIAL_MELEE_WEAPON_IDS as readonly string[]).includes(definitionId);
  const isSimpleRanged = definitionId === 'bow';
  const isMartialRanged = definitionId === 'great-bow';
  const isShortSword = definitionId === 'sword-short';
  const isSword = ['sword', 'sword-long', 'sword-short'].includes(definitionId);

  if (text.includes('armas simples') && (isSimpleMelee || isSimpleRanged)) return true;
  if (text.includes('armas marciais') && (isMartialMelee || isMartialRanged)) return true;
  if (text.includes('espada curta') && isShortSword) return true;
  if (text.includes('espadas') && isSword) return true;

  return false;
}

function pickAttackAbility(
  def: ItemDefinition,
  scores: AbilityScores,
): { primary: AbilityName; alt?: AbilityName } {
  const ranged = isRangedWeapon(def);
  const finesse = hasProperty(def, 'finesse');

  if (ranged && !finesse) {
    return { primary: 'dexterity' };
  }

  if (finesse) {
    const str = scores.get('strength').modifier;
    const dex = scores.get('dexterity').modifier;
    if (str >= dex) return { primary: 'strength', alt: 'dexterity' };
    return { primary: 'dexterity', alt: 'strength' };
  }

  return { primary: 'strength' };
}

function getVirtueCombatEffects(
  props: CharacterProps,
  context: { ranged: boolean; strengthBased: boolean },
): { damageBonus: number; notes: string[] } {
  const notes: string[] = [];
  let damageBonus = 0;

  for (const pick of props.creationChoices?.rewardPicks ?? []) {
    if (pick.rewardType !== 'virtue' || !pick.virtueId) continue;
    const virtue = getVirtueById(pick.virtueId);
    if (!virtue) continue;

    if (virtue.id === 'dour-handed' && context.strengthBased) {
      damageBonus += 1;
      notes.push('Mão Firme: +1 dano (Força)');
    }

    if (virtue.id === 'deadly-archery' && context.ranged) {
      notes.push('Arquearia Mortal: vantagem se não se moveu');
    }

    if (virtue.id === 'fierce-shot' && context.ranged) {
      notes.push('Tiro Feroz: pode usar Força em ataques à distância');
    }

    if (virtue.id === 'sure-at-the-mark') {
      notes.push('Certeiro na Mira: proficiência com armas improvisadas à distância');
    }

    if (virtue.id === 'dragon-slayer') {
      notes.push('Matador de Dragões: vantagem vs. criaturas Grande+');
    }

    if (virtue.id === 'gleam-of-wrath') {
      notes.push('Brilho da Ira: luz solar; crítico + dano radiante');
    }
  }

  return { damageBonus, notes };
}

function buildAttackForWeapon(
  props: CharacterProps,
  item: InventoryItem,
  def: ItemDefinition,
): WeaponAttackRoll {
  const character = new Character(props);
  const scores = CharacterCalculator.abilityScores(character);
  const { primary, alt } = pickAttackAbility(def, scores);
  const abilityMod = scores.get(primary).modifier;
  const proficient = isWeaponProficient(props, def.id);
  const proficiency = proficient ? props.proficiencyBonus : 0;
  const ranged = isRangedWeapon(def);
  const strengthBased = primary === 'strength';

  const virtueFx = getVirtueCombatEffects(props, { ranged, strengthBased });
  const magicalFx = MagicalItemService.getWeaponBonusesForInstance(props, item.instanceId);
  const attackTotal = abilityMod + proficiency + magicalFx.attackBonus;
  const damageMod = abilityMod + virtueFx.damageBonus + magicalFx.damageBonus;

  const magicalNotes: string[] = [];
  if (magicalFx.attackBonus || magicalFx.damageBonus) {
    magicalNotes.push(
      `Item mágico: ${formatMod(magicalFx.attackBonus)} atq, ${formatMod(magicalFx.damageBonus)} dano`,
    );
  }

  const abilityLabel = ABILITY_ABBREVIATIONS[primary];
  const profPart = proficient ? `, Prof ${formatMod(proficiency)}` : ', sem prof.';
  const altPart =
    alt && scores.get(alt).modifier !== abilityMod
      ? ` (ou ${ABILITY_ABBREVIATIONS[alt]} ${formatMod(scores.get(alt).modifier)})`
      : '';

  const attackFormula = `d20 ${formatMod(attackTotal)} (${abilityLabel} ${formatMod(abilityMod)}${profPart}${magicalFx.attackBonus ? `, Mág ${formatMod(magicalFx.attackBonus)}` : ''})${altPart}`;

  const dice = def.damage ?? '—';
  const damageFormula =
    damageMod !== 0 || virtueFx.damageBonus > 0
      ? `${dice}${formatMod(damageMod)}${def.damageType ? ` ${def.damageType}` : ''}`
      : `${dice}${def.damageType ? ` ${def.damageType}` : ''}`;

  return {
    instanceId: item.instanceId,
    weaponName: def.namePt,
    definitionId: def.id,
    attackTotal,
    attackFormula,
    damageFormula,
    damageType: def.damageType,
    range: def.range,
    proficient,
    properties: def.properties ?? [],
    breakdown: {
      abilityMod,
      ability: primary,
      abilityAlt: alt,
      proficiency,
      virtueDamageBonus: virtueFx.damageBonus,
      magicalAttackBonus: magicalFx.attackBonus,
      magicalDamageBonus: magicalFx.damageBonus,
      virtueNotes: virtueFx.notes,
      magicalNotes,
    },
  };
}

export class AttackRollService {
  static getEquippedWeaponAttacks(props: CharacterProps): WeaponAttackRoll[] {
    const inventory = props.inventory ?? [];
    return inventory
      .filter((item) => {
        if (!item.equipped) return false;
        const def = getItemDefinition(item.definitionId);
        return def?.category === 'weapon';
      })
      .map((item) => {
        const def = getItemDefinition(item.definitionId)!;
        return buildAttackForWeapon(props, item, def);
      });
  }

  /** Sincroniza linhas de ataque com armas equipadas + bônus calculados. */
  static syncAttackRows(props: CharacterProps) {
    const computed = this.getEquippedWeaponAttacks(props);
    const attacks = [...props.attacks];

    computed.forEach((roll, index) => {
      attacks[index] = {
        weapon: roll.weaponName,
        atkBonus: formatMod(roll.attackTotal),
        damage: roll.damageFormula,
        range: roll.range ?? '',
      };
    });

    return attacks;
  }
}

export function formatRollFormula(modifier: number): string {
  return `d20 ${formatMod(modifier)}`;
}
