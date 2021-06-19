import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StatusBar } from 'react-native';
import SecondaryScreenHeader from '../../common/components/SecondaryScreenHeader';
import { EDIT_NOTE_SCREEN_NAME, HEADER_HEIGHT } from '../../common/Constants';
import { EditEncryptedNoteForm } from './EditEncryptedNoteForm';
import { EditNotEncryptedNoteForm } from './EditNotEncryptedNoteForm';

export function EditNoteScreenComponent({ route }: any) {
  const { note } = route.params;
  return (
    <View>
      <StatusBar barStyle='default' />
      {note.isEncrypted ? (
        <EditEncryptedNoteForm note={note}></EditEncryptedNoteForm>
      ) : (
        <EditNotEncryptedNoteForm note={note}></EditNotEncryptedNoteForm>
      )}
    </View>
  );
}

export default function EditNoteScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={EDIT_NOTE_SCREEN_NAME}
      component={EditNoteScreenComponent}
      options={{
        headerTitle: () => <SecondaryScreenHeader name={EDIT_NOTE_SCREEN_NAME}></SecondaryScreenHeader>,
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
