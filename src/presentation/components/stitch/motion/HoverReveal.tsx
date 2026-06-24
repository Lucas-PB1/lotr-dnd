import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotion } from './useReducedMotion';

type HoverRevealProps = {
  children: ReactNode;
  reveal: ReactNode;
  className?: string;
};

export function HoverReveal({ children, reveal, className = '' }: HoverRevealProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className}>
        {children}
        {reveal}
      </div>
    );
  }

  return (
    <motion.div className={`group ${className}`.trim()} initial="rest" whileHover="hover">
      {children}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.15 }}
      >
        {reveal}
      </motion.div>
    </motion.div>
  );
}
