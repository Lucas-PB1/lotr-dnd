import { useEffect, useRef } from 'react';
import { JOURNEY_STEP_LABELS, SHELL_UI } from '../../../shared/constants/shellLabels';

interface ResetCharacterModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ResetCharacterModal({ open, onClose, onConfirm }: ResetCharacterModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    panelRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleConfirm = () => {
    onConfirm();
  };

  return (
    <div
      className="st-reset-modal no-print"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="st-reset-modal-title"
      aria-describedby="st-reset-modal-desc"
    >
      <button type="button" className="st-reset-modal__backdrop" aria-label="Fechar" onClick={onClose} />
      <div ref={panelRef} className="st-reset-modal__panel" tabIndex={-1}>
        <span className="st-reset-modal__icon" aria-hidden>
          !
        </span>

        <header className="st-reset-modal__header">
          <p className="st-reset-modal__eyebrow">{SHELL_UI.reset}</p>
          <h2 id="st-reset-modal-title" className="st-reset-modal__title">
            {SHELL_UI.resetTitle}
          </h2>
        </header>

        <div id="st-reset-modal-desc" className="st-reset-modal__body">
          <p>{SHELL_UI.resetBody}</p>
          <ul>
            <li>
              {SHELL_UI.resetBulletCreationPrefix} <strong>{JOURNEY_STEP_LABELS.creation}</strong>
            </li>
            <li>{SHELL_UI.resetBulletUndo}</li>
          </ul>
        </div>

        <footer className="st-reset-modal__footer">
          <button type="button" className="st-reset-modal__action" onClick={onClose}>
            {SHELL_UI.cancel}
          </button>
          <button
            type="button"
            className="st-reset-modal__action st-reset-modal__action--danger"
            onClick={handleConfirm}
          >
            {SHELL_UI.resetConfirm}
          </button>
        </footer>
      </div>
    </div>
  );
}
