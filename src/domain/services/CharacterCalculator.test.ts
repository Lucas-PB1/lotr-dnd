import { describe, expect, it } from 'vitest';
import { Character } from '../../domain/entities/Character';
import { createEmptyCharacterProps } from '../../domain/entities/Character';
import { CharacterCalculator } from './CharacterCalculator';

describe('CharacterCalculator', () => {
  it('calcula modificador de atributo', () => {
    const props = createEmptyCharacterProps('test');
    props.abilities.strength = 16;
    const character = new Character(props);
    const score = CharacterCalculator.abilityScores(character).get('strength');
    expect(score.modifier).toBe(3);
    expect(score.formattedModifier()).toBe('+3');
  });

  it('soma proficiência em perícia', () => {
    const props = createEmptyCharacterProps('test');
    props.abilities.dexterity = 14;
    props.skills.stealth = { proficient: true, expertise: false };
    const character = new Character(props);
    const skill = CharacterCalculator.skillModifier(character, 'stealth');
    expect(skill.modifier).toBe(4);
  });
});
