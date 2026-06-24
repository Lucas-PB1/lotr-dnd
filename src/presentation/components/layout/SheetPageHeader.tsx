import type { CharacterProps } from '../../../domain/entities/Character';

interface SheetPageHeaderProps {
  character: CharacterProps;
}

export function SheetPageHeader({ character }: SheetPageHeaderProps) {
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
    </header>
  );
}
