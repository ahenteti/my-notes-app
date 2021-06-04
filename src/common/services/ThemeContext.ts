import { createContext, useContext } from 'react';
import { Theme } from '../models/Theme';

export type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Light, setTheme: (theme) => console.warn('no theme provider') });
export const useTheme = () => useContext(ThemeContext);
