export const ABILITY_NAMES = [
  'strength',
  'dexterity',
  'constitution',
  'intelligence',
  'wisdom',
  'charisma',
] as const;

export type AbilityName = (typeof ABILITY_NAMES)[number];

export const ABILITY_LABELS: Record<AbilityName, string> = {
  strength: 'Força',
  dexterity: 'Destreza',
  constitution: 'Constituição',
  intelligence: 'Inteligência',
  wisdom: 'Sabedoria',
  charisma: 'Carisma',
};

export const ABILITY_ABBREVIATIONS: Record<AbilityName, string> = {
  strength: 'Str',
  dexterity: 'Dex',
  constitution: 'Con',
  intelligence: 'Int',
  wisdom: 'Wis',
  charisma: 'Cha',
};

export interface SkillDefinition {
  id: string;
  name: string;
  ability: AbilityName;
}

export const LOTR_SKILLS: SkillDefinition[] = [
  { id: 'acrobatics', name: 'Acrobacia', ability: 'dexterity' },
  { id: 'animalHandling', name: 'Lidar com Animais', ability: 'wisdom' },
  { id: 'athletics', name: 'Atletismo', ability: 'strength' },
  { id: 'deception', name: 'Enganação', ability: 'charisma' },
  { id: 'explore', name: 'Explorar', ability: 'wisdom' },
  { id: 'hunting', name: 'Caça', ability: 'wisdom' },
  { id: 'insight', name: 'Intuição', ability: 'wisdom' },
  { id: 'intimidation', name: 'Intimidação', ability: 'charisma' },
  { id: 'investigation', name: 'Investigação', ability: 'intelligence' },
  { id: 'medicine', name: 'Medicina', ability: 'intelligence' },
  { id: 'nature', name: 'Natureza', ability: 'intelligence' },
  { id: 'oldLore', name: 'Antiga Sabedoria', ability: 'intelligence' },
  { id: 'perception', name: 'Percepção', ability: 'wisdom' },
  { id: 'performance', name: 'Atuação', ability: 'charisma' },
  { id: 'persuasion', name: 'Persuasão', ability: 'charisma' },
  { id: 'riddle', name: 'Enigmas', ability: 'intelligence' },
  { id: 'sleightOfHand', name: 'Prestidigitação', ability: 'dexterity' },
  { id: 'stealth', name: 'Furtividade', ability: 'dexterity' },
  { id: 'travel', name: 'Viagem', ability: 'wisdom' },
];

export const DEFAULT_ATTACK_COUNT = 6;

export const STORAGE_KEY = 'lotr-character-sheet';
export const ACTIVE_CHARACTER_KEY = 'lotr-active-character-id';
