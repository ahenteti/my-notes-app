import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from '../services/Color';
import { useTheme } from '../services/ThemeContext';

const ICON_COLOR = new Color('#444', '#CCC');

interface IoniconButtonProps {
  name: any;
  size?: number;
  onPress: () => void;
}

export default function IoniconButton({ name, size = 24, onPress }: IoniconButtonProps) {
  const { theme } = useTheme();
  return (
    <TouchableHighlight>
      <Ionicons name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(theme)} onPress={onPress} />
    </TouchableHighlight>
  );
}
