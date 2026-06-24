import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { CharacterDto } from '../../application/mappers/CharacterMapper';
import { CombatStatsService } from '../../domain/services/CombatStatsService';
import { migrateCreationChoices } from '../../shared/data/rewardSlotUtils';
import {
  characterService,
  DEFAULT_CHARACTER_ID,
} from '../../infrastructure/di/container';

interface CharacterSheetContextValue {
  character: CharacterDto;
  updateCharacter: (partial: Partial<CharacterDto>) => void;
  updateNested: <K extends keyof CharacterDto>(
    key: K,
    value: CharacterDto[K],
  ) => void;
  resetCharacter: () => void;
  isSaving: boolean;
}

const CharacterSheetContext = createContext<CharacterSheetContextValue | null>(null);

function loadOrCreate(id: string): CharacterDto {
  const loaded = characterService.load.execute(id) ?? characterService.create.execute(id);
  const migrated = {
    ...loaded,
    creationChoices: migrateCreationChoices(loaded.creationChoices),
  };
  return CombatStatsService.applyDerivedStats(migrated);
}

export function CharacterSheetProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<CharacterDto>(() =>
    loadOrCreate(DEFAULT_CHARACTER_ID),
  );
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setIsSaving(true);
    const timer = window.setTimeout(() => {
      characterService.save.execute(character);
      setIsSaving(false);
    }, 400);

    return () => window.clearTimeout(timer);
  }, [character]);

  const updateCharacter = useCallback((partial: Partial<CharacterDto>) => {
    setCharacter((prev) => {
      const merged = { ...prev, ...partial };
      if (merged.creationChoices) {
        merged.creationChoices = migrateCreationChoices(merged.creationChoices);
      }
      return CombatStatsService.applyDerivedStats(merged);
    });
  }, []);

  const updateNested = useCallback(
    <K extends keyof CharacterDto>(key: K, value: CharacterDto[K]) => {
      setCharacter((prev) => ({ ...prev, [key]: value }));
    },
    [],
  );

  const resetCharacter = useCallback(() => {
    characterService.delete.execute(DEFAULT_CHARACTER_ID);
    const fresh = CombatStatsService.applyDerivedStats(
      characterService.create.execute(DEFAULT_CHARACTER_ID),
    );
    setCharacter(fresh);
  }, []);

  const value = useMemo(
    () => ({ character, updateCharacter, updateNested, resetCharacter, isSaving }),
    [character, updateCharacter, updateNested, resetCharacter, isSaving],
  );

  return (
    <CharacterSheetContext.Provider value={value}>
      {children}
    </CharacterSheetContext.Provider>
  );
}

export function useCharacterSheet(): CharacterSheetContextValue {
  const ctx = useContext(CharacterSheetContext);
  if (!ctx) {
    throw new Error('useCharacterSheet deve ser usado dentro de CharacterSheetProvider');
  }
  return ctx;
}
