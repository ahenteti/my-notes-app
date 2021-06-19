import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MandatoryTextInput from '../../common/components/MandatoryTextInput';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import { BODY_BACKGROUND_COLOR, HOME_SCREEN_NAME, TEXT_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataService } from '../../common/services/AppDataService';
import { Button, Switch } from 'react-native-paper';
import { Color } from '../../common/models/Color';
import { Note } from '../../common/models/Note';

interface EditNotEncryptedNoteFormProps {
  note: Note;
  appDataService?: AppDataService;
}

const CANCEL_BUTTON_BACKGROUND_COLOR = new Color('#fff', '#262A2D');
const CANCEL_BUTTON_COLOR = new Color('#555', '#EEE');

export function EditNotEncryptedNoteForm({ note, appDataService = AppDataService.getInstance() }: EditNotEncryptedNoteFormProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  const [label, setLabel] = React.useState(note.label);
  const [value, setValue] = React.useState(note.value);
  const [encryptValue, setEncryptValue] = React.useState(false);
  const [encryptionKey, setEncryptionKey] = React.useState('');
  const toggleEncryptValue = () => setEncryptValue(!encryptValue);
  const updateButtonIsDisabled = () => (encryptValue ? !label || !value || !encryptionKey : !label || !value);
  const onSaveButtonClickEvent = () => {
    appDataService.updateNote({ id: note.id, label, value, encryptionKey, encryptValue, appData, setAppData });
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
        {encryptValue ? (
          <MandatoryTextInput
            style={styles.inputContainer}
            label='Encryption Key'
            value={encryptionKey}
            onChange={setEncryptionKey}
          ></MandatoryTextInput>
        ) : null}
        <View style={styles.buttonsContainer}>
          <Button style={styles.saveButton} mode='contained' disabled={updateButtonIsDisabled()} onPress={onSaveButtonClickEvent}>
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
