import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { useReducedMotion } from './useReducedMotion';

type TapScaleProps = {
  children: ReactNode;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  'aria-label'?: string;
  disabled?: boolean;
};

export function TapScale({
  children,
  className,
  type = 'button',
  onClick,
  'aria-label': ariaLabel,
  disabled,
}: TapScaleProps) {
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <button type={type} className={className} onClick={onClick} aria-label={ariaLabel} disabled={disabled}>
        {children}
      </button>
    );
  }

  return (
    <motion.button
      type={type}
      className={className}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.1 }}
    >
      {children}
    </motion.button>
  );
}
