import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../../common/models/Color';
import { useTheme } from '../../common/services/ThemeContext';
import { Theme } from '../../common/models/Theme';

interface AddMemoryButtonProps {
  onPress: () => void;
}

export default function AddMemoryButton({ onPress }: AddMemoryButtonProps) {
  const { theme } = useTheme();
  const styles = getStyles(theme);
  return (
    <TouchableOpacity activeOpacity={0.6} style={styles.container} onPress={onPress}>
      <Ionicons style={styles.button} name='add' />
    </TouchableOpacity>
  );
}

const getStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      paddingLeft: 3,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      bottom: 20,
      right: 20,
      width: 65,
      height: 65,
      borderRadius: 100,
      backgroundColor: BACKGROUND_COLOR.get(theme),
      shadowColor: SHADOW_COLOR.get(theme),
      shadowOffset: {
        width: 0,
        height: 3,
      },
      shadowOpacity: 0.29,
      shadowRadius: 4.65,
      elevation: 5,
    },
    button: {
      color: TEXT_COLOR.get(theme),
      fontSize: 50,
    },
  });
};

const BACKGROUND_COLOR = new Color('#FFF', '#333');
const SHADOW_COLOR = new Color('#000', '#FFF');
const TEXT_COLOR = new Color('#ef476f', '#ef476f');
