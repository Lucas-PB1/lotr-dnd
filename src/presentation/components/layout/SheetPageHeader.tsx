import type { CharacterProps } from '../../../domain/entities/Character';
import { APP_SUBTITLE, APP_TITLE } from '../../../shared/constants/appLabels';

interface SheetPageHeaderProps {
  character: CharacterProps;
}

export function SheetPageHeader({ character }: SheetPageHeaderProps) {
  return (
    <header className="sheet-page__header">
      <div>
        <h1 className="sheet-page__title">{APP_TITLE}</h1>
        <p className="sheet-page__subtitle">
          {character.name || APP_SUBTITLE}
          {character.culture ? ` · ${character.culture}` : ''}
          {character.callingAndLevel ? ` · ${character.callingAndLevel}` : ''}
        </p>
      </div>
    </header>
  );
}
