import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Switch } from 'react-native-paper';
import TextInput from '../../common/components/TextInput';
import TextOutput from '../../common/components/TextOutput';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import {
  BODY_BACKGROUND_COLOR,
  DELETE_BUTTON_BACKGROUND_COLOR,
  DELETE_BUTTON_COLOR,
  EDIT_NOTE_SCREEN_NAME,
  HOME_SCREEN_NAME,
  PRIMARY_COLOR,
  TEXT_COLOR,
} from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { AppDataService } from '../../common/services/AppDataService';
import { EncryptionService } from '../../common/services/EncryptionService';

interface ConsultNoteFormProps {
  encryptionService?: EncryptionService;
  appDataService?: AppDataService;
}

const UPDATE_BUTTON_COLOR = new Color('#EEE', '#EEE');

export function ConsultNoteForm({
  encryptionService = EncryptionService.getInstance(),
  appDataService = AppDataService.getInstance(),
}: ConsultNoteFormProps) {
  const { appData, setAppData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();
  const route = useRoute();
  const { note }: any = route.params;
  const [decryptValue, setDecryptValue] = React.useState(false);
  const [encryptionKey, setEncryptionKey] = React.useState('');
  const toggleDecryptValue = () => setDecryptValue(!decryptValue);
  const onDeleteButtonClickEvent = () => {
    appDataService.deleteNote({ id: note.id, appData, setAppData });
    navigation.navigate(HOME_SCREEN_NAME);
  };
  return (
    <TouchableWithDismissKeyboardCapability>
      <ScrollView style={styles.container}>
        <TextOutput style={styles.output} label='Label' value={note.label}></TextOutput>
        {encryptionKey ? null : <TextOutput style={styles.output} label={decryptValue ? 'Decrypted Value' : 'Value'} value={note.value}></TextOutput>}
        {!encryptionKey ? null : (
          <TextOutput style={styles.output} label='Value' value={encryptionService.decrypt(encryptionKey, note.value)}></TextOutput>
        )}

        {!note.isEncrypted ? null : (
          <View>
            <View style={styles.decryptValueContainer}>
              <Text style={styles.decryptValueLabel}>Decrypt Value</Text>
              <Switch value={decryptValue} onValueChange={toggleDecryptValue} />
            </View>
            {!decryptValue ? null : (
              <View>
                <TextInput style={styles.input} label='Encryption Key' value={encryptionKey} onChange={setEncryptionKey}></TextInput>
              </View>
            )}
          </View>
        )}

        <View style={styles.buttonsContainer}>
          <Button style={styles.deleteButton} mode='contained' onPress={onDeleteButtonClickEvent}>
            Delete
          </Button>
          <Button style={styles.updateButton} mode='contained' onPress={() => navigation.navigate(EDIT_NOTE_SCREEN_NAME, { note })}>
            Update
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
    output: {
      marginBottom: 15,
    },
    decryptValueContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 15,
    },
    decryptValueLabel: {
      color: TEXT_COLOR.get(theme),
      fontSize: 14,
    },
    input: {},
    buttonsContainer: {
      display: 'flex',
      flexDirection: 'row',
      marginTop: 30,
      justifyContent: 'flex-end',
    },
    deleteButton: {
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 4,
      paddingRight: 4,
      color: DELETE_BUTTON_COLOR.get(theme),
      backgroundColor: DELETE_BUTTON_BACKGROUND_COLOR.get(theme),
    },
    updateButton: {
      marginLeft: 12,
      paddingTop: 2,
      paddingBottom: 2,
      paddingLeft: 4,
      paddingRight: 4,
      color: UPDATE_BUTTON_COLOR.get(theme),
      backgroundColor: PRIMARY_COLOR.get(theme),
    },
  });
};
