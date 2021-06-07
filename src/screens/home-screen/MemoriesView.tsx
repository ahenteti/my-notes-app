import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import MemoryView from './MemoryView';
import { ADD_MEMORY_SCREEN_NAME, BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import AddMemoryButton from './AddMemoryButton';
import { useNavigation } from '@react-navigation/native';
import SwipeToDeleteInfo from './SwipeToDeleteInfo';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataRepository } from '../../common/services/AppDataRepository';
import SearchMemoriesInput from './SearchMemoriesInput';

interface MemoriesProps {
  appDataRepository?: AppDataRepository;
}

export default function MemoriesView({ appDataRepository = AppDataRepository.getInstance() }: MemoriesProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const [filteredMemories, setFilteredMemories] = useState([...appData.memories]);
  useEffect(() => setFilteredMemories([...appData.memories]), [appData]);
  const onSearchChange = (text: string) => {
    setSearch(text);
    setFilteredMemories(text ? appData.memories.filter((memory) => memory.label.toLowerCase().includes(text.toLowerCase())) : [...appData.memories]);
  };

  return (
    <View>
      {appData.memories.length == 0 ? null : (
        <SafeAreaView style={styles.container}>
          <SearchMemoriesInput text={search} onChangeText={onSearchChange} style={{ marginBottom: 15 }}></SearchMemoriesInput>
          <FlatList
            data={filteredMemories}
            renderItem={({ item, index }) => {
              return <MemoryView style={{ marginBottom: 10 }} memory={item} handleDelete={() => deleteMemory(index)}></MemoryView>;
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
      padding: 15,
      paddingBottom: 10,
    },
  });
};
