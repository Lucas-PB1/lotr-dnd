import { describe, expect, it } from 'vitest';
import { createEmptyCharacterProps } from '../../domain/entities/Character';
import { normalizeImportedCharacter } from './characterImportExport';

describe('characterImportExport', () => {
  it('normaliza import com id novo', () => {
    const base = createEmptyCharacterProps('old');
    base.name = 'Bilbo';
    base.abilities.strength = 12;

    const { id: _id, ...withoutId } = base;
    const imported = normalizeImportedCharacter(withoutId, 'new-id');
    expect(imported.id).toBe('new-id');
    expect(imported.name).toBe('Bilbo');
    expect(imported.abilities.strength).toBe(12);
  });

  it('rejeita json inválido', () => {
    expect(() => normalizeImportedCharacter(null, 'x')).toThrow();
  });
});
