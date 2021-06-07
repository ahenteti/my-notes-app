import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StatusBar } from 'react-native';
import SecondaryScreenHeader from '../../common/components/SecondaryScreenHeader';
import { ADD_MEMORY_SCREEN_NAME, HEADER_HEIGHT } from '../../common/Constants';
import { AddMemoryForm } from './AddMemoryForm';

export function AddMemoryScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <AddMemoryForm></AddMemoryForm>
    </View>
  );
}

export default function AddMemoryScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={ADD_MEMORY_SCREEN_NAME}
      component={AddMemoryScreenComponent}
      options={{
        headerTitle: () => <SecondaryScreenHeader name='Add Memory'></SecondaryScreenHeader>,
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
