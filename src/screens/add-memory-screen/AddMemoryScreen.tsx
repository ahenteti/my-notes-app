import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { HEADER_HEIGHT } from '../../common/Constants';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import AddMemoryScreenHeader from './AddMemoryScreenHeader';

export const ADD_MEMORY_SCREEN_NAME = 'Add Memory';

export function AddMemoryScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <Text>Add Memory Screen</Text>
    </View>
  );
}

export default function AddMemoryScreen(Stack = createStackNavigator(), theme: ThemeEnum) {
  return (
    <Stack.Screen
      name={ADD_MEMORY_SCREEN_NAME}
      component={AddMemoryScreenComponent}
      options={{
        headerTitle: AddMemoryScreenHeader,
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
