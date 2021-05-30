import React from 'react';
import { StyleSheet, FlatList, ScrollView, SafeAreaView } from 'react-native';
import { MemoryProps, renderMemory } from './Memory';

interface MemoriesProps {
  memories: MemoryProps[];
}

export default function Memory(props: { memories: MemoryProps[] }) {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList data={props.memories} renderItem={renderMemory} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEE',
    minHeight: '100%',
    // inspiration: https://stackoverflow.com/questions/46196242/react-native-flatlist-last-item-visibility-issue
    paddingBottom: 125,
  },
});
