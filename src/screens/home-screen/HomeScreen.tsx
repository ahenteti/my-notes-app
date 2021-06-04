import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { StatusBar, View } from 'react-native';
import { ADD_MEMORY_SCREEN_NAME, HEADER_HEIGHT, HOME_SCREEN_NAME } from '../../common/Constants';
import AddMemoryButton from './AddMemoryButton';
import HomeScreenHeader from './HomeScreenHeader';
import Memories from './Memories';

const DATA = [
  {
    id: '1',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '2',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '3',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '10',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '20',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '30',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
  {
    id: '100',
    label: 'Rzfal',
    value: 'EW1gd1%&Vo7a5<f628',
  },
  {
    id: '200',
    label: 'WlfEC',
    value: '7mBde7K4(55@5NnRgB4#-',
  },
  {
    id: '300',
    label: 'WBF',
    value: 'Z$r5)+@6P34kZDd65I5ED',
  },
];

function HomeScreenComponent({ navigation }: any) {
  return (
    <View>
      <StatusBar barStyle='default' />
      <Memories memories={DATA}></Memories>
      <AddMemoryButton onPress={() => navigation.navigate(ADD_MEMORY_SCREEN_NAME)}></AddMemoryButton>
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
