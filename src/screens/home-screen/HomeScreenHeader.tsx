import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import ToggleThemeButton from '../../common/components/ToggleThemeButton';
import { HEADER_BACKGROUND_COLOR, HEADER_HEIGHT, TEXT_COLOR } from '../../common/Constants';
import { Theme } from '../../common/models/Theme';
import { useAppData } from '../../common/services/AppDataReactContext';

export default function HomeScreenHeader() {
  const { appData } = useAppData();
  const styles = getStyles(appData.theme);

  return (
    <View style={styles.container}>
      <View style={styles.left}>
        <Image style={styles.image} source={require('../../../assets/logo.png')} />
        <Text style={styles.text}>My Notes</Text>
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
      paddingLeft: 15,
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
    image: {
      width: 25,
      height: 25,
    },
  });
};
