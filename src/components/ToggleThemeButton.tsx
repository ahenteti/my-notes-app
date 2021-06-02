import React from 'react';
import { View } from 'react-native';
import { ThemeEnum } from '../services/ThemeEnum';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../services/ThemeContext';
import { ThemeStorage } from '../services/ThemeStorage';

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
      {theme == ThemeEnum.Dark ? <Feather name='sun' size={24} color='#CCC' onPress={toggleTheme} /> : null}
      {theme == ThemeEnum.Light ? <Feather name='moon' size={24} color='#444' onPress={toggleTheme} /> : null}
    </View>
  );
}
