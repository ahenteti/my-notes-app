import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export interface MemoryProps {
  id: string;
  label: string;
  value: string;
}

export default function Memory(props: { memory: MemoryProps }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.memory.label}</Text>
      <Text style={styles.value}>{props.memory.value}</Text>
    </View>
  );
}

export const renderMemory = ({ item }: { item: MemoryProps }) => <Memory memory={item}></Memory>;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    padding: 15,
    margin: 10,
    marginBottom: 2,
    borderRadius: 3,
  },
  label: {
    color: '#444',
    fontSize: 18,
    fontFamily: 'Roboto',
    fontWeight: 'bold',
    paddingBottom: 4,
  },
  value: {
    color: '#777',
    fontSize: 13,
    fontFamily: 'Roboto',
  },
});
