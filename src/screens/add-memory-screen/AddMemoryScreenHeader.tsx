import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../../common/models/Color';
import ToggleThemeButton from '../../common/components/ToggleThemeButton';
import { HEADER_BACKGROUND_COLOR, HEADER_HEIGHT, HOME_SCREEN_NAME } from '../../common/Constants';
import { useNavigation } from '@react-navigation/native';
import IconButton from '../../common/components/IconButton';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataContext';

const TEXT_COLOR = new Color('#333', '#EEE');

export default function AddMemoryScreenHeader() {
  const navigation = useNavigation();
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <IconButton name='arrow-back' size={28} onPress={() => navigation.navigate(HOME_SCREEN_NAME)} />
        <Text style={styles.text}>New Memory</Text>
      </View>
      <ToggleThemeButton></ToggleThemeButton>
    </View>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: HEADER_HEIGHT,
      paddingLeft: 5,
      paddingRight: 5,
      backgroundColor: HEADER_BACKGROUND_COLOR.get(theme),
    },
    left: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    text: {
      color: TEXT_COLOR.get(theme),
      fontSize: 20,
      fontFamily: 'Roboto',
      fontWeight: 'bold',
      paddingLeft: 15,
    },
  });
};
