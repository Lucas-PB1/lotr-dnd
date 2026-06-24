import { describe, expect, it } from 'vitest';
import { formatRollResult, rollD20, rollDiceNotation } from './DiceRollService';

describe('DiceRollService', () => {
  it('formata rolagem d20', () => {
    const result = { natural: 15, modifier: 3, total: 18, sides: 20 };
    expect(formatRollResult(result)).toBe('15 + 3 = 18');
  });

  it('rola d20 dentro do intervalo', () => {
    const result = rollD20(2);
    expect(result.natural).toBeGreaterThanOrEqual(1);
    expect(result.natural).toBeLessThanOrEqual(20);
    expect(result.total).toBe(result.natural + 2);
  });

  it('interpreta notação de dados', () => {
    const result = rollDiceNotation('1d6', 2);
    expect(result).not.toBeNull();
    expect(result!.natural).toBeGreaterThanOrEqual(1);
    expect(result!.natural).toBeLessThanOrEqual(6);
    expect(result!.total).toBe(result!.natural + 2);
  });
});
