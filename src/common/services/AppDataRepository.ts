import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, DefaultAddData } from '../models/AppData';

export class AppDataRepository {
  private static readonly INSTANCE = new AppDataRepository();

  public static getInstance(): AppDataRepository {
    return AppDataRepository.INSTANCE;
  }

  private constructor() {}

  async load(): Promise<AppData> {
    return await AsyncStorage.getItem('APP_DATA_KEY_STORAGE').then((res) => JSON.parse(res || JSON.stringify(DefaultAddData)));
  }

  async save(appData: AppData): Promise<void> {
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(appData));
  }
}
