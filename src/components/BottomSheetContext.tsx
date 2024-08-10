/* eslint-disable prettier/prettier */
// BottomSheetContext.tsx
import React, { createContext, useContext, ReactNode } from 'react';

interface BottomSheetContextType {
  pressHandler: () => void;
  pressHandler2: () => void;
}

const BottomSheetContext = createContext<BottomSheetContextType | undefined>(undefined);

interface BottomSheetProviderProps {
  children: ReactNode;
  pressHandler: () => void;
  pressHandler2: () => void;
}

export const BottomSheetProvider: React.FC<BottomSheetProviderProps> = ({ children, pressHandler, pressHandler2 }) => (
  <BottomSheetContext.Provider value={{ pressHandler , pressHandler2 }}>
    {children}
  </BottomSheetContext.Provider>
);

export const useBottomSheet = (): BottomSheetContextType => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error('useBottomSheet must be used within a BottomSheetProvider');
  }
  return context;
};
