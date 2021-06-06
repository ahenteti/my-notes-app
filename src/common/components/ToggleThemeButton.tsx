import React from 'react';
import { View } from 'react-native';
import { Theme } from '../models/Theme';
import { useAppData } from '../services/AppDataReactContext';
import { AppDataRepository } from '../services/AppDataRepository';
import IconButton, { IconButtonType } from './IconButton';

interface ToggleThemeButtonProps {
  appDataRepository?: AppDataRepository;
}

export default function ToggleThemeButton({ appDataRepository = AppDataRepository.getInstance() }: ToggleThemeButtonProps) {
  const { appData, setAppData } = useAppData();
  const toggleTheme = () => {
    const theme = appData.theme.dark ? Theme.Light : Theme.Dark;
    const newAppData = { ...appData, theme };
    setAppData(newAppData);
    appDataRepository.save(newAppData);
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
