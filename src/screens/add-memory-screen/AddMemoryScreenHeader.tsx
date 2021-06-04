import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { Color } from '../../common/services/Color';
import { useTheme } from '../../common/services/ThemeContext';
import ToggleThemeButton from '../../common/components/ToggleThemeButton';
import { HEADER_BACKGROUND_COLOR, HEADER_HEIGHT } from '../../common/Constants';
import { HOME_SCREEN_NAME } from '../home-screen/HomeScreen';
import { useNavigation } from '@react-navigation/native';
import IoniconButton from '../../common/components/IconButton';

const TEXT_COLOR = new Color('#333', '#EEE');

export default function AddMemoryScreenHeader() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <IoniconButton name='arrow-back' size={28} onPress={() => navigation.navigate(HOME_SCREEN_NAME)} />
        <Text style={styles.text}>New Memory</Text>
      </View>
      <ToggleThemeButton></ToggleThemeButton>
    </View>
  );
}

const getStyles = (theme: ThemeEnum) => {
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
