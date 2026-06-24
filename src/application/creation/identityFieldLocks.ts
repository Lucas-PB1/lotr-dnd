import type { CreationChoices } from '../../domain/services/CharacterCreationService';
import { normalizeCreationChoices } from '../../shared/data/rewardSlotUtils';

export interface IdentityFieldLocks {
  culture: boolean;
  distinctiveFeatures: boolean;
  shadowPath: boolean;
  callingName: boolean;
}

/** Campos derivados da criação — não editáveis na ficha após definidos. */
export function getIdentityFieldLocks(choices: CreationChoices | undefined): IdentityFieldLocks {
  const c = normalizeCreationChoices(choices);
  return {
    culture: Boolean(c.cultureId),
    distinctiveFeatures: Boolean(c.backgroundId),
    shadowPath: Boolean(c.callingId),
    callingName: Boolean(c.callingId),
  };
}

export const LOCKED_FIELD_HINT = 'Definido na criação — altere na aba Criação';
