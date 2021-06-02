import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { Color } from '../../common/services/Color';
import { useTheme } from '../../common/services/ThemeContext';

export interface MemoryProps {
  id: string;
  label: string;
  value: string;
}

export default function Memory(props: { memory: MemoryProps }) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.memory.label}</Text>
      <Text style={styles.value}>{props.memory.value}</Text>
    </View>
  );
}

export const renderMemory = ({ item }: { item: MemoryProps }) => <Memory memory={item}></Memory>;

const getStyles = (theme: ThemeEnum) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BACKGROUND_COLOR.get(theme),
      padding: 15,
      margin: 10,
      marginBottom: 0,
      borderRadius: 3,
    },
    label: {
      color: LABEL_COLOR.get(theme),
      fontSize: 18,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: 4,
    },
    value: {
      color: VALUE_COLOR.get(theme),
      fontSize: 13,
      fontFamily: 'Roboto',
    },
  });
};

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const LABEL_COLOR = new Color('#444', '#EEE');
const VALUE_COLOR = new Color('#777', '#CCC');
