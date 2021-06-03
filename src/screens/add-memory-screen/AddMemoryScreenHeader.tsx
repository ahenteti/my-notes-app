import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { Color } from '../../common/services/Color';
import { useTheme } from '../../common/services/ThemeContext';
import ToggleThemeButton from '../../common/components/ToggleThemeButton';
import { HEADER_HEIGHT } from '../../common/Constants';
import { Ionicons } from '@expo/vector-icons';
import { HOME_SCREEN_NAME } from '../home-screen/HomeScreen';
import { useNavigation } from '@react-navigation/native';

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const TEXT_COLOR = new Color('#333', '#EEE');
const ARROW_COLOR = new Color('#333', '#EEE');

export default function AddMemoryScreenHeader() {
  const { theme } = useTheme();
  const navigation = useNavigation();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Ionicons name='arrow-back' style={styles.arrow} onPress={() => navigation.navigate(HOME_SCREEN_NAME)} />
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
      paddingLeft: 15,
      paddingRight: 15,
      backgroundColor: BACKGROUND_COLOR.get(theme),
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
    arrow: {
      color: ARROW_COLOR.get(theme),
      fontSize: 28,
    },
  });
};
