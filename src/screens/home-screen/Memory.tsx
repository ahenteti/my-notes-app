import React from 'react';
import { Text, StyleSheet, Dimensions, Animated } from 'react-native';
import { GestureEvent, PanGestureHandler } from 'react-native-gesture-handler';
import { Color } from '../../common/models/Color';
import { Memory } from '../../common/models/Memory';
import { Theme } from '../../common/models/Theme';
import { useTheme } from '../../common/services/ThemeContext';

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const LABEL_COLOR = new Color('#444', '#EEE');
const VALUE_COLOR = new Color('#777', '#CCC');
const DELETE_BUTTON_BACKGROUND_COLOR = new Color('#e5383b', '#e5383b');
const DELETE_BUTTON_COLOR = new Color('#EEE', '#EEE');

export interface MemoryProps {
  memory: Memory;
  handleDelete: () => void;
}

const ANIMATION_DURATION = 250;

export default function MemoryCard({ memory, handleDelete: deleteMemory }: MemoryProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  const windowWidth = Dimensions.get('window').width;
  const translateX = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  let memoryToDelete = false;

  const handleMovement = (event: GestureEvent) => {
    const translationX = event.nativeEvent.translationX as number;
    if (translationX <= 0) return;
    if (translationX < windowWidth * 0.5) {
      translateX.setValue(translationX);
      opacity.setValue(1 - translationX / windowWidth);
    } else {
      memoryToDelete = true;
      Animated.timing(translateX, {
        toValue: windowWidth,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION_DURATION,
        useNativeDriver: true,
      }).start();
      setTimeout(deleteMemory, ANIMATION_DURATION);
    }
  };

  const handleEndMovement = () => {
    if (memoryToDelete) return;
    Animated.timing(translateX, {
      toValue: 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
    Animated.timing(opacity, {
      toValue: 1,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  return (
    <PanGestureHandler onGestureEvent={handleMovement} onEnded={handleEndMovement}>
      <Animated.View style={[styles.container, { transform: [{ translateX: translateX }], opacity: opacity }]}>
        <Text style={styles.label}>{memory.label}</Text>
        <Text style={styles.value}>{memory.value}</Text>
      </Animated.View>
    </PanGestureHandler>
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
