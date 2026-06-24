import { createContext, useContext, type ReactNode } from 'react';
import type { SheetTabId } from '../components/layout/shell/sheetTabTypes';

type SheetNavigationContextValue = {
  goToTab: (tab: SheetTabId) => void;
};

const SheetNavigationContext = createContext<SheetNavigationContextValue | null>(null);

export function SheetNavigationProvider({
  goToTab,
  children,
}: {
  goToTab: (tab: SheetTabId) => void;
  children: ReactNode;
}) {
  return (
    <SheetNavigationContext.Provider value={{ goToTab }}>{children}</SheetNavigationContext.Provider>
  );
}

export function useSheetNavigation(): SheetNavigationContextValue {
  const ctx = useContext(SheetNavigationContext);
  if (!ctx) {
    return { goToTab: () => {} };
  }
  return ctx;
}
