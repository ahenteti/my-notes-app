import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StatusBar } from 'react-native';
import SecondaryScreenHeader from '../../common/components/SecondaryScreenHeader';
import { CONSULT_MEMORY_SCREEN_NAME, HEADER_HEIGHT } from '../../common/Constants';
import { ConsultMemoryForm } from './ConsultMemoryForm';

export function ConsultMemoryScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <ConsultMemoryForm></ConsultMemoryForm>
    </View>
  );
}

export default function ConsultMemoryScreen(Stack = createStackNavigator()) {
  return (
    <Stack.Screen
      name={CONSULT_MEMORY_SCREEN_NAME}
      component={ConsultMemoryScreenComponent}
      options={{
        headerTitle: () => <SecondaryScreenHeader name='Consult Memory'></SecondaryScreenHeader>,
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
