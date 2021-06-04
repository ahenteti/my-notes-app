import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import MemoryCard from './Memory';
import { useTheme } from '../../common/services/ThemeContext';
import { BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { MemoryStorage } from '../../common/services/MemoryStorage';
import { useMemories } from '../../common/services/MemoriesContext';

interface MemoriesProps {
  memoryStorage?: MemoryStorage;
}

export default function Memories({ memoryStorage = MemoryStorage.getInstance() }: MemoriesProps) {
  const { memories, setMemories } = useMemories();
  const { theme } = useTheme();
  const styles = getStyles(theme);

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

  function deleteMemory(index: number) {
    const newMemories = [...memories];
    newMemories.splice(index, 1);
    setMemories(newMemories);
    memoryStorage.save(newMemories);
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
