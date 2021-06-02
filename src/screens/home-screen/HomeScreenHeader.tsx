import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeEnum } from '../../common/services/ThemeEnum';
import { Color } from '../../common/services/Color';
import { useTheme } from '../../common/services/ThemeContext';
import ToggleThemeButton from '../../common/components/ToggleThemeButton';
import { StackNavigationOptions } from '@react-navigation/stack';

const HEADER_HEIGHT = 55;
const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const BORDER_COLOR = new Color('#EEE', '#1C1F23');
const TEXT_COLOR = new Color('#1e96fc', '#1e96fc');

export default function HomeScreenHeader() {
  const { theme } = useTheme();
  const styles = getStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
        <Text style={styles.text}>My Memory</Text>
      </View>
      <ToggleThemeButton></ToggleThemeButton>
    </View>
  );
}

export const HOME_SCREEN_HEADER_OPTIONS: StackNavigationOptions = {
  headerTitle: HomeScreenHeader,
  headerStyle: {
    height: HEADER_HEIGHT,
  },
  headerTitleContainerStyle: {
    left: 0,
    right: 0,
  },
};

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
      borderBottomWidth: 2,
      borderBottomColor: BORDER_COLOR.get(theme),
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
      paddingLeft: 12,
    },
    image: {
      width: 25,
      height: 25,
    },
  });
};
