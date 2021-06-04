import { createContext, useContext } from 'react';
import { Memory } from '../models/Memory';

export type MemoriesContextType = {
  memories: Memory[];
  setMemories: (memories: Memory[]) => void;
};

export const MemoriesContext = createContext<MemoriesContextType>({ memories: [], setMemories: (memories) => console.warn('no memories provider') });
export const useMemories = () => useContext(MemoriesContext);
