import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AddMemoryButton() {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons style={styles.button} name='add' />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 3,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 75,
    right: 20,
    width: 65,
    height: 65,
    borderRadius: 100,
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 5,
  },
  button: {
    color: '#ef476f',
    fontSize: 50,
  },
});
