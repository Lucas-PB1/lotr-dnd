import type { CharacterDto } from '../mappers/CharacterMapper';
import { CombatStatsService } from '../../domain/services/CombatStatsService';
import { PointBuyService } from '../../domain/services/PointBuyService';
import { createEmptyCharacterProps } from '../../domain/entities/Character';
import { normalizeCreationChoices } from '../../shared/data/rewardSlotUtils';

function slugify(name: string): string {
  return (
    name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'personagem'
  );
}

export function normalizeImportedCharacter(raw: unknown, fallbackId: string): CharacterDto {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Arquivo JSON inválido.');
  }

  const data = raw as Partial<CharacterDto>;
  const id = typeof data.id === 'string' && data.id.trim() ? data.id.trim() : fallbackId;
  const defaults = createEmptyCharacterProps(id);

  const merged: CharacterDto = {
    ...defaults,
    ...data,
    id,
    creationChoices: normalizeCreationChoices(data.creationChoices ?? defaults.creationChoices),
    abilities: data.abilities ?? defaults.abilities,
    savingThrows: { ...defaults.savingThrows, ...data.savingThrows },
    skills: { ...defaults.skills, ...data.skills },
    hitPoints: { ...defaults.hitPoints, ...data.hitPoints },
    deathSaves: { ...defaults.deathSaves, ...data.deathSaves },
    shadow: { ...defaults.shadow, ...data.shadow },
    encumbrance: { ...defaults.encumbrance, ...data.encumbrance },
    currency: { ...defaults.currency, ...data.currency },
    fellowship: { ...defaults.fellowship, ...data.fellowship },
    appearance: { ...defaults.appearance, ...data.appearance },
    inventory: data.inventory ?? defaults.inventory,
    ownedMagicalItems: data.ownedMagicalItems ?? defaults.ownedMagicalItems,
    attacks: data.attacks ?? defaults.attacks,
    abilityBonusSources: data.abilityBonusSources ?? defaults.abilityBonusSources,
    sheetFinalized: data.sheetFinalized ?? false,
  };

  if (merged.abilityScoreMode === 'pointBuy') {
    merged.abilities = PointBuyService.clampToPointBuyRange(merged.abilities);
  }

  return CombatStatsService.applyDerivedStats(merged);
}

export function parseCharacterImportJson(json: string, fallbackId: string): CharacterDto {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json);
  } catch {
    throw new Error('Não foi possível ler o arquivo JSON.');
  }
  return normalizeImportedCharacter(parsed, fallbackId);
}

export function downloadCharacterJson(character: CharacterDto): void {
  const blob = new Blob([JSON.stringify(character, null, 2)], {
    type: 'application/json;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `personagem-${slugify(character.name)}.json`;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function newCharacterId(): string {
  return crypto.randomUUID();
}
