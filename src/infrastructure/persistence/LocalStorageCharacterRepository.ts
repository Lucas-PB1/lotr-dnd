import type { CharacterProps } from '../../domain/entities/Character';
import { Character, createEmptyCharacterProps } from '../../domain/entities/Character';
import type { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { STORAGE_KEY } from '../../shared/constants/gameConstants';

type CharacterStore = Record<string, CharacterProps>;

export class LocalStorageCharacterRepository implements ICharacterRepository {
  private getStore(): CharacterStore {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as CharacterStore;
    } catch {
      return {};
    }
  }

  private persistStore(store: CharacterStore): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  }

  findById(id: string): Character | null {
    const store = this.getStore();
    const props = store[id];
    if (!props) return null;
    const defaults = createEmptyCharacterProps(id);
    return new Character({ ...defaults, ...props, id });
  }

  save(character: Character): void {
    const store = this.getStore();
    store[character.id] = character.props;
    this.persistStore(store);
  }

  delete(id: string): void {
    const store = this.getStore();
    delete store[id];
    this.persistStore(store);
  }

  findAllIds(): string[] {
    return Object.keys(this.getStore());
  }
}
