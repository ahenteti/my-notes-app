import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Color } from '../models/Color';
import { Theme } from '../models/Theme';
import { useTheme } from '../services/ThemeContext';
import OptionalInput from './OptionalInput';

interface MandatoryInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

export default function MandatoryInput(props: MandatoryInputProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [focused, setFocused] = useState(false);
  return (
    <>
      <OptionalInput label={props.label} value={props.value} onChange={props.onChange} onFocus={() => setFocused(true)}></OptionalInput>
      <HelperText type='error' visible={props.value == '' && focused} style={styles.helperText}>
        {props.label + ' is mandatory'}
      </HelperText>
    </>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    helperText: {
      color: new Color('#ef233c', '#ef2e55').get(theme),
      marginLeft: -10,
      marginTop: -4,
      fontStyle: 'italic',
    },
  });
};
