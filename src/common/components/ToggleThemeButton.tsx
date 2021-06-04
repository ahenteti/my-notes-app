import React from 'react';
import { ThemeStorage } from '../services/ThemeStorage';
import { useTheme } from '../services/ThemeContext';
import { View } from 'react-native';
import { FeatherIconButton } from './IconButton';
import { Theme } from '../models/Theme';

interface ToggleThemeButtonProps {
  themeStorage?: ThemeStorage;
}

export default function ToggleThemeButton({ themeStorage = ThemeStorage.getInstance() }: ToggleThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme.dark ? Theme.Light : Theme.Dark);
    themeStorage.toggleTheme(theme);
  };

  return <View>{theme.dark ? <FeatherIconButton name='sun' onPress={toggleTheme} /> : <FeatherIconButton name='moon' onPress={toggleTheme} />}</View>;
}
