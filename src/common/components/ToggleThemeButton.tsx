import React from 'react';
import { ThemeStorage } from '../services/ThemeStorage';
import { useTheme } from '../services/ThemeContext';
import { View } from 'react-native';
import { Theme } from '../models/Theme';
import IconButton, { IconButtonType } from './IconButton';

interface ToggleThemeButtonProps {
  themeStorage?: ThemeStorage;
}

export default function ToggleThemeButton({ themeStorage = ThemeStorage.getInstance() }: ToggleThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme.dark ? Theme.Light : Theme.Dark);
    themeStorage.toggle(theme);
  };

  return (
    <View>
      {theme.dark ? (
        <IconButton type={IconButtonType.Feather} name='sun' onPress={toggleTheme} />
      ) : (
        <IconButton type={IconButtonType.Feather} name='moon' onPress={toggleTheme} />
      )}
    </View>
  );
}
