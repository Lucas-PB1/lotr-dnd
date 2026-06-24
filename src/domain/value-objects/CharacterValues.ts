import type { AbilityName } from '../../shared/constants/gameConstants';

export class AbilityScore {
  constructor(public readonly value: number) {}

  get modifier(): number {
    return Math.floor((this.value - 10) / 2);
  }

  formattedModifier(): string {
    const mod = this.modifier;
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }
}

export class SavingThrowProficiency {
  constructor(
    public readonly proficient: boolean,
    private readonly abilityModifier: number,
    private readonly proficiencyBonus: number,
  ) {}

  get modifier(): number {
    return this.abilityModifier + (this.proficient ? this.proficiencyBonus : 0);
  }

  formattedModifier(): string {
    const mod = this.modifier;
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }
}

export class SkillProficiency {
  constructor(
    public readonly proficient: boolean,
    public readonly expertise: boolean,
    private readonly abilityModifier: number,
    private readonly proficiencyBonus: number,
  ) {}

  get modifier(): number {
    let bonus = this.abilityModifier;
    if (this.proficient) bonus += this.proficiencyBonus;
    if (this.expertise) bonus += this.proficiencyBonus;
    return bonus;
  }

  formattedModifier(): string {
    const mod = this.modifier;
    return mod >= 0 ? `+${mod}` : `${mod}`;
  }
}

export interface AbilityScoresProps {
  strength: number;
  dexterity: number;
  constitution: number;
  intelligence: number;
  wisdom: number;
  charisma: number;
}

export class AbilityScores {
  readonly strength: AbilityScore;
  readonly dexterity: AbilityScore;
  readonly constitution: AbilityScore;
  readonly intelligence: AbilityScore;
  readonly wisdom: AbilityScore;
  readonly charisma: AbilityScore;

  constructor(props: AbilityScoresProps) {
    this.strength = new AbilityScore(props.strength);
    this.dexterity = new AbilityScore(props.dexterity);
    this.constitution = new AbilityScore(props.constitution);
    this.intelligence = new AbilityScore(props.intelligence);
    this.wisdom = new AbilityScore(props.wisdom);
    this.charisma = new AbilityScore(props.charisma);
  }

  get(name: AbilityName): AbilityScore {
    return this[name];
  }

  toProps(): AbilityScoresProps {
    return {
      strength: this.strength.value,
      dexterity: this.dexterity.value,
      constitution: this.constitution.value,
      intelligence: this.intelligence.value,
      wisdom: this.wisdom.value,
      charisma: this.charisma.value,
    };
  }
}

export interface AttackProps {
  weapon: string;
  atkBonus: string;
  damage: string;
  range: string;
}

export class Attack {
  constructor(public readonly props: AttackProps) {}

  static empty(): Attack {
    return new Attack({ weapon: '', atkBonus: '', damage: '', range: '' });
  }
}

export interface DeathSavesProps {
  successes: number;
  failures: number;
}

export interface HitPointsProps {
  maximum: number;
  current: number;
  temporary: number;
}

export interface ShadowProps {
  score: number;
  miserable: boolean;
  anguished: boolean;
  scars: string;
}

export interface EncumbranceProps {
  carriedWeight: string;
  encumbered: boolean;
  heavilyEncumbered: boolean;
}

export interface CurrencyProps {
  copper: number;
  silver: number;
  gold: number;
}

export interface AppearanceProps {
  age: string;
  eyes: string;
  height: string;
  skin: string;
  weight: string;
  hair: string;
}

export interface FellowshipProps {
  fellowshipName: string;
  fellowshipPoints: number;
  heirName: string;
  investment: string;
  patrons: string;
}

export interface SkillState {
  proficient: boolean;
  expertise: boolean;
}

export type SavingThrowState = Record<AbilityName, { proficient: boolean }>;
export type SkillsState = Record<string, SkillState>;
