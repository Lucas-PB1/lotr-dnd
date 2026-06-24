import type { CharacterProps } from '../../domain/entities/Character';
import { Character } from '../../domain/entities/Character';

export type CharacterDto = CharacterProps;

export class CharacterMapper {
  static toDto(character: Character): CharacterDto {
    return { ...character.props };
  }

  static toDomain(dto: CharacterDto): Character {
    return new Character(dto);
  }
}
