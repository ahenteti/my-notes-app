import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import MemoryView from './MemoryView';
import { ADD_NOTE_SCREEN_NAME, BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import AddNoteFAB from './AddNoteFAB';
import { useNavigation } from '@react-navigation/native';
import SwipeToDeleteInfo from './SwipeToDeleteInfo';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataRepository } from '../../common/services/AppDataRepository';
import SearchInput from './SearchInput';

interface NotesProps {
  appDataRepository?: AppDataRepository;
}

export default function NotesView({ appDataRepository = AppDataRepository.getInstance() }: NotesProps) {
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
          <SearchInput text={search} onChangeText={onSearchChange} style={{ marginBottom: 15 }}></SearchInput>
          <FlatList
            data={filteredMemories}
            renderItem={({ item, index }) => {
              return <MemoryView style={{ marginBottom: 10 }} memory={item} handleDelete={() => deleteMemory(index)}></MemoryView>;
            }}
          />
          {appData.swipeToDeleteMemoryInfoAlreadyShown ? null : <SwipeToDeleteInfo></SwipeToDeleteInfo>}

          <AddNoteFAB onPress={() => navigation.navigate(ADD_NOTE_SCREEN_NAME)}></AddNoteFAB>
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
