import { Character } from '../../domain/entities/Character';
import type { ICharacterRepository } from '../../domain/repositories/ICharacterRepository';
import { CharacterMapper } from '../mappers/CharacterMapper';
import type { CharacterDto } from '../mappers/CharacterMapper';

export class LoadCharacterUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  execute(id: string): CharacterDto | null {
    const character = this.repository.findById(id);
    return character ? CharacterMapper.toDto(character) : null;
  }
}

export class SaveCharacterUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  execute(dto: CharacterDto): void {
    this.repository.save(CharacterMapper.toDomain(dto));
  }
}

export class CreateCharacterUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  execute(id: string): CharacterDto {
    const character = Character.create(id);
    this.repository.save(character);
    return CharacterMapper.toDto(character);
  }
}

export class ListCharacterIdsUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  execute(): string[] {
    return this.repository.findAllIds();
  }
}

export class DeleteCharacterUseCase {
  constructor(private readonly repository: ICharacterRepository) {}

  execute(id: string): void {
    this.repository.delete(id);
  }
}
