import {
  ABILITY_NAMES,
  DEFAULT_ATTACK_COUNT,
  LOTR_SKILLS,
} from '../../shared/constants/gameConstants';
import type { AbilityScoreMode } from '../../shared/constants/pointBuyConstants';
import type { AbilityBonusSource } from '../services/AbilityBonusService';
import type { CreationChoices } from '../services/CharacterCreationService';
import type { InventoryItem } from '../value-objects/Item';
import type { OwnedMagicalItem } from '../value-objects/MagicalItem';
import { DEFAULT_CREATION_CHOICES } from '../services/CharacterCreationService';
import type {
  AbilityScoresProps,
  AppearanceProps,
  AttackProps,
  CurrencyProps,
  DeathSavesProps,
  EncumbranceProps,
  FellowshipProps,
  HitPointsProps,
  SavingThrowState,
  ShadowProps,
  SkillsState,
} from '../value-objects/CharacterValues';
import { Attack } from '../value-objects/CharacterValues';

export interface CharacterProps {
  id: string;
  name: string;
  playerName: string;
  callingAndLevel: string;
  culture: string;
  distinctiveFeatures: string;
  shadowPath: string;
  experiencePoints: number;
  inspiration: boolean;
  proficiencyBonus: number;
  armorClass: number;
  initiative: number;
  speed: number;
  abilities: AbilityScoresProps;
  abilityScoreMode: AbilityScoreMode;
  abilityBonusSources: AbilityBonusSource[];
  creationChoices: CreationChoices;
  savingThrows: SavingThrowState;
  skills: SkillsState;
  hitPoints: HitPointsProps;
  hitDice: string;
  deathSaves: DeathSavesProps;
  shadow: ShadowProps;
  encumbrance: EncumbranceProps;
  attacks: AttackProps[];
  passiveWisdom: number | null;
  rewardsAndMagicalItems: string;
  ownedMagicalItems: OwnedMagicalItem[];
  currency: CurrencyProps;
  toolProficiencies: string;
  inventory: InventoryItem[];
  equipment: string;
  featuresTraitsVirtues: string;
  fellowship: FellowshipProps;
  appearance: AppearanceProps;
  characterBackstory: string;
  additionalEquipment: string;
  additionalFeatures: string;
  characterAppearanceNotes: string;
}

function createDefaultSavingThrows(): SavingThrowState {
  return Object.fromEntries(
    ABILITY_NAMES.map((name) => [name, { proficient: false }]),
  ) as SavingThrowState;
}

function createDefaultSkills(): SkillsState {
  return Object.fromEntries(
    LOTR_SKILLS.map((skill) => [skill.id, { proficient: false, expertise: false }]),
  ) as SkillsState;
}

function createDefaultAttacks(): AttackProps[] {
  return Array.from({ length: DEFAULT_ATTACK_COUNT }, () => Attack.empty().props);
}

export function createEmptyCharacterProps(id: string): CharacterProps {
  return {
    id,
    name: '',
    playerName: '',
    callingAndLevel: '',
    culture: '',
    distinctiveFeatures: '',
    shadowPath: '',
    experiencePoints: 0,
    inspiration: false,
    proficiencyBonus: 2,
    armorClass: 10,
    initiative: 0,
    speed: 30,
    abilities: {
      strength: 10,
      dexterity: 10,
      constitution: 10,
      intelligence: 10,
      wisdom: 10,
      charisma: 10,
    },
    abilityScoreMode: 'manual',
    abilityBonusSources: [],
    creationChoices: { ...DEFAULT_CREATION_CHOICES },
    savingThrows: createDefaultSavingThrows(),
    skills: createDefaultSkills(),
    hitPoints: { maximum: 0, current: 0, temporary: 0 },
    hitDice: '',
    deathSaves: { successes: 0, failures: 0 },
    shadow: { score: 0, miserable: false, anguished: false, scars: '' },
    encumbrance: { carriedWeight: '', encumbered: false, heavilyEncumbered: false },
    attacks: createDefaultAttacks(),
    passiveWisdom: null,
    rewardsAndMagicalItems: '',
    ownedMagicalItems: [],
    currency: { copper: 0, silver: 0, gold: 0 },
    toolProficiencies: '',
    inventory: [],
    equipment: '',
    featuresTraitsVirtues: '',
    fellowship: {
      fellowshipName: '',
      fellowshipPoints: 0,
      heirName: '',
      investment: '',
      patrons: '',
    },
    appearance: { age: '', eyes: '', height: '', skin: '', weight: '', hair: '' },
    characterBackstory: '',
    additionalEquipment: '',
    additionalFeatures: '',
    characterAppearanceNotes: '',
  };
}

export class Character {
  constructor(public readonly props: CharacterProps) {}

  get id(): string {
    return this.props.id;
  }

  withUpdatedProps(partial: Partial<CharacterProps>): Character {
    return new Character({ ...this.props, ...partial });
  }

  static create(id: string): Character {
    return new Character(createEmptyCharacterProps(id));
  }
}
