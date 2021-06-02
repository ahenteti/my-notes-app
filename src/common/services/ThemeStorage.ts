import { Storage } from './Storage';
import { ThemeEnum } from './ThemeEnum';

export class ThemeStorage {
  private static readonly INSTANCE = new ThemeStorage();

  public static getInstance() {
    return ThemeStorage.INSTANCE;
  }

  private constructor(private storage: Storage = Storage.getInstance()) {}

  async isDark(): Promise<boolean> {
    return this.storage.get('THEME_STORAGE_KEY').then((res) => /dark/i.test(res + ''));
  }

  async toggleTheme(previousTheme: ThemeEnum): Promise<void> {
    const newTheme = previousTheme == ThemeEnum.Dark ? 'light' : 'dark';
    return this.storage.set('THEME_STORAGE_KEY', newTheme);
  }
}
