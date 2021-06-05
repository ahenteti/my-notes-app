import React from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { TextInput as PaperInput } from 'react-native-paper';
import { PRIMARY_COLOR } from '../Constants';
import { Color } from '../models/Color';
import { Theme } from '../models/Theme';
import { useTheme } from '../services/ThemeContext';

interface TextInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  onFocus?: () => void;
  style?: StyleProp<TextStyle>;
}

const TEXT_COLOR = new Color('#333', '#EEE');
const PLACEHOLDER_COLOR = new Color('#1e96fc', '#1e96fc');
const PLACEHOLDER_COLOR_ON_EMPTY_INPUT = new Color('#555', '#AAA');
const BACKGROUND_COLOR = new Color('#fff', '#262A2D');

export default function TextInput(props: TextInputProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <PaperInput
      style={[props.style, styles.input]}
      theme={{
        colors: {
          primary: PRIMARY_COLOR.get(theme),
          text: TEXT_COLOR.get(theme),
          placeholder: props.value == '' ? PLACEHOLDER_COLOR_ON_EMPTY_INPUT.get(theme) : PLACEHOLDER_COLOR.get(theme),
        },
      }}
      onFocus={props.onFocus}
      selectionColor={PRIMARY_COLOR.get(theme)}
      outlineColor={'transparent'}
      mode='outlined'
      label={props.label}
      value={props.value}
      onChangeText={props.onChange}
    />
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    input: {
      backgroundColor: BACKGROUND_COLOR.get(theme),
      color: TEXT_COLOR.get(theme),
    },
  });
};
