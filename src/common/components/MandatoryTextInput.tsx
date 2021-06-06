import React, { useState } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import { HelperText } from 'react-native-paper';
import { Color } from '../models/Color';
import { Theme } from '../models/Theme';
import { useAppData } from '../services/AppDataContext';
import TextInput from './TextInput';

interface MandatoryTextInputProps {
  label: string;
  value: string;
  onChange: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

export default function MandatoryTextInput(props: MandatoryTextInputProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const [focused, setFocused] = useState(false);
  return (
    <View style={props.style}>
      <TextInput label={props.label} value={props.value} onChange={props.onChange} onFocus={() => setFocused(true)}></TextInput>
      <HelperText type='error' visible={props.value == '' && focused} style={styles.helperText}>
        {props.label + ' is mandatory'}
      </HelperText>
    </View>
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
