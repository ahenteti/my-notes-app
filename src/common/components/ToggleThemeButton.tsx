import React from 'react';
import { View } from 'react-native';
import { Theme } from '../models/Theme';
import { useAppData } from '../services/AppDataContext';
import { AppDataStorage } from '../services/AppDataStorage';
import IconButton, { IconButtonType } from './IconButton';

interface ToggleThemeButtonProps {
  appDataStorage?: AppDataStorage;
}

export default function ToggleThemeButton({ appDataStorage = AppDataStorage.getInstance() }: ToggleThemeButtonProps) {
  const { appData, setAppData } = useAppData();
  const toggleTheme = () => {
    const theme = appData.theme.dark ? Theme.Light : Theme.Dark;
    const newAppData = { ...appData, theme };
    setAppData(newAppData);
    appDataStorage.save(newAppData);
  };

  return (
    <View>
      {appData.theme.dark ? (
        <IconButton type={IconButtonType.Feather} name='sun' onPress={toggleTheme} />
      ) : (
        <IconButton type={IconButtonType.Feather} name='moon' onPress={toggleTheme} />
      )}
    </View>
  );
}
