import { useCallback, useEffect, useRef, useState } from 'react';
import type { DiceRollResult } from '../../domain/services/DiceRollService';
import { useReducedMotion } from '../components/stitch/motion/useReducedMotion';

const ROLL_TICK_MS = 55;
const ROLL_TICKS = 9;

function randomFace(sides: number): number {
  return Math.floor(Math.random() * sides) + 1;
}

export function useAnimatedDiceRoll() {
  const reduced = useReducedMotion();
  const [rolling, setRolling] = useState(false);
  const [face, setFace] = useState(1);
  const [result, setResult] = useState<DiceRollResult | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }
    },
    [],
  );

  const roll = useCallback(
    (compute: () => DiceRollResult) => {
      if (timerRef.current !== null) {
        window.clearInterval(timerRef.current);
      }

      const final = compute();

      if (reduced) {
        setResult(final);
        setFace(final.sides === 20 ? final.natural : final.natural);
        setRolling(false);
        return;
      }

      setResult(null);
      setRolling(true);
      let ticks = 0;

      timerRef.current = window.setInterval(() => {
        setFace(randomFace(final.sides === 20 ? 20 : Math.min(final.sides, 12)));
        ticks += 1;
        if (ticks >= ROLL_TICKS) {
          if (timerRef.current !== null) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          setResult(final);
          setFace(final.natural);
          setRolling(false);
        }
      }, ROLL_TICK_MS);
    },
    [reduced],
  );

  return { rolling, face, result, roll };
}
