import { describe, expect, it } from 'vitest';
import { createEmptyCharacterProps } from '../../domain/entities/Character';
import { countJourneyDone, getJourneyWeightedProgress, getMissingJourneyHints } from './getSheetJourney';
import { getCreationProgress } from '../creation/creationProgress';

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

  it('pondera criação parcial na jornada', () => {
    const character = createEmptyCharacterProps('test');
    character.creationChoices = {
      ...character.creationChoices,
      cultureId: 'hobbits',
      backgroundId: 'hobbits/gardener',
      callingId: 'scholar',
    };
    const creation = getCreationProgress(character.creationChoices);
    const { percent, done } = getJourneyWeightedProgress(character);
    expect(done).toBe(0);
    expect(percent).toBeGreaterThan(0);
    expect(percent).toBeLessThan(Math.round((creation.done / creation.total) * 100));
  });
});
