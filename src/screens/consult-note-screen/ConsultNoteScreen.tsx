import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StatusBar } from 'react-native';
import SecondaryScreenHeader from '../../common/components/SecondaryScreenHeader';
import { CONSULT_NOTE_SCREEN_NAME, HEADER_HEIGHT } from '../../common/Constants';
import { ConsultNoteForm } from './ConsultNoteForm';

export function ConsultNoteScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <ConsultNoteForm></ConsultNoteForm>
    </View>
  );
}

export default function ConsultNoteScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={CONSULT_NOTE_SCREEN_NAME}
      component={ConsultNoteScreenComponent}
      options={{
        headerTitle: () => <SecondaryScreenHeader name={CONSULT_NOTE_SCREEN_NAME}></SecondaryScreenHeader>,
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
