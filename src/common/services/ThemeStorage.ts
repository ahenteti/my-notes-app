import { Theme } from '../models/Theme';
import { Storage } from './Storage';

export class ThemeStorage {
  private static readonly STORAGE_KEY = 'THEME_STORAGE_KEY';
  private static readonly INSTANCE = new ThemeStorage();

  public static getInstance() {
    return ThemeStorage.INSTANCE;
  }

  private constructor(private storage: Storage = Storage.getInstance()) {}

  async isDark(): Promise<boolean> {
    return this.storage.get(ThemeStorage.STORAGE_KEY).then((res) => /dark/i.test(res + ''));
  }

  async toggle(previousTheme: Theme): Promise<void> {
    const newTheme = previousTheme.dark ? 'light' : 'dark';
    return this.storage.set(ThemeStorage.STORAGE_KEY, newTheme);
  }
}
