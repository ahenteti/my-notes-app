import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddMemoryScreen from './src/screens/add-memory-screen/AddMemoryScreen';
import ConsultMemoryScreen from './src/screens/consult-memory-screen/ConsultMemoryScreen';
import { Provider as ThemePaperProvider } from 'react-native-paper';
import { DefaultAddData } from './src/common/models/AppData';
import { AppDataReactContext } from './src/common/services/AppDataReactContext';
import { AppDataRepository } from './src/common/services/AppDataRepository';
import LoadingScreen from './src/common/components/LoadingScreen';

interface AppProps {
  appDataRepository?: AppDataRepository;
}

const Stack = createStackNavigator();

export default function App({ appDataRepository = AppDataRepository.getInstance() }: AppProps) {
  const [appData, setAppData] = React.useState(DefaultAddData);
  const [loading, setLoading] = React.useState(true);
  const [loadingDate, setLoadingDate] = React.useState(new Date());
  useEffect(loadAppDataFromStorage, []);

  if (loading) {
    return <LoadingScreen></LoadingScreen>;
  }
  return (
    <AppDataReactContext.Provider value={{ appData, setAppData }}>
      <ThemePaperProvider theme={appData.theme}>
        <NavigationContainer>
          <Stack.Navigator>
            {HomeScreen(Stack)}
            {AddMemoryScreen(Stack)}
            {ConsultMemoryScreen(Stack)}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemePaperProvider>
    </AppDataReactContext.Provider>
  );

  function loadAppDataFromStorage() {
    appDataRepository.load().then((res) => {
      setAppData(res);
      setTimeout(() => {
        setLoading(false);
      }, 1500 - (new Date().getTime() - loadingDate.getTime()));
    });
  }
}
