import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, View, Text } from 'react-native';
import MemoryCard from './Memory';
import { ADD_MEMORY_SCREEN_NAME, BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import AddMemoryButton from './AddMemoryButton';
import { useNavigation } from '@react-navigation/native';
import SwipeToDeleteInfo from './SwipeToDeleteInfo';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataRepository } from '../../common/services/AppDataRepository';

interface MemoriesProps {
  appDataRepository?: AppDataRepository;
}

export default function Memories({ appDataRepository = AppDataRepository.getInstance() }: MemoriesProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();

  return (
    <View>
      {appData.memories.length == 0 ? null : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={appData.memories}
            renderItem={({ item, index }) => {
              return <MemoryCard memory={item} handleDelete={() => deleteMemory(index)}></MemoryCard>;
            }}
          />
          {appData.swipeToDeleteMemoryInfoAlreadyShown ? null : <SwipeToDeleteInfo></SwipeToDeleteInfo>}

          <AddMemoryButton onPress={() => navigation.navigate(ADD_MEMORY_SCREEN_NAME)}></AddMemoryButton>
        </SafeAreaView>
      )}
    </View>
  );

  function deleteMemory(index: number) {
    const memories = [...appData.memories];
    memories.splice(index, 1);
    const newAppData = { ...appData, memories, swipeToDeleteMemoryInfoAlreadyShown: true };
    setAppData(newAppData);
    appDataRepository.save(newAppData);
  }
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BODY_BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      paddingBottom: 10,
    },
  });
};
