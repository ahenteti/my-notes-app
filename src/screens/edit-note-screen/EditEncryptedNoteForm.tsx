import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MandatoryTextInput from '../../common/components/MandatoryTextInput';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import { BODY_BACKGROUND_COLOR, HOME_SCREEN_NAME, TEXT_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataService } from '../../common/services/AppDataService';
import { EncryptionService } from '../../common/services/EncryptionService';
import { ToastService } from '../../common/services/ToastService';
import { Button, Switch } from 'react-native-paper';
import { Color } from '../../common/models/Color';
import { Note } from '../../common/models/Note';
import TextOutput from '../../common/components/TextOutput';
import TextInput from '../../common/components/TextInput';

interface EditEncryptedNoteFormProps {
  note: Note;
  appDataService?: AppDataService;
  encryptionService?: EncryptionService;
  toastService?: ToastService;
}

const CANCEL_BUTTON_BACKGROUND_COLOR = new Color('#fff', '#262A2D');
const CANCEL_BUTTON_COLOR = new Color('#555', '#EEE');

export function EditEncryptedNoteForm({
  note,
  appDataService = AppDataService.getInstance(),
  encryptionService = EncryptionService.getInstance(),
}: EditEncryptedNoteFormProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  const [decryptValueState, setDecryptValueState] = React.useState(true);
  const [label, setLabel] = React.useState(note.label);
  const [value, setValue] = React.useState(note.value);
  const [encryptValue, setEncryptValue] = React.useState(note.isEncrypted);
  const [encryptionKey, setEncryptionKey] = React.useState('');
  const toggleEncryptValue = () => setEncryptValue(!encryptValue);
  const isUpdateButtonDisabled = () => (encryptValue ? !label || !value || !encryptionKey : !label || !value);
  const onEncryptionKeyInputChangeEvent = (text: string) => {
    setEncryptionKey(text);
    setValue(encryptionService.decrypt(text, note.value));
  };
  const onUpdateButtonClickEvent = () => {
    appDataService.updateNote({ id: note.id, label, value, encryptionKey, encryptValue, appData, setAppData });
    navigation.navigate(HOME_SCREEN_NAME);
  };
  return (
    <TouchableWithDismissKeyboardCapability>
      {decryptValueState ? (
        <ScrollView style={styles.container}>
          <Text style={styles.decryptNoteValueText}>First, provide your encryption key to decrypt your note value</Text>
          <TextOutput label={encryptionKey ? 'Value' : 'Encrypted Value'} value={value}></TextOutput>
          <TextInput
            style={styles.encryptionKeyInput}
            label='Encryption Key'
            value={encryptionKey}
            onChange={onEncryptionKeyInputChangeEvent}
          ></TextInput>
          <Button disabled={!encryptionKey} mode='contained' onPress={() => setDecryptValueState(false)}>
            Edit your note
          </Button>
          <Text> </Text>
          <Text> </Text>
        </ScrollView>
      ) : (
        <ScrollView style={styles.container}>
          <MandatoryTextInput style={styles.inputContainer} label='Label' value={label} onChange={setLabel}></MandatoryTextInput>
          <MandatoryTextInput style={styles.inputContainer} label='Value' value={value} onChange={setValue} multiline={true}></MandatoryTextInput>
          <View style={styles.encryptValueContainer}>
            <Text style={styles.encryptValueLabel}>Encrypt Value</Text>
            <Switch value={encryptValue} onValueChange={toggleEncryptValue} />
          </View>
          {encryptValue ? (
            <MandatoryTextInput
              style={styles.inputContainer}
              label='Encryption Key'
              value={encryptionKey}
              onChange={setEncryptionKey}
            ></MandatoryTextInput>
          ) : null}
          <View style={styles.buttonsContainer}>
            <Button style={styles.saveButton} mode='contained' disabled={isUpdateButtonDisabled()} onPress={onUpdateButtonClickEvent}>
              {'  Update  '}
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
          <Text> </Text>
          <Text> </Text>
        </ScrollView>
      )}
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
    decryptNoteValueText: {
      marginBottom: 15,
      fontSize: 14,
      fontWeight: 'bold',
      color: TEXT_COLOR.get(theme),
    },
    encryptionKeyInput: {
      marginTop: 15,
      marginBottom: 30,
    },
  });
};
