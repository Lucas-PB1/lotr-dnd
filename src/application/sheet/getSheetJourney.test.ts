import { describe, expect, it } from 'vitest';
import { createEmptyCharacterProps } from '../../domain/entities/Character';
import { countJourneyDone, getMissingJourneyHints } from './getSheetJourney';

describe('getSheetJourney', () => {
  it('lista passos pendentes com mensagens', () => {
    const character = createEmptyCharacterProps('test');
    const missing = getMissingJourneyHints(character);
    expect(missing.length).toBeGreaterThan(0);
    expect(missing[0].message.length).toBeGreaterThan(0);
  });

  it('conta progresso parcial', () => {
    const character = createEmptyCharacterProps('test');
    character.abilities.strength = 15;
    const { done, total } = countJourneyDone(character);
    expect(total).toBe(5);
    expect(done).toBeGreaterThanOrEqual(1);
  });
});
