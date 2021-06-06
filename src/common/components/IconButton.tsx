import React from 'react';
import { TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons, Feather, Ionicons } from '@expo/vector-icons';
import { Color } from '../models/Color';
import { useAppData } from '../services/AppDataContext';

export const ICON_COLOR = new Color('#444', '#CCC');

export enum IconButtonType {
  Ionicons,
  Feather,
  Material,
}

interface IconButtonProps {
  name: any;
  size?: number;
  onPress: () => void;
  type?: IconButtonType;
}

export default function IconButton({ name, size = 24, onPress, type = IconButtonType.Ionicons }: IconButtonProps) {
  const { appData } = useAppData();
  switch (type) {
    case IconButtonType.Ionicons:
      return (
        <TouchableHighlight>
          <Ionicons name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(appData.theme)} onPress={onPress} />
        </TouchableHighlight>
      );
    case IconButtonType.Feather:
      return (
        <TouchableHighlight>
          <Feather name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(appData.theme)} onPress={onPress} />
        </TouchableHighlight>
      );
    case IconButtonType.Material:
      return (
        <TouchableHighlight>
          <MaterialCommunityIcons name={name} style={{ padding: 10 }} size={size} color={ICON_COLOR.get(appData.theme)} onPress={onPress} />
        </TouchableHighlight>
      );
    default:
      return null;
  }
}
