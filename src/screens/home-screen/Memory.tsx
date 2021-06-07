import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Dimensions, Animated } from 'react-native';
import { GestureEvent, PanGestureHandler, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CONSULT_MEMORY_SCREEN_NAME } from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Memory } from '../../common/models/Memory';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const BACKGROUND_COLOR_ON_DELETION_STATE = new Color('#EEE', '#1C1F23');
const LABEL_COLOR = new Color('#444', '#EEE');
const VALUE_COLOR = new Color('#777', '#CCC');
const DELETE_BUTTON_BACKGROUND_COLOR = new Color('#e5383b', '#e5383b');
const DELETE_BUTTON_COLOR = new Color('#EEE', '#EEE');

export interface MemoryProps {
  memory: Memory;
  handleDelete: () => void;
}

const ANIMATION_DURATION = 250;
const ANIMATION_DURATION_TO_DELETION_STATE = 300;
const HEIGHT_INIT_VALUE = 75;
const PADDING_INIT_VALUE = 15;
const LABEL_FONT_SIZE_INIT_VALUE = 18;
const VALUE_FONT_SIZE_INIT_VALUE = 13;

export default function MemoryCard({ memory, handleDelete: deleteMemory }: MemoryProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();

  const windowWidth = Dimensions.get('window').width;
  const translateX = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const height = new Animated.Value(HEIGHT_INIT_VALUE);
  const padding = new Animated.Value(PADDING_INIT_VALUE);
  const labelFontSize = new Animated.Value(LABEL_FONT_SIZE_INIT_VALUE);
  const valueFontSize = new Animated.Value(VALUE_FONT_SIZE_INIT_VALUE);
  const backgroundColor = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [BACKGROUND_COLOR_ON_DELETION_STATE.get(appData.theme), BACKGROUND_COLOR.get(appData.theme)],
  });
  let memoryOnDeletionState = false;

  const handleMovement = (event: GestureEvent) => {
    const translationX = event.nativeEvent.translationX as number;
    if (translationX <= 0) return;
    if (translationX < windowWidth * 0.4) {
      translateX.setValue(translationX);
      const percentage = 1 - translationX / windowWidth;
      opacity.setValue(percentage);
      height.setValue(HEIGHT_INIT_VALUE * percentage);
      padding.setValue(PADDING_INIT_VALUE * percentage);
      labelFontSize.setValue(LABEL_FONT_SIZE_INIT_VALUE * percentage);
      valueFontSize.setValue(VALUE_FONT_SIZE_INIT_VALUE * percentage);
    } else {
      memoryOnDeletionState = true;
      animateValueToDeletionState(translateX, windowWidth);
      animateValueToDeletionState(opacity, 0);
      animateValueToDeletionState(height, 0);
      animateValueToDeletionState(padding, 0);
      animateValueToDeletionState(labelFontSize, 0);
      animateValueToDeletionState(valueFontSize, 0);
      setTimeout(deleteMemory, ANIMATION_DURATION_TO_DELETION_STATE);
    }
  };

  const handleEndMovement = () => {
    if (memoryOnDeletionState) return;
    animateValueToInitState(translateX, 0);
    animateValueToInitState(opacity, 1);
    animateValueToInitState(height, HEIGHT_INIT_VALUE);
    animateValueToInitState(padding, PADDING_INIT_VALUE);
    animateValueToInitState(labelFontSize, LABEL_FONT_SIZE_INIT_VALUE);
    animateValueToInitState(valueFontSize, VALUE_FONT_SIZE_INIT_VALUE);
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate(CONSULT_MEMORY_SCREEN_NAME, { memory })}>
      <PanGestureHandler onGestureEvent={handleMovement} onEnded={handleEndMovement}>
        <Animated.View
          style={[
            styles.container,
            { transform: [{ translateX: translateX }], opacity: opacity, backgroundColor: backgroundColor, height: height, padding: padding },
          ]}
        >
          <Animated.Text style={[styles.label, { fontSize: labelFontSize }]}>{memory.label}</Animated.Text>
          <Animated.Text style={[styles.value, { fontSize: valueFontSize }]}>{memory.value}</Animated.Text>
        </Animated.View>
      </PanGestureHandler>
    </TouchableOpacity>
  );
}

const animateValueToDeletionState = (value: Animated.AnimatedValue, toValue: number) => {
  Animated.timing(value, {
    toValue,
    duration: ANIMATION_DURATION_TO_DELETION_STATE,
    useNativeDriver: false,
  }).start();
};

const animateValueToInitState = (value: Animated.AnimatedValue, toValue: number) => {
  Animated.timing(value, {
    toValue,
    duration: ANIMATION_DURATION,
    useNativeDriver: false,
  }).start();
};

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BACKGROUND_COLOR.get(theme),
      padding: PADDING_INIT_VALUE,
      margin: 10,
      marginBottom: 0,
      borderRadius: 3,
      height: 75,
    },
    label: {
      color: LABEL_COLOR.get(theme),
      fontSize: LABEL_FONT_SIZE_INIT_VALUE,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: 4,
    },
    value: {
      color: VALUE_COLOR.get(theme),
      fontSize: VALUE_FONT_SIZE_INIT_VALUE,
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
