import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { HEADER_HEIGHT, HOME_SCREEN_NAME } from '../../common/Constants';
import HomeScreenHeader from './HomeScreenHeader';
import MemoriesView from './MemoriesView';
import NoMemoriesView from './NoMemoriesView';

function HomeScreenComponent() {
  return (
    <View>
      <StatusBar barStyle='default' />
      <MemoriesView></MemoriesView>
      <NoMemoriesView></NoMemoriesView>
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
