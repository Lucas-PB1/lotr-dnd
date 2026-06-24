import { useEffect, useRef, useState } from 'react';
import { SHELL_UI } from '../../../shared/constants/shellLabels';
import { useCharacterSheet } from '../../context/CharacterSheetContext';

type CharacterManagerModalProps = {
  open: boolean;
  onClose: () => void;
  onCharacterChanged?: () => void;
};

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function CharacterManagerModal({
  open,
  onClose,
  onCharacterChanged,
}: CharacterManagerModalProps) {
  const {
    character,
    characterSummaries,
    switchCharacter,
    createNewCharacter,
    deleteCharacter,
    exportCharacterJson,
    importCharacterJson,
  } = useCharacterSheet();
  const fileRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [importError, setImportError] = useState<string | null>(null);

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

  const handleSwitch = (id: string) => {
    if (id === character.id) return;
    switchCharacter(id);
    onCharacterChanged?.();
    onClose();
  };

  const handleCreate = () => {
    createNewCharacter();
    onCharacterChanged?.();
    onClose();
  };

  const handleDelete = (id: string, name: string) => {
    if (!window.confirm(`${SHELL_UI.deleteConfirm}\n\n${name}`)) return;
    deleteCharacter(id);
    onCharacterChanged?.();
  };

  const handleImportFile = async (file: File) => {
    setImportError(null);
    try {
      const text = await file.text();
      importCharacterJson(text);
      onCharacterChanged?.();
      onClose();
    } catch {
      setImportError(SHELL_UI.importError);
    }
  };

  return (
    <div className="st-char-modal no-print" role="dialog" aria-modal="true" aria-labelledby="st-char-modal-title">
      <button type="button" className="st-char-modal__backdrop" aria-label="Fechar" onClick={onClose} />
      <div ref={panelRef} className="st-char-modal__panel" tabIndex={-1}>
        <header className="st-char-modal__header">
          <div>
            <p className="st-char-modal__eyebrow">{SHELL_UI.characters}</p>
            <h2 id="st-char-modal-title" className="st-char-modal__title">
              {SHELL_UI.charactersTitle}
            </h2>
            <p className="st-char-modal__hint">{SHELL_UI.charactersHint}</p>
          </div>
          <button type="button" className="st-char-modal__close" onClick={onClose} aria-label="Fechar">
            ×
          </button>
        </header>

        <p className="st-char-modal__count">{SHELL_UI.charactersCount(characterSummaries.length)}</p>

        <ul className="st-char-cards">
          {characterSummaries.map((entry) => {
            const active = entry.id === character.id;
            return (
              <li key={entry.id}>
                <div
                  className={`st-char-card${active ? ' st-char-card--active' : ''}`}
                  role="button"
                  tabIndex={active ? -1 : 0}
                  aria-current={active ? 'true' : undefined}
                  onClick={() => handleSwitch(entry.id)}
                  onKeyDown={(e) => {
                    if (!active && (e.key === 'Enter' || e.key === ' ')) {
                      e.preventDefault();
                      handleSwitch(entry.id);
                    }
                  }}
                >
                  <span className="st-char-card__avatar" aria-hidden>
                    {initials(entry.name)}
                  </span>
                  <div className="st-char-card__body">
                    <strong className="st-char-card__name">{entry.name}</strong>
                    <span className="st-char-card__meta">
                      {entry.finalized ? SHELL_UI.modePlay : SHELL_UI.modeBuilding}
                      {!active ? ` · ${SHELL_UI.tapToOpen}` : ''}
                    </span>
                  </div>
                  <div className="st-char-card__aside">
                    {active ? (
                      <span className="st-char-card__badge">{SHELL_UI.activeCharacter}</span>
                    ) : null}
                    {characterSummaries.length > 1 ? (
                      <button
                        type="button"
                        className="st-char-card__delete"
                        aria-label={`${SHELL_UI.deleteCharacter} ${entry.name}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(entry.id, entry.name);
                        }}
                      >
                        {SHELL_UI.deleteCharacter}
                      </button>
                    ) : null}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        {importError ? <p className="st-char-modal__error">{importError}</p> : null}

        <footer className="st-char-modal__footer">
          <button type="button" className="st-char-modal__action st-char-modal__action--primary" onClick={handleCreate}>
            <span className="st-char-modal__action-icon" aria-hidden>+</span>
            {SHELL_UI.newCharacter}
          </button>
          <button type="button" className="st-char-modal__action" onClick={exportCharacterJson}>
            {SHELL_UI.exportJson}
          </button>
          <button type="button" className="st-char-modal__action" onClick={() => fileRef.current?.click()}>
            {SHELL_UI.importJson}
          </button>
        </footer>

        <input
          ref={fileRef}
          type="file"
          accept="application/json,.json"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) void handleImportFile(file);
            e.target.value = '';
          }}
        />
      </div>
    </div>
  );
}
