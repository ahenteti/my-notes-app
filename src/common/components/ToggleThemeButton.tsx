import React from 'react';
import { ThemeEnum } from '../services/ThemeEnum';
import { ThemeStorage } from '../services/ThemeStorage';
import { useTheme } from '../services/ThemeContext';
import { View } from 'react-native';
import FeatherIconButton from './FeatherIconButton';

interface ToggleThemeButtonProps {
  themeStorage?: ThemeStorage;
}

export default function ToggleThemeButton({ themeStorage = ThemeStorage.getInstance() }: ToggleThemeButtonProps) {
  const { theme, setTheme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme == ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark);
    themeStorage.toggleTheme(theme);
  };

  return (
    <View>
      {theme == ThemeEnum.Dark ? <FeatherIconButton name='sun' onPress={toggleTheme} /> : null}
      {theme == ThemeEnum.Light ? <FeatherIconButton name='moon' onPress={toggleTheme} /> : null}
    </View>
  );
}
