import type { CharacterProps } from '../../../../domain/entities/Character';
import type { StorySectionId } from '../../../../shared/constants/storyLabels';

export function isStorySectionComplete(
  section: StorySectionId,
  character: CharacterProps,
): boolean {
  switch (section) {
    case 'appearance':
      return Boolean(
        character.appearance.age.trim()
        || character.appearance.hair.trim()
        || character.appearance.eyes.trim(),
      );
    case 'fellowship':
      return Boolean(
        character.fellowship.fellowshipName.trim() || character.fellowship.patrons.trim(),
      );
    case 'chronicle':
      return Boolean(character.characterBackstory.trim());
    default:
      return false;
  }
}

export function countStorySectionsComplete(character: CharacterProps): number {
  const ids: StorySectionId[] = ['appearance', 'fellowship', 'chronicle'];
  return ids.filter((id) => isStorySectionComplete(id, character)).length;
}
