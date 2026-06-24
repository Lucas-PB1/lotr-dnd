export type RewardSlotKind = 'virtue' | 'virtue-or-craft' | 'craft';

export interface RewardSlotDefinition {
  id: string;
  level: number;
  kind: RewardSlotKind;
  source: 'culture' | 'calling';
  labelPt: string;
}

const CALLING_VIRTUE_PROGRESSION: Record<
  string,
  Array<{ level: number; kind: 'virtue' | 'virtue-or-craft' }>
> = {
  captain: [
    { level: 2, kind: 'virtue-or-craft' },
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue-or-craft' },
    { level: 8, kind: 'virtue' },
    { level: 10, kind: 'virtue-or-craft' },
  ],
  champion: [
    { level: 2, kind: 'virtue-or-craft' },
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue-or-craft' },
    { level: 8, kind: 'virtue' },
  ],
  messenger: [
    { level: 2, kind: 'virtue-or-craft' },
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue-or-craft' },
    { level: 8, kind: 'virtue' },
    { level: 10, kind: 'virtue-or-craft' },
  ],
  scholar: [
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue' },
    { level: 8, kind: 'virtue' },
  ],
  'treasure-hunter': [
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue-or-craft' },
    { level: 8, kind: 'virtue' },
  ],
  warden: [
    { level: 2, kind: 'virtue-or-craft' },
    { level: 4, kind: 'virtue' },
    { level: 6, kind: 'virtue-or-craft' },
    { level: 8, kind: 'virtue' },
    { level: 10, kind: 'virtue-or-craft' },
  ],
};

/** Erudito: ganha slot de ofício nestes níveis (Cap. 3, tabela do Scholar). */
export const SCHOLAR_CRAFT_SLOT_LEVELS = [1, 3, 5, 7, 9] as const;

export function getRewardSlots(
  cultureId: string | null,
  callingId: string | null,
  level: number,
): RewardSlotDefinition[] {
  const slots: RewardSlotDefinition[] = [];

  if (cultureId && (cultureId === 'bardings' || cultureId === 'men-bree') && level >= 1) {
    slots.push({
      id: 'culture-starting-virtue',
      level: 1,
      kind: 'virtue',
      source: 'culture',
      labelPt: 'Virtude cultural inicial',
    });
  }

  if (callingId === 'scholar') {
    for (const craftLevel of SCHOLAR_CRAFT_SLOT_LEVELS) {
      if (level >= craftLevel) {
        slots.push({
          id: `scholar-craft-${craftLevel}`,
          level: craftLevel,
          kind: 'craft',
          source: 'calling',
          labelPt: `Ofício (slot ${SCHOLAR_CRAFT_SLOT_LEVELS.indexOf(craftLevel) + 1}) — nível ${craftLevel}`,
        });
      }
    }
  }

  const progression = callingId ? CALLING_VIRTUE_PROGRESSION[callingId] : undefined;
  if (progression) {
    for (const entry of progression) {
      if (level >= entry.level) {
        slots.push({
          id: `${callingId}-reward-${entry.level}`,
          level: entry.level,
          kind: entry.kind,
          source: 'calling',
          labelPt:
            entry.kind === 'virtue-or-craft'
              ? `Nível ${entry.level}: Virtude ou Ofício`
              : `Nível ${entry.level}: Virtude`,
        });
      }
    }
  }

  return slots.sort((a, b) => a.level - b.level || a.id.localeCompare(b.id));
}
