import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import { HEADER_HEIGHT, HOME_SCREEN_NAME } from '../../common/Constants';
import HomeScreenHeader from './HomeScreenHeader';
import NotesView from './NotesView';
import NoNotesView from './NoNotesView';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataService } from '../../common/services/AppDataService';

interface HomeScreenComponentProps {
  appDataService?: AppDataService;
}

function HomeScreenComponent({ appDataService = AppDataService.getInstance() }: HomeScreenComponentProps) {
  const { appData, setAppData } = useAppData();

  const hide = () => {
    if (appData.memories.length != 1) return;
    const newAppData = { ...appData, swipeToDeleteMemoryInfoAlreadyShown: true };
    setAppData(newAppData);
    appDataService.save(newAppData);
  };

  return (
    <View>
      <StatusBar barStyle='default' />
      <TouchableWithoutFeedback onPress={hide}>
        <View>
          <NotesView></NotesView>
          <NoNotesView></NoNotesView>
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export default function HomeScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={HOME_SCREEN_NAME}
      component={HomeScreenComponent}
      options={{
        headerTitle: HomeScreenHeader,
        headerStyle: {
          height: HEADER_HEIGHT,
        },
        headerTitleContainerStyle: {
          left: 0,
          right: 0,
        },
      }}
    />
  );
}
