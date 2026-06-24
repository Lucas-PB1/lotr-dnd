import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import {
  listCharacterSummaries,
  persistActiveCharacterId,
  resolveActiveCharacterId,
  type CharacterSummary,
} from '../../application/character/activeCharacterStorage';
import {
  downloadCharacterJson,
  newCharacterId,
  parseCharacterImportJson,
} from '../../application/character/characterImportExport';
import type { CharacterDto } from '../../application/mappers/CharacterMapper';
import { CombatStatsService } from '../../domain/services/CombatStatsService';
import { PointBuyService } from '../../domain/services/PointBuyService';
import { normalizeCreationChoices } from '../../shared/data/rewardSlotUtils';
import { characterService } from '../../infrastructure/di/container';

interface CharacterSheetContextValue {
  character: CharacterDto;
  characterSummaries: CharacterSummary[];
  updateCharacter: (partial: Partial<CharacterDto>) => void;
  updateNested: <K extends keyof CharacterDto>(key: K, value: CharacterDto[K]) => void;
  resetCharacter: () => void;
  switchCharacter: (id: string) => void;
  createNewCharacter: () => void;
  deleteCharacter: (id: string) => void;
  exportCharacterJson: () => void;
  importCharacterJson: (json: string) => void;
  refreshCharacterList: () => void;
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
  const initialId = resolveActiveCharacterId();
  const [activeId, setActiveId] = useState(initialId);
  const [character, setCharacter] = useState<CharacterDto>(() => loadOrCreate(initialId));
  const [characterSummaries, setCharacterSummaries] = useState<CharacterSummary[]>(() =>
    listCharacterSummaries(),
  );
  const [isSaving, setIsSaving] = useState(false);
  const saveTimerRef = useRef<number | null>(null);
  const characterRef = useRef(character);

  useEffect(() => {
    characterRef.current = character;
  }, [character]);

  const refreshCharacterList = useCallback(() => {
    setCharacterSummaries(listCharacterSummaries());
  }, []);

  useEffect(() => {
    setIsSaving(true);
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      characterService.save.execute(character);
      setIsSaving(false);
      saveTimerRef.current = null;
      refreshCharacterList();
    }, 400);

    return () => {
      if (saveTimerRef.current !== null) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [character, refreshCharacterList]);

  const flushSave = useCallback(() => {
    if (saveTimerRef.current !== null) {
      window.clearTimeout(saveTimerRef.current);
      saveTimerRef.current = null;
    }
    characterService.save.execute(characterRef.current);
    setIsSaving(false);
  }, []);

  const activateCharacter = useCallback(
    (id: string) => {
      persistActiveCharacterId(id);
      setActiveId(id);
      setCharacter(loadOrCreate(id));
      refreshCharacterList();
    },
    [refreshCharacterList],
  );

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
    flushSave();
    characterService.delete.execute(activeId);
    const fresh = CombatStatsService.applyDerivedStats(characterService.create.execute(activeId));
    characterService.save.execute(fresh);
    setCharacter(fresh);
    refreshCharacterList();
  }, [activeId, flushSave, refreshCharacterList]);

  const switchCharacter = useCallback(
    (id: string) => {
      if (id === activeId) return;
      flushSave();
      activateCharacter(id);
    },
    [activeId, activateCharacter, flushSave],
  );

  const createNewCharacter = useCallback(() => {
    flushSave();
    const id = newCharacterId();
    const fresh = CombatStatsService.applyDerivedStats(characterService.create.execute(id));
    activateCharacter(id);
    setCharacter(fresh);
  }, [activateCharacter, flushSave]);

  const deleteCharacter = useCallback(
    (id: string) => {
      const ids = characterService.listIds.execute();
      if (ids.length <= 1) return;

      characterService.delete.execute(id);

      if (id === activeId) {
        const nextId = characterService.listIds.execute()[0];
        activateCharacter(nextId);
      } else {
        refreshCharacterList();
      }
    },
    [activeId, activateCharacter, refreshCharacterList],
  );

  const exportCharacterJson = useCallback(() => {
    flushSave();
    downloadCharacterJson(characterRef.current);
  }, [flushSave]);

  const importCharacterJson = useCallback(
    (json: string) => {
      flushSave();
      const id = newCharacterId();
      const imported = parseCharacterImportJson(json, id);
      characterService.save.execute(imported);
      activateCharacter(imported.id);
    },
    [activateCharacter, flushSave],
  );

  const value = useMemo(
    () => ({
      character,
      characterSummaries,
      updateCharacter,
      updateNested,
      resetCharacter,
      switchCharacter,
      createNewCharacter,
      deleteCharacter,
      exportCharacterJson,
      importCharacterJson,
      refreshCharacterList,
      isSaving,
    }),
    [
      character,
      characterSummaries,
      updateCharacter,
      updateNested,
      resetCharacter,
      switchCharacter,
      createNewCharacter,
      deleteCharacter,
      exportCharacterJson,
      importCharacterJson,
      refreshCharacterList,
      isSaving,
    ],
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
