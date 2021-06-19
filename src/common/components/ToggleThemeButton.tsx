import React from 'react';
import { View } from 'react-native';
import { useAppData } from '../services/AppDataReactContext';
import { AppDataService } from '../services/AppDataService';
import IconButton, { IconButtonType } from './IconButton';

interface ToggleThemeButtonProps {
  appDataService?: AppDataService;
}

export default function ToggleThemeButton({ appDataService = AppDataService.getInstance() }: ToggleThemeButtonProps) {
  const { appData, setAppData } = useAppData();
  const toggleTheme = () => appDataService.toggleTheme(appData, setAppData);

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
