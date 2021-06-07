import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';

export default function LoadingScreen() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle='default' />
      <Image style={styles.image} source={require('../../../assets/loading.gif')}></Image>
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: '100%',
    backgroundColor: '#EEE',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 35,
    height: 35,
    marginBottom: 10,
  },
  text: {
    color: '#444',
  },
});
