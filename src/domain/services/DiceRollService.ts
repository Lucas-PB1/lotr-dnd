export type DiceRollResult = {
  natural: number;
  modifier: number;
  total: number;
  sides: number;
  label?: string;
};

function rollDie(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function rollD20(modifier = 0, label?: string): DiceRollResult {
  const natural = rollDie(20);
  return {
    natural,
    modifier,
    total: natural + modifier,
    sides: 20,
    label,
  };
}

/** Interpreta notação simples: 1d6, 1d8, 2d6… */
export function rollDiceNotation(notation: string, modifier = 0, label?: string): DiceRollResult | null {
  const match = notation.trim().match(/^(\d+)d(\d+)$/i);
  if (!match) return null;

  const count = Number(match[1]);
  const sides = Number(match[2]);
  if (!Number.isFinite(count) || !Number.isFinite(sides) || count < 1 || sides < 2) {
    return null;
  }

  let sum = 0;
  for (let i = 0; i < count; i += 1) {
    sum += rollDie(sides);
  }

  return {
    natural: sum,
    modifier,
    total: sum + modifier,
    sides,
    label,
  };
}

export function formatRollResult(result: DiceRollResult): string {
  const mod =
    result.modifier === 0
      ? ''
      : result.modifier > 0
        ? ` + ${result.modifier}`
        : ` − ${Math.abs(result.modifier)}`;

  if (result.sides === 20) {
    return `${result.natural}${mod} = ${result.total}`;
  }

  return `${result.natural}${mod} = ${result.total}`;
}
