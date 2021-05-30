import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

export default function Header() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/logo.png')} />
      <Text style={styles.text}>My Memory</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
  },
  text: {
    color: '#1e96fc',
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
