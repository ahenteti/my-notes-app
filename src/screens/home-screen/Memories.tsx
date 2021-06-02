import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { Color } from '../../common/services/Color';
import { MemoryProps, renderMemory } from './Memory';
import { useTheme } from '../../common/services/ThemeContext';

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
      paddingBottom: 10,
    },
  });
};

const BACKGROUND_COLOR = new Color('#EEE', '#1C1F23');
