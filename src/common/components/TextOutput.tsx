import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View, Text } from 'react-native';
import { PRIMARY_COLOR, TEXT_COLOR } from '../Constants';
import { Color } from '../models/Color';
import { Theme } from '../models/Theme';
import { useAppData } from '../services/AppDataReactContext';

const BACKGROUND_COLOR = new Color('#fff', '#262A2D');

interface TextOutputProps {
  label: string;
  value: string;
  style?: StyleProp<TextStyle>;
}

export default function TextOutput(props: TextOutputProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const [width, setWidth] = useState(33);
  const onLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setWidth(width + 7);
  };
  return (
    <View style={props.style}>
      <View style={styles.labelContainer}>
        <Text onLayout={onLayout} style={styles.label}>
          {props.label}
        </Text>
        <View style={[styles.labelBackground, { width: width }]}></View>
      </View>
      <Text selectable={true} style={styles.value}>
        {props.value}
      </Text>
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    labelContainer: {
      display: 'flex',
      flexDirection: 'row',
      position: 'relative',
    },
    label: {
      fontSize: 10,
      padding: 1,
      borderRadius: 3,
      color: PRIMARY_COLOR.get(theme),
      marginBottom: -7,
      marginLeft: 15,
      zIndex: 100,
    },
    labelBackground: {
      position: 'absolute',
      top: 7,
      left: 12,
      height: 5,
      backgroundColor: BACKGROUND_COLOR.get(theme),
      borderRadius: 3,
    },
    value: {
      fontSize: 18,
      padding: 15,
      borderRadius: 3,
      backgroundColor: BACKGROUND_COLOR.get(theme),
      color: TEXT_COLOR.get(theme),
    },
  });
};
