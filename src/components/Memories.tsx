import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ThemeEnum } from '../services/ThemeEnum';
import { Color } from '../services/Color';
import { MemoryProps, renderMemory } from './Memory';
import { useTheme } from '../services/ThemeContext';

export default function Memory(props: { memories: MemoryProps[] }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={props.memories} renderItem={renderMemory} />
    </SafeAreaView>
  );
}

const getStyles = (theme: ThemeEnum) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      paddingBottom: 125, // inspiration: https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue
    },
  });
};

const BACKGROUND_COLOR = new Color('#EEE', '#1C1F23');
