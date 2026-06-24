/** Regras oficiais D&D 5e — Compra de Pontos (Player's Handbook) */
export const POINT_BUY_TOTAL = 27;
export const POINT_BUY_MIN_SCORE = 8;
export const POINT_BUY_MAX_SCORE = 15;

export const POINT_BUY_COSTS: Record<number, number> = {
  8: 0,
  9: 1,
  10: 2,
  11: 3,
  12: 4,
  13: 5,
  14: 7,
  15: 9,
};

export type AbilityScoreMode = 'manual' | 'pointBuy';
