import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TextInput, View } from 'react-native';
import { Color } from '../../common/models/Color';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';
import { FontAwesome5, Octicons } from '@expo/vector-icons';

interface SearchMemoriesInputProps {
  text: string;
  onChangeText: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

const TEXT_COLOR = new Color('#333', '#EEE');
const PLACEHOLDER_COLOR = new Color('#888', '#888');
const BACKGROUND_COLOR = new Color('#fff', '#262A2D');

export default function SearchMemoriesInput(props: SearchMemoriesInputProps) {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);
  const deleteSearchText = () => {
    props.onChangeText('');
  };
  return (
    <View style={[props.style, styles.container]}>
      <Octicons style={styles.icon} name='search' size={18} color={PLACEHOLDER_COLOR.get(appData.theme)} />
      <TextInput
        style={styles.input}
        placeholder='Search...'
        value={props.text}
        onChangeText={props.onChangeText}
        placeholderTextColor={PLACEHOLDER_COLOR.get(appData.theme)}
      ></TextInput>
      {!props.text ? null : (
        <FontAwesome5 style={styles.icon} name='times' onPress={deleteSearchText} size={18} color={PLACEHOLDER_COLOR.get(appData.theme)} />
      )}
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: BACKGROUND_COLOR.get(theme),
      borderRadius: 6,
    },
    icon: {
      padding: 12,
    },
    input: {
      flex: 1,
      color: TEXT_COLOR.get(theme),
      paddingRight: 10,
      paddingTop: 7,
      paddingBottom: 7,
    },
  });
};
