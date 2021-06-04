import color from 'color';
import DefaultTheme, { configureFonts } from 'react-native-paper';

export interface Theme extends ReactNativePaper.Theme {}

export namespace Theme {
  export const Dark: Theme = {
    dark: true,
    roundness: 4,
    animation: {
      scale: 1.0,
    },
    fonts: configureFonts(),
    colors: {
      primary: '#1e96fc',
      accent: '#ef476f',
      background: '#1C1F23',
      surface: '#262A2D',
      error: '#B00020',
      text: '#EEE',
      onSurface: '#000',
      disabled: color('#000').alpha(0.26).rgb().string(),
      placeholder: color('#000').alpha(0.54).rgb().string(),
      backdrop: color('#000').alpha(0.5).rgb().string(),
      notification: '#ef476f',
    },
  };

  export const Light: Theme = {
    dark: false,
    roundness: 4,
    animation: {
      scale: 1.0,
    },
    fonts: configureFonts(),
    colors: {
      primary: '#1e96fc',
      accent: '#ef476f',
      background: '#EEE',
      surface: '#FFF',
      error: '#B00020',
      text: '#444',
      onSurface: '#000',
      disabled: color('#000').alpha(0.26).rgb().string(),
      placeholder: color('#000').alpha(0.54).rgb().string(),
      backdrop: color('#000').alpha(0.5).rgb().string(),
      notification: '#ef476f',
    },
  };
}
