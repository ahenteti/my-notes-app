import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { DismissKeyboard } from '../../common/components/DismissKeyborad';
import StringInput from '../../common/components/StringInput';
import { BODY_BACKGROUND_COLOR } from '../../common/Constants';
import { useTheme } from '../../common/services/ThemeContext';
import { ThemeEnum } from '../../common/services/ThemeEnum';

export function AddMemoryForm() {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  const [label, setLabel] = React.useState('');
  const [value, setValue] = React.useState('');
  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <StringInput style={styles.input} label='Label' value={label} onChange={setLabel}></StringInput>
        <StringInput style={styles.input} label='Value' value={value} onChange={setValue}></StringInput>

        <View style={styles.buttonsContainer}>
          <Button style={styles.saveButton} mode='contained' onPress={() => {}}>
            {' ' + 'Save' + ' '}
          </Button>
          <Button mode='outlined' onPress={() => {}}>
            Cancel
          </Button>
        </View>
      </View>
    </DismissKeyboard>
  );
}

const getStyles = (theme: ThemeEnum) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BODY_BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      padding: 20,
    },
    input: {
      marginBottom: 10,
    },
    buttonsContainer: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    saveButton: {
      marginLeft: 20,
    },
  });
};
