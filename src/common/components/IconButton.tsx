import React from 'react';
import { TouchableHighlight } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';
import { Color } from '../models/Color';
import { useTheme } from '../services/ThemeContext';

const ICON_COLOR = new Color('#444', '#CCC');

export enum IconButtonType {
  Ionicons,
  Feather,
}

interface IconButtonProps {
  name: any;
  size?: number;
  onPress: () => void;
  type?: IconButtonType;
}

export default function IconButton({ name, size = 24, onPress, type = IconButtonType.Ionicons }: IconButtonProps) {
  const { theme } = useTheme();
  switch (type) {
    case IconButtonType.Ionicons:
      return (
        <TouchableHighlight>
          <Ionicons name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(theme)} onPress={onPress} />
        </TouchableHighlight>
      );
    case IconButtonType.Feather:
      return (
        <TouchableHighlight>
          <Feather name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(theme)} onPress={onPress} />
        </TouchableHighlight>
      );
    default:
      return null;
  }
}
