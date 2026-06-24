import type { Character } from '../entities/Character';

export interface ICharacterRepository {
  findById(id: string): Character | null;
  save(character: Character): void;
  delete(id: string): void;
  findAllIds(): string[];
}
