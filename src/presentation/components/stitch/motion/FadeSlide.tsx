import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

type FadeSlideProps = {
  motionKey?: string;
  className?: string;
  children: ReactNode;
};

export function FadeSlide({ children, motionKey, className }: FadeSlideProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      key={motionKey}
      className={className}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.22, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}
