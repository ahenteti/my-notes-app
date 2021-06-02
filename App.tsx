import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { ThemeContext } from './src/common/services/ThemeContext';
import { ThemeEnum } from './src/common/services/ThemeEnum';
import { ThemeStorage } from './src/common/services/ThemeStorage';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMemoryScreen from './src/screens/add-memory-screen/AddMemoryScreen';
import { HOME_SCREEN_HEADER_OPTIONS } from './src/screens/home-screen/HomeScreenHeader';

interface AppProps {
  themeStorage?: ThemeStorage;
}

const Stack = createStackNavigator();

export default function App({ themeStorage = ThemeStorage.getInstance() }: AppProps) {
  const [theme, setTheme] = React.useState(ThemeEnum.Light);

  useEffect(updateThemeStateFromLocalStorage, []);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name='Home' component={HomeScreen} options={HOME_SCREEN_HEADER_OPTIONS} />
          <Stack.Screen name='Add Memory' component={AddMemoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );

  function updateThemeStateFromLocalStorage() {
    themeStorage.isDark().then((isDark) => setTheme(isDark ? ThemeEnum.Dark : ThemeEnum.Light));
  }
}
