import { useState } from 'react';

type FellowshipEditorTab = 'patrons' | 'investment';

interface FellowshipEditorProps {
  patrons: string;
  investment: string;
  onPatronsChange: (value: string) => void;
  onInvestmentChange: (value: string) => void;
  patronsDescription?: string;
  investmentDescription?: string;
  activeTab?: FellowshipEditorTab;
  onTabChange?: (tab: FellowshipEditorTab) => void;
}

export function FellowshipEditor({
  patrons,
  investment,
  onPatronsChange,
  onInvestmentChange,
  patronsDescription,
  investmentDescription,
  activeTab,
  onTabChange,
}: FellowshipEditorProps) {
  const [internalTab, setInternalTab] = useState<FellowshipEditorTab>('patrons');
  const tab = activeTab ?? internalTab;

  const setTab = (next: FellowshipEditorTab) => {
    if (onTabChange) onTabChange(next);
    else setInternalTab(next);
  };

  const activeText = tab === 'patrons' ? patrons : investment;
  const lines = activeText.trim() ? activeText.trim().split('\n').filter(Boolean).length : 0;

  return (
    <div className="story-editor fellowship-editor">
      <div className="story-editor__toolbar">
        <div className="segmented-control" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'patrons'}
            className={`segmented-control__btn${tab === 'patrons' ? ' segmented-control__btn--active' : ''}`}
            onClick={() => setTab('patrons')}
          >
            Refúgios & laços
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={tab === 'investment'}
            className={`segmented-control__btn${tab === 'investment' ? ' segmented-control__btn--active' : ''}`}
            onClick={() => setTab('investment')}
          >
            Investimentos
          </button>
        </div>
        <span className="story-editor__meta">
          {lines} {lines === 1 ? 'entrada' : 'entradas'}
        </span>
      </div>

      {tab === 'patrons' ? (
        <div className="story-editor__pane">
          {patronsDescription && (
            <p className="story-editor__desc">{patronsDescription}</p>
          )}
          <textarea
            className="story-editor__area"
            value={patrons}
            onChange={(e) => onPatronsChange(e.target.value)}
            placeholder="Refúgios, patronos e vínculos da Comunidade…"
            rows={8}
          />
        </div>
      ) : (
        <div className="story-editor__pane">
          {investmentDescription && (
            <p className="story-editor__desc">{investmentDescription}</p>
          )}
          <textarea
            className="story-editor__area"
            value={investment}
            onChange={(e) => onInvestmentChange(e.target.value)}
            placeholder="Como a Comunidade gasta pontos: armaria, biblioteca, rede de espiões…"
            rows={6}
          />
        </div>
      )}
    </div>
  );
}

export type { FellowshipEditorTab };
