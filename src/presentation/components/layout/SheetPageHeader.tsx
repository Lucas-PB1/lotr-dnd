import { Badge, Button } from 'flowbite-react';
import type { CharacterProps } from '../../../domain/entities/Character';

interface SheetPageHeaderProps {
  character: CharacterProps;
  isSaving: boolean;
  onResetClick: () => void;
}

export function SheetPageHeader({ character, isSaving, onResetClick }: SheetPageHeaderProps) {
  return (
    <header className="sheet-page__header">
      <div>
        <h1 className="sheet-page__title">The Lord of the Rings™ Roleplaying</h1>
        <p className="sheet-page__subtitle">
          {character.name || 'Ficha de Personagem'}
          {character.culture ? ` · ${character.culture}` : ''}
          {character.callingAndLevel ? ` · ${character.callingAndLevel}` : ''}
        </p>
      </div>
      <div className="sheet-page__actions">
        <Badge color={isSaving ? 'warning' : 'success'} size="sm">
          {isSaving ? 'Salvando…' : 'Salvo'}
        </Badge>
        <Button color="failure" size="sm" onClick={onResetClick}>
          Limpar ficha
        </Button>
      </div>
    </header>
  );
}
