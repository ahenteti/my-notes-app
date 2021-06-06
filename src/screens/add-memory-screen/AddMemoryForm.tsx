import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import MandatoryTextInput from '../../common/components/MandatoryTextInput';
import { BODY_BACKGROUND_COLOR, HOME_SCREEN_NAME } from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataContext';
import { AppDataStorage } from '../../common/services/AppDataStorage';

const CANCEL_BUTTON_BACKGROUND_COLOR = new Color('#fff', '#262A2D');
const CANCEL_BUTTON_COLOR = new Color('#555', '#EEE');

interface AddMemoryFormProps {
  appDataStorage?: AppDataStorage;
}

export function AddMemoryForm({ appDataStorage = AppDataStorage.getInstance() }: AddMemoryFormProps) {
  const navigation = useNavigation();
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const [label, setLabel] = React.useState('');
  const [value, setValue] = React.useState('');
  return (
    <TouchableWithDismissKeyboardCapability>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <MandatoryTextInput label='Label' value={label} onChange={setLabel}></MandatoryTextInput>
        </View>
        <View style={styles.inputContainer}>
          <MandatoryTextInput label='Value' value={value} onChange={setValue}></MandatoryTextInput>
        </View>

        <View style={styles.buttonsContainer}>
          <Button
            style={styles.saveButton}
            mode='contained'
            disabled={!label || !value}
            onPress={() => {
              const memories = [...appData.memories];
              memories.unshift({ id: Date.now() + '', label, value });
              const newAppData = { ...appData, memories };
              setAppData(newAppData);
              appDataStorage.save(newAppData);
              navigation.navigate(HOME_SCREEN_NAME);
            }}
          >
            {'  Save  '}
          </Button>
          <Button
            mode='contained'
            labelStyle={{ color: CANCEL_BUTTON_COLOR.get(appData.theme) }}
            color={CANCEL_BUTTON_BACKGROUND_COLOR.get(appData.theme)}
            onPress={() => navigation.navigate(HOME_SCREEN_NAME)}
          >
            Cancel
          </Button>
        </View>
      </View>
    </TouchableWithDismissKeyboardCapability>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BODY_BACKGROUND_COLOR.get(theme),
      minHeight: '100%',
      padding: 20,
    },
    inputContainer: {
      marginBottom: -3,
    },
    buttonsContainer: {
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    saveButton: {
      marginLeft: 15,
    },
  });
};
