import type { CharacterProps } from '../../../../domain/entities/Character';
import type { StorySectionId } from '../../../../shared/constants/storyLabels';

function compactLine(text: string, max = 56): string | undefined {
  const trimmed = text.trim();
  if (!trimmed) return undefined;
  const first = trimmed.split(/\n/)[0]?.trim() ?? '';
  if (!first) return undefined;
  return first.length <= max ? first : `${first.slice(0, max).trim()}…`;
}

export function getStorySectionSummary(
  section: StorySectionId,
  character: CharacterProps,
): string | undefined {
  switch (section) {
    case 'appearance': {
      const parts = [
        character.appearance.eyes,
        character.appearance.hair,
        character.appearance.height,
      ].filter((p) => p.trim());
      if (parts.length === 0) return undefined;
      return parts.join(' · ');
    }
    case 'fellowship': {
      const { fellowship } = character;
      if (fellowship.fellowshipName.trim()) {
        const extra = fellowship.heirName.trim() ? ` · ${fellowship.heirName.trim()}` : '';
        return `${fellowship.fellowshipName.trim()}${extra}`;
      }
      return compactLine(fellowship.patrons);
    }
    case 'chronicle':
      return compactLine(character.characterBackstory);
    default:
      return undefined;
  }
}
