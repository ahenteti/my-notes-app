import React from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { MemoryProps, renderMemory } from './Memory';
import { useTheme } from '../../common/services/ThemeContext';
import { BODY_BACKGROUND_COLOR } from '../../common/Constants';

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
      backgroundColor: BODY_BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      paddingBottom: 10,
    },
  });
};
