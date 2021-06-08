import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Switch } from 'react-native-paper';
import TextInput from '../../common/components/TextInput';
import TextOutput from '../../common/components/TextOutput';
import { TouchableWithDismissKeyboardCapability } from '../../common/components/TouchableWithDismissKeyboardCapability';
import { BODY_BACKGROUND_COLOR, TEXT_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { EncryptionService } from '../../common/services/EncryptionService';

interface ConsultNoteFormProps {
  encryptionService?: EncryptionService;
}

export function ConsultNoteForm({ encryptionService = EncryptionService.getInstance() }: ConsultNoteFormProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const route = useRoute();
  const { memory }: any = route.params;
  const [decryptValue, setDecryptValue] = React.useState(false);
  const [salt, setSalt] = React.useState('');
  const toggleDecryptValue = () => setDecryptValue(!decryptValue);
  return (
    <TouchableWithDismissKeyboardCapability>
      <ScrollView style={styles.container}>
        <TextOutput style={styles.output} label='Label' value={memory.label}></TextOutput>
        {salt ? null : <TextOutput style={styles.output} label={decryptValue ? 'Decrypted Value' : 'Value'} value={memory.value}></TextOutput>}
        {!salt ? null : <TextOutput style={styles.output} label='Value' value={encryptionService.decrypt(salt, memory.value)}></TextOutput>}

        {!memory.isEncrypted ? null : (
          <View>
            <View style={styles.decryptValueContainer}>
              <Text style={styles.decryptValueLabel}>Decrypt Value</Text>
              <Switch value={decryptValue} onValueChange={toggleDecryptValue} />
            </View>
            {!decryptValue ? null : (
              <View>
                <TextInput style={styles.input} label='Encryption Key' value={salt} onChange={setSalt}></TextInput>
              </View>
            )}
          </View>
        )}
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
  });
};
