import React, { createContext, useContext, useState, useEffect } from 'react';
import { Property } from '../types';

interface CompareContextType {
  compareList: Property[];
  addToCompare: (property: Property) => void;
  removeFromCompare: (propertyId: string) => void;
  clearCompare: () => void;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareList, setCompareList] = useState<Property[]>(() => {
    try {
      const saved = localStorage.getItem('compareList');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('compareList', JSON.stringify(compareList));
  }, [compareList]);

  const addToCompare = (property: Property) => {
    setCompareList(prev => {
      if (prev.find(p => p.id === property.id)) return prev;
      if (prev.length >= 4) {
        alert("You can only compare up to 4 properties at a time.");
        return prev;
      }
      return [...prev, property];
    });
  };

  const removeFromCompare = (propertyId: string) => {
    setCompareList(prev => prev.filter(p => p.id !== propertyId));
  };

  const clearCompare = () => setCompareList([]);

  return (
    <CompareContext.Provider value={{ compareList, addToCompare, removeFromCompare, clearCompare }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
