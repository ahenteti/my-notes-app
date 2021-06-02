import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { ThemeEnum } from './src/common/services/ThemeEnum';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMemoryScreen from './src/screens/add-memory-screen/AddMemoryScreen';
import { ThemeContext } from './src/common/services/ThemeContext';
import { ThemeStorage } from './src/common/services/ThemeStorage';

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
          {HomeScreen(Stack)}
          <Stack.Screen name='Add Memory' component={AddMemoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContext.Provider>
  );

  function updateThemeStateFromLocalStorage() {
    themeStorage.isDark().then((isDark) => setTheme(isDark ? ThemeEnum.Dark : ThemeEnum.Light));
  }
}
