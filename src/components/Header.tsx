import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { ThemeEnum } from '../services/ThemeEnum';
import { Color } from '../services/Color';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../services/ThemeContext';
import { ThemeStorage } from '../services/ThemeStorage';

export default function Header() {
  const { themeStorage } = Header.dependencies;
  const { theme, setTheme } = useTheme();
  const styles = getStyles(theme);
  const toggleTheme = () => {
    setTheme(theme == ThemeEnum.Dark ? ThemeEnum.Light : ThemeEnum.Dark);
    themeStorage.updateTheme(theme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image style={styles.image} source={require('../../assets/logo.png')} />
        <Text style={styles.text}>My Memory</Text>
      </View>

      {theme == ThemeEnum.Dark ? <Feather name='sun' size={24} color='#CCC' onPress={toggleTheme} /> : null}
      {theme == ThemeEnum.Light ? <Feather name='moon' size={24} color='#444' onPress={toggleTheme} /> : null}
    </View>
  );
}

Header.dependencies = {
  themeStorage: ThemeStorage.getInstance(),
};

const getStyles = (theme: ThemeEnum) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 15,
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

const BACKGROUND_COLOR = new Color('#FFF', '#262A2D');
const BORDER_COLOR = new Color('#EEE', '#1C1F23');
const TEXT_COLOR = new Color('#1e96fc', '#1e96fc');
