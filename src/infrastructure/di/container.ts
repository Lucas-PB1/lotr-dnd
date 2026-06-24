import {
  CreateCharacterUseCase,
  DeleteCharacterUseCase,
  ListCharacterIdsUseCase,
  LoadCharacterUseCase,
  SaveCharacterUseCase,
} from '../../application/use-cases/CharacterUseCases';
import { LocalStorageCharacterRepository } from '../../infrastructure/persistence/LocalStorageCharacterRepository';

const repository = new LocalStorageCharacterRepository();

export const characterService = {
  load: new LoadCharacterUseCase(repository),
  save: new SaveCharacterUseCase(repository),
  create: new CreateCharacterUseCase(repository),
  listIds: new ListCharacterIdsUseCase(repository),
  delete: new DeleteCharacterUseCase(repository),
};

export const DEFAULT_CHARACTER_ID = 'default';
