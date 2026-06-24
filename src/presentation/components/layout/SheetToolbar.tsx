import { Badge, Button } from 'flowbite-react';

interface SheetToolbarProps {
  isSaving: boolean;
  onResetClick: () => void;
}

export function SheetToolbar({ isSaving, onResetClick }: SheetToolbarProps) {
  return (
    <div className="sheet-toolbar no-print">
      <p className="sheet-toolbar__hint">
        Dados salvos automaticamente neste navegador.
      </p>
      <div className="sheet-toolbar__actions">
        <Badge color={isSaving ? 'warning' : 'success'} size="sm">
          {isSaving ? 'Salvando…' : 'Salvo'}
        </Badge>
        <Button color="failure" size="sm" onClick={onResetClick}>
          Começar do zero
        </Button>
      </div>
    </div>
  );
}
