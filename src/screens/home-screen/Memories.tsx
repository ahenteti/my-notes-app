import React from 'react';
import { StyleSheet, FlatList, SafeAreaView, View } from 'react-native';
import MemoryCard from './Memory';
import { useTheme } from '../../common/services/ThemeContext';
import { ADD_MEMORY_SCREEN_NAME, BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { MemoryStorage } from '../../common/services/MemoryStorage';
import { useMemories } from '../../common/services/MemoriesContext';
import { Color } from '../../common/models/Color';
import AddMemoryButton from './AddMemoryButton';
import { useNavigation } from '@react-navigation/native';

interface MemoriesProps {
  memoryStorage?: MemoryStorage;
}

export default function Memories({ memoryStorage = MemoryStorage.getInstance() }: MemoriesProps) {
  const { memories, setMemories } = useMemories();
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const navigation = useNavigation();

  return (
    <View>
      {memories.length == 0 ? null : (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={memories}
            renderItem={({ item, index }) => {
              return <MemoryCard memory={item} handleDelete={() => deleteMemory(index)}></MemoryCard>;
            }}
          />
          <AddMemoryButton onPress={() => navigation.navigate(ADD_MEMORY_SCREEN_NAME)}></AddMemoryButton>
        </SafeAreaView>
      )}
    </View>
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
    noMemories: {
      marginTop: -30,
      display: 'flex',
      minHeight: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    noMemoriesLabel: {
      paddingBottom: 20,
      fontSize: 22,
      fontWeight: '100',
      color: new Color('#333', '#EEE').get(theme),
    },
  });
};
