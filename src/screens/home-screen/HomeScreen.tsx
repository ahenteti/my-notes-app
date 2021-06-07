import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { HEADER_HEIGHT, HOME_SCREEN_NAME } from '../../common/Constants';
import HomeScreenHeader from './HomeScreenHeader';
import NotesView from './NotesView';
import NoNotesView from './NoNotesView';

function HomeScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <NotesView></NotesView>
      <NoNotesView></NoNotesView>
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
