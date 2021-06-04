import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../../common/models/Color';
import { Memory } from '../../common/models/Memory';
import { Theme } from '../../common/models/Theme';
import { useTheme } from '../../common/services/ThemeContext';
import { MaterialIcons } from '@expo/vector-icons';

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const LABEL_COLOR = new Color('#444', '#EEE');
const VALUE_COLOR = new Color('#777', '#CCC');
const DELETE_BUTTON_BACKGROUND_COLOR = new Color('#e5383b', '#e5383b');
const DELETE_BUTTON_COLOR = new Color('#EEE', '#EEE');

export interface MemoryProps {
  memory: Memory;
  handleDelete: (memory: Memory) => void;
}

export default function MemoryCard({ memory, handleDelete: deleteMemory }: MemoryProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const renderLeftActions = () => {
    return (
      <View style={styles.deleteButtonContainer}>
        <TouchableOpacity activeOpacity={0.6} onPress={() => deleteMemory(memory)}>
          <MaterialIcons style={styles.deleteButton} name='delete-outline' />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Swipeable renderLeftActions={renderLeftActions}>
      <View style={styles.container}>
        <Text style={styles.label}>{memory.label}</Text>
        <Text style={styles.value}>{memory.value}</Text>
      </View>
    </Swipeable>
  );
}

const getStyles = (theme: Theme) => {
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
    deleteButtonContainer: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: -10,
      borderBottomLeftRadius: 3,
      borderTopLeftRadius: 3,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: DELETE_BUTTON_BACKGROUND_COLOR.get(theme),
    },
    deleteButton: {
      color: DELETE_BUTTON_COLOR.get(theme),
      fontSize: 34,
      padding: 10,
    },
  });
};
