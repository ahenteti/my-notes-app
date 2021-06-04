import React, { useEffect, useState } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import MemoryCard from './Memory';
import { useTheme } from '../../common/services/ThemeContext';
import { BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { MemoryStorage } from '../../common/services/MemoryStorage';
import { Memory } from '../../common/models/Memory';
import { useNavigation } from '@react-navigation/native';

interface MemoriesProps {
  memoryStorage?: MemoryStorage;
}

export default function Memories({ memoryStorage = MemoryStorage.getInstance() }: MemoriesProps) {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);
  const [memories, setMemories] = useState<Memory[]>([]);
  useEffect(updateMemoriesStateFromLocalStorage, []);
  useEffect(() => {
    return navigation.addListener('focus', updateMemoriesStateFromLocalStorage);
  }, [navigation]);

  const deleteMemory = (index: number) => {
    const newMemories = [...memories];
    newMemories.splice(index, 1);
    setMemories(newMemories);
    memoryStorage.save(newMemories);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={memories}
        renderItem={({ item, index }) => {
          return <MemoryCard memory={item} handleDelete={() => deleteMemory(index)}></MemoryCard>;
        }}
      />
    </SafeAreaView>
  );

  function updateMemoriesStateFromLocalStorage() {
    memoryStorage.getAll().then((memories) => setMemories(memories));
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
