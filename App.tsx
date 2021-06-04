import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMemoryScreen from './src/screens/add-memory-screen/AddMemoryScreen';
import { ThemeStorage } from './src/common/services/ThemeStorage';
import { Provider as ThemePaperProvider } from 'react-native-paper';
import { Theme } from './src/common/models/Theme';
import { ThemeContext } from './src/common/services/ThemeContext';

interface AppProps {
  themeStorage?: ThemeStorage;
}

const Stack = createStackNavigator();

export default function App({ themeStorage = ThemeStorage.getInstance() }: AppProps) {
  const [theme, setTheme] = React.useState(Theme.Light);

  useEffect(updateThemeStateFromLocalStorage, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemePaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {HomeScreen(Stack)}
            {AddMemoryScreen(Stack)}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemePaperProvider>
    </ThemeContext.Provider>
  );

  function updateThemeStateFromLocalStorage() {
    themeStorage.isDark().then((isDark) => setTheme(isDark ? Theme.Dark : Theme.Light));
  }
}
