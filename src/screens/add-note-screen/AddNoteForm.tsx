import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { Button, Switch } from 'react-native-paper';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import MandatoryTextInput from '../../common/components/MandatoryTextInput';
import { BODY_BACKGROUND_COLOR, HOME_SCREEN_NAME, TEXT_COLOR } from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataRepository } from '../../common/services/AppDataRepository';
import { EncryptionService } from '../../common/services/EncryptionService';

const CANCEL_BUTTON_BACKGROUND_COLOR = new Color('#fff', '#262A2D');
const CANCEL_BUTTON_COLOR = new Color('#555', '#EEE');

interface AddNoteFormProps {
  appDataRepository?: AppDataRepository;
  encryptionService?: EncryptionService;
}

export function AddNoteForm({
  appDataRepository = AppDataRepository.getInstance(),
  encryptionService = EncryptionService.getInstance(),
}: AddNoteFormProps) {
  const navigation = useNavigation();
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const [label, setLabel] = React.useState('');
  const [value, setValue] = React.useState('');
  const [encryptValue, setEncryptValue] = React.useState(false);
  const [salt, setSalt] = React.useState('');
  const toggleEncryptValue = () => setEncryptValue(!encryptValue);
  const saveButtonIsDisabled = () => (encryptValue ? !label || !value || !salt : !label || !value);
  const handleSaveButtonClickEvent = () => {
    const memories = [...appData.memories];
    const id = Date.now() + '';
    const updatedValue = encryptValue ? encryptionService.encrypt(salt, value) : value;
    memories.unshift({ id, label, value: updatedValue, isEncrypted: encryptValue });
    const newAppData = { ...appData, memories };
    setAppData(newAppData);
    appDataRepository.save(newAppData);
    navigation.navigate(HOME_SCREEN_NAME);
  };
  return (
    <TouchableWithDismissKeyboardCapability>
      <ScrollView style={styles.container}>
        <MandatoryTextInput style={styles.inputContainer} label='Label' value={label} onChange={setLabel}></MandatoryTextInput>
        <MandatoryTextInput style={styles.inputContainer} label='Value' value={value} onChange={setValue} multiline={true}></MandatoryTextInput>
        <View style={styles.encryptValueContainer}>
          <Text style={styles.encryptValueLabel}>Encrypt Value</Text>
          <Switch value={encryptValue} onValueChange={toggleEncryptValue} />
        </View>
        {encryptValue ? <MandatoryTextInput style={styles.inputContainer} label='Salt' value={salt} onChange={setSalt}></MandatoryTextInput> : null}
        <View style={styles.buttonsContainer}>
          <Button style={styles.saveButton} mode='contained' disabled={saveButtonIsDisabled()} onPress={handleSaveButtonClickEvent}>
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
      </ScrollView>
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
    encryptValueContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 15,
    },
    encryptValueLabel: {
      color: TEXT_COLOR.get(theme),
      fontSize: 14,
    },
    buttonsContainer: {
      marginTop: 40,
      display: 'flex',
      flexDirection: 'row-reverse',
    },
    saveButton: {
      marginLeft: 15,
    },
  });
};
