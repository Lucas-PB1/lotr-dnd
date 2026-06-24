import { ACTIVE_CHARACTER_KEY } from '../../shared/constants/gameConstants';
import { characterService, DEFAULT_CHARACTER_ID } from '../../infrastructure/di/container';

export function resolveActiveCharacterId(): string {
  const stored = localStorage.getItem(ACTIVE_CHARACTER_KEY);
  const ids = characterService.listIds.execute();

  if (stored && ids.includes(stored)) {
    return stored;
  }

  if (ids.includes(DEFAULT_CHARACTER_ID)) {
    return DEFAULT_CHARACTER_ID;
  }

  return ids[0] ?? DEFAULT_CHARACTER_ID;
}

export function persistActiveCharacterId(id: string): void {
  localStorage.setItem(ACTIVE_CHARACTER_KEY, id);
}

export interface CharacterSummary {
  id: string;
  name: string;
  finalized: boolean;
}

export function listCharacterSummaries(): CharacterSummary[] {
  return characterService.listIds.execute().map((id) => {
    const dto = characterService.load.execute(id);
    return {
      id,
      name: dto?.name?.trim() || 'Herói sem nome',
      finalized: Boolean(dto?.sheetFinalized),
    };
  });
}
