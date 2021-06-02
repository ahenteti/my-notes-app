import React, { useEffect } from 'react';
import { StatusBar, View } from 'react-native';
import HomeScreen from './src/components/screens/HomeScreen';
import { ThemeContext } from './src/services/ThemeContext';
import { ThemeEnum } from './src/services/ThemeEnum';
import { ThemeStorage } from './src/services/ThemeStorage';

interface AppProps {
  themeStorage?: ThemeStorage;
}

export default function App({ themeStorage = ThemeStorage.getInstance() }: AppProps) {
  const [theme, setTheme] = React.useState(ThemeEnum.Light);

  useEffect(updateThemeStateFromLocalStorage, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <View>
        <StatusBar barStyle='default' />
        <HomeScreen></HomeScreen>
      </View>
    </ThemeContext.Provider>
  );

  function updateThemeStateFromLocalStorage() {
    themeStorage.isDark().then((isDark) => setTheme(isDark ? ThemeEnum.Dark : ThemeEnum.Light));
  }
}
