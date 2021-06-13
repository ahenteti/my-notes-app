import { Alert, Platform, ToastAndroid } from 'react-native';

export class ToastService {
  private static INSTANCE = new ToastService();

  public static getInstance(): ToastService {
    return ToastService.INSTANCE;
  }

  private constructor() {}

  show(msg: string) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, 1000);
    } else {
      Alert.alert(msg);
    }
  }
}
