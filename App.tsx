import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMemoryScreen from './src/screens/add-memory-screen/AddMemoryScreen';
import { Provider as ThemePaperProvider } from 'react-native-paper';
import { DefaultAddData } from './src/common/models/AppData';
import { AppDataContext } from './src/common/services/AppDataContext';
import { AppDataStorage } from './src/common/services/AppDataStorage';

interface AppProps {
  appDataStorage?: AppDataStorage;
}

const Stack = createStackNavigator();

export default function App({ appDataStorage = AppDataStorage.getInstance() }: AppProps) {
  const [appData, setAppData] = React.useState(DefaultAddData);
  useEffect(loadAppDataFromStorage, []);

  return (
    <AppDataContext.Provider value={{ appData, setAppData }}>
      <ThemePaperProvider theme={appData.theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {HomeScreen(Stack)}
            {AddMemoryScreen(Stack)}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemePaperProvider>
    </AppDataContext.Provider>
  );

  function loadAppDataFromStorage() {
    appDataStorage.get().then(setAppData);
  }
}
