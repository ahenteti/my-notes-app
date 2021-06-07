import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StatusBar } from 'react-native';
import SecondaryScreenHeader from '../../common/components/SecondaryScreenHeader';
import { ADD_NOTE_SCREEN_NAME, HEADER_HEIGHT } from '../../common/Constants';
import { AddNoteForm } from './AddNoteForm';

export function AddNoteScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <AddNoteForm></AddNoteForm>
    </View>
  );
}

export default function AddNoteScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={ADD_NOTE_SCREEN_NAME}
      component={AddNoteScreenComponent}
      options={{
        headerTitle: () => <SecondaryScreenHeader name='Add Note'></SecondaryScreenHeader>,
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
