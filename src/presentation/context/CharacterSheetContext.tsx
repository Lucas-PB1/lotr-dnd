import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { CharacterDto } from '../../application/mappers/CharacterMapper';
import { CombatStatsService } from '../../domain/services/CombatStatsService';
import { PointBuyService } from '../../domain/services/PointBuyService';
import { normalizeCreationChoices } from '../../shared/data/rewardSlotUtils';
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
  const creationChoices = normalizeCreationChoices(loaded.creationChoices);
  const abilities =
    loaded.abilityScoreMode === 'pointBuy'
      ? PointBuyService.clampToPointBuyRange(loaded.abilities)
      : loaded.abilities;

  return CombatStatsService.applyDerivedStats({
    ...loaded,
    creationChoices,
    abilities,
    sheetFinalized: loaded.sheetFinalized ?? false,
  });
}

export function CharacterSheetProvider({ children }: { children: React.ReactNode }) {
  const [character, setCharacter] = useState<CharacterDto>(() =>
    loadOrCreate(DEFAULT_CHARACTER_ID),
  );
  const [isSaving, setIsSaving] = useState(false);
  const saveTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsSaving(true);
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      characterService.save.execute(character);
      setIsSaving(false);
      saveTimerRef.current = null;
    }, 400);

    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [character]);

  const updateCharacter = useCallback((partial: Partial<CharacterDto>) => {
    setCharacter((prev) => {
      const merged = { ...prev, ...partial };
      if (merged.creationChoices) {
        merged.creationChoices = normalizeCreationChoices(merged.creationChoices);
      }
      if (merged.abilityScoreMode === 'pointBuy' && merged.abilities) {
        merged.abilities = PointBuyService.clampToPointBuyRange(merged.abilities);
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
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }

    characterService.delete.execute(DEFAULT_CHARACTER_ID);
    const fresh = CombatStatsService.applyDerivedStats(
      characterService.create.execute(DEFAULT_CHARACTER_ID),
    );
    characterService.save.execute(fresh);
    setIsSaving(false);
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
