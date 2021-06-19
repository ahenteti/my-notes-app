import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, StyleProp, ViewStyle, View, Text, TouchableWithoutFeedback } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
  CONSULT_NOTE_SCREEN_NAME,
  DELETE_BUTTON_BACKGROUND_COLOR,
  DELETE_BUTTON_COLOR,
  EDIT_NOTE_SCREEN_NAME,
  PRIMARY_COLOR,
} from '../../common/Constants';
import { Color } from '../../common/models/Color';
import { Note } from '../../common/models/Note';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const LABEL_COLOR = new Color('#444', '#EEE');
const VALUE_COLOR = new Color('#777', '#CCC');

export interface NoteProps {
  note: Note;
  style?: StyleProp<ViewStyle>;
}

const PADDING_INIT_VALUE = 15;
const LABEL_FONT_SIZE_INIT_VALUE = 18;
const VALUE_FONT_SIZE_INIT_VALUE = 13;

export default function NoteView({ note, style }: NoteProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const navigation = useNavigation();

  const label = note.label;
  const value = formatMemoryValue(note);
  const isEncrypted = note.isEncrypted;

  return (
    <TouchableWithoutFeedback onPress={() => navigation.navigate(CONSULT_NOTE_SCREEN_NAME, { note: note })}>
      <View style={styles.container}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.valueContainer}>
          {isEncrypted ? (
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={[styles.isEncryptedLabel]}>Encrypted Value</Text>
              <Text style={{ color: VALUE_COLOR.get(appData.theme) }}> : </Text>
            </View>
          ) : null}
          <Text style={styles.value} numberOfLines={1}>
            {value}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      backgroundColor: BACKGROUND_COLOR.get(theme),
      padding: PADDING_INIT_VALUE,
      borderRadius: 3,
      marginBottom: 15,
      height: 75,
    },
    label: {
      color: LABEL_COLOR.get(theme),
      fontSize: LABEL_FONT_SIZE_INIT_VALUE,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingBottom: 4,
    },
    valueContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    isEncryptedLabel: {
      fontSize: 12,
      color: VALUE_COLOR.get(theme),
      fontWeight: 'bold',
      textDecorationLine: 'underline',
    },
    value: {
      flex: 1,
      color: VALUE_COLOR.get(theme),
      fontSize: VALUE_FONT_SIZE_INIT_VALUE,
      fontFamily: 'Roboto',
    },
  });
};

const formatMemoryValue = (memory: Note) => {
  return memory.value.replace(/\n/g, ' ');
};
