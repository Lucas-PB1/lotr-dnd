import { useState, type ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { CheckIcon } from '@heroicons/react/24/solid';
import { CREATION_UI } from '../../../../shared/constants/creationLabels';
import { useReducedMotion } from '../../stitch/motion/useReducedMotion';

type CreationManuscriptSectionProps = {
  numeral: string;
  title: string;
  complete?: boolean;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export function CreationManuscriptSection({
  numeral,
  title,
  complete,
  summary,
  defaultOpen = false,
  children,
}: CreationManuscriptSectionProps) {
  const [open, setOpen] = useState(defaultOpen);
  const reduced = useReducedMotion();

  return (
    <section
      className={`st-creation-section${complete ? ' st-creation-section--complete' : ''}${open ? ' st-creation-section--open' : ''}`}
    >
      <button
        type="button"
        className="st-creation-section__trigger"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
      >
        <span className="st-creation-section__trigger-main">
          <span className="st-creation-section__numeral">{numeral}</span>
          <span className="st-creation-section__titles">
            <span className="st-creation-section__title">{title}</span>
            {!open && summary && (
              <span className="st-creation-section__summary">{summary}</span>
            )}
          </span>
        </span>

        <span className="st-creation-section__trigger-end">
          {complete && (
            <span className="st-creation-section__seal" title={CREATION_UI.complete} aria-hidden>
              <CheckIcon className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDownIcon
            className={`st-creation-section__chevron${open ? ' st-creation-section__chevron--open' : ''}`}
            aria-hidden
          />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="panel"
            className="st-creation-section__collapse"
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: [0.33, 1, 0.68, 1] }}
          >
            <div className="st-creation-section__body">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
