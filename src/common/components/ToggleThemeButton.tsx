import React from 'react';
import { TouchableHighlight, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeEnum } from '../services/ThemeEnum';
import { ThemeStorage } from '../services/ThemeStorage';
import { useTheme } from '../services/ThemeContext';

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
      {theme == ThemeEnum.Dark ? (
        <TouchableHighlight>
          <Feather name='sun' size={24} color='#CCC' onPress={toggleTheme} />
        </TouchableHighlight>
      ) : null}
      {theme == ThemeEnum.Light ? (
        <TouchableHighlight>
          <Feather name='moon' size={24} color='#444' onPress={toggleTheme} />
        </TouchableHighlight>
      ) : null}
    </View>
  );
}
