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
import { ToastService } from '../../common/services/ToastService';

interface NotesProps {
  appDataRepository?: AppDataRepository;
  toastService?: ToastService;
}

export default function NotesView({ appDataRepository = AppDataRepository.getInstance(), toastService = ToastService.getInstance() }: NotesProps) {
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

  const deleteMemory = (index: number) => {
    const memories = [...appData.memories];
    memories.splice(index, 1);
    const newAppData = { ...appData, memories, swipeToDeleteMemoryInfoAlreadyShown: true };
    setAppData(newAppData);
    appDataRepository
      .save(newAppData)
      .then(() => toastService.show('Your note has been deleted successfully'))
      .catch(() => toastService.show('Error while deleting your note :( please try again'));
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
          {appData.swipeToDeleteMemoryInfoAlreadyShown || appData.memories.length != 1 ? null : <SwipeToDeleteInfo></SwipeToDeleteInfo>}

          <AddNoteFAB onPress={() => navigation.navigate(ADD_NOTE_SCREEN_NAME)}></AddNoteFAB>
        </SafeAreaView>
      )}
    </View>
  );
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
