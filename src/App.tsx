import { ThemeInit } from '../.flowbite-react/init';
import { CharacterSheetProvider } from './presentation/context/CharacterSheetContext';
import { CharacterSheetPage } from './presentation/pages/CharacterSheetPage';

export default function App() {
  return (
    <>
      <ThemeInit />
      <CharacterSheetProvider>
        <CharacterSheetPage />
      </CharacterSheetProvider>
    </>
  );
}
