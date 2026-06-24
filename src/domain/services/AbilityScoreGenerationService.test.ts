import { describe, expect, it } from 'vitest';
import {
  abilityAssignmentOptions,
  createEmptyAssignment,
} from './AbilityScoreGenerationService';

describe('abilityAssignmentOptions', () => {
  it('lista valores do pool mesmo quando outro atributo já usa o mesmo número', () => {
    const assigned = createEmptyAssignment();
    assigned.dexterity = 17;
    assigned.constitution = 16;
    assigned.wisdom = 13;
    assigned.charisma = 10;

    const pool = [10, 16];

    expect(abilityAssignmentOptions('strength', assigned, pool)).toEqual([16, 10]);
    expect(abilityAssignmentOptions('intelligence', assigned, pool)).toEqual([16, 10]);
  });

  it('inclui o valor atual do atributo ao trocar seleção', () => {
    const assigned = createEmptyAssignment();
    assigned.strength = 16;
    const pool = [10];

    expect(abilityAssignmentOptions('strength', assigned, pool)).toEqual([16, 10]);
  });
});
