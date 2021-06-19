import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import HomeScreen from './src/screens/home-screen/HomeScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AddNoteScreen from './src/screens/add-note-screen/AddNoteScreen';
import ConsultNoteScreen from './src/screens/consult-note-screen/ConsultNoteScreen';
import { Provider as ThemePaperProvider } from 'react-native-paper';
import { DefaultAddData } from './src/common/models/AppData';
import { AppDataReactContext } from './src/common/services/AppDataReactContext';
import { AppDataService } from './src/common/services/AppDataService';
import LoadingScreen from './src/common/components/LoadingScreen';
import EditNoteScreen from './src/screens/edit-note-screen/EditNoteScreen';

interface AppProps {
  appDataService?: AppDataService;
}

const Stack = createStackNavigator();

export default function App({ appDataService = AppDataService.getInstance() }: AppProps) {
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
            {AddNoteScreen(Stack)}
            {ConsultNoteScreen(Stack)}
            {EditNoteScreen(Stack)}
          </Stack.Navigator>
        </NavigationContainer>
      </ThemePaperProvider>
    </AppDataReactContext.Provider>
  );

  function loadAppDataFromStorage() {
    appDataService.load().then((res) => {
      setAppData(res);
      setTimeout(() => {
        setLoading(false);
      }, 1500 - (new Date().getTime() - loadingDate.getTime()));
    });
  }
}
