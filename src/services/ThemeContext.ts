import { createContext, useContext } from 'react';
import { ThemeEnum } from './ThemeEnum';

export type ThemeContextType = {
  theme: ThemeEnum;
  setTheme: (Theme: ThemeEnum) => void;
};

export const ThemeContext = createContext<ThemeContextType>({ theme: ThemeEnum.Light, setTheme: (theme) => console.warn('no theme provider') });
export const useTheme = () => useContext(ThemeContext);
