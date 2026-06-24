import { useState } from 'react';

type StoryEditorTab = 'chronicle' | 'treasure';

interface StoryEditorProps {
  chronicle: string;
  treasure: string;
  onChronicleChange: (value: string) => void;
  onTreasureChange: (value: string) => void;
  chronicleDescription?: string;
  treasureHint?: string;
}

export function StoryEditor({
  chronicle,
  treasure,
  onChronicleChange,
  onTreasureChange,
  chronicleDescription,
  treasureHint,
}: StoryEditorProps) {
  const [tab, setTab] = useState<StoryEditorTab>('chronicle');
  const active = tab === 'chronicle' ? chronicle : treasure;
  const words = active.trim() ? active.trim().split(/\s+/).length : 0;

  return (
    <div className="story-editor">
      <div className="story-editor__toolbar">
        <div className="segmented-control" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'chronicle'}
            className={`segmented-control__btn${tab === 'chronicle' ? ' segmented-control__btn--active' : ''}`}
            onClick={() => setTab('chronicle')}
          >
            Crônica
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'treasure'}
            className={`segmented-control__btn${tab === 'treasure' ? ' segmented-control__btn--active' : ''}`}
            onClick={() => setTab('treasure')}
          >
            Tesouros
          </button>
        </div>
        <span className="story-editor__meta">
          {words} {words === 1 ? 'palavra' : 'palavras'}
        </span>
      </div>

      {tab === 'chronicle' ? (
        <div className="story-editor__pane">
          {chronicleDescription && (
            <p className="story-editor__desc">{chronicleDescription}</p>
          )}
          <textarea
            className="story-editor__area"
            value={chronicle}
            onChange={(e) => onChronicleChange(e.target.value)}
            placeholder="Conte a jornada do herói antes da aventura atual…"
            rows={12}
          />
        </div>
      ) : (
        <div className="story-editor__pane">
          {treasureHint && <p className="story-editor__desc">{treasureHint}</p>}
          <textarea
            className="story-editor__area"
            value={treasure}
            onChange={(e) => onTreasureChange(e.target.value)}
            placeholder="Relíquias, heranças e objetos únicos fora do inventário…"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}
