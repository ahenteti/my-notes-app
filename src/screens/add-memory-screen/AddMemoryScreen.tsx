import React from 'react';
import { View, Text, Button } from 'react-native';
import { HOME_SCREEN_NAME } from '../home-screen/HomeScreen';

interface AddMemoryScreenProps {
  navigation: any;
}

export const ADD_MEMORY_SCREEN_NAME = 'Add Memory';

export default function AddMemoryScreen({ navigation }: AddMemoryScreenProps) {
  return (
    <View>
      <Text>Add Memory Screen</Text>
      <Button title='Go to HomeScreen' onPress={() => navigation.navigate(HOME_SCREEN_NAME)} />
    </View>
  );
}
