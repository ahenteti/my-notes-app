import AsyncStorage from '@react-native-async-storage/async-storage';

export class Storage {
  private static readonly INSTANCE = new Storage();

  public static getInstance(): Storage {
    return Storage.INSTANCE;
  }

  private constructor() {}

  async get(key: string): Promise<string | null> {
    return await AsyncStorage.getItem(key);
  }

  async set(key: string, value: string): Promise<void> {
    return await AsyncStorage.setItem(key, value);
  }

  async remove(key: string): Promise<void> {
    return await AsyncStorage.removeItem(key);
  }
}
