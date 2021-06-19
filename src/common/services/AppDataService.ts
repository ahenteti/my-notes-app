import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppData, DefaultAddData } from '../models/AppData';
import { NoteToDelete, NoteToCreate, NoteToUpdate } from '../models/Note';
import { Theme } from '../models/Theme';
import { EncryptionService } from './EncryptionService';
import { ToastService } from './ToastService';

export class AppDataService {
  private static readonly INSTANCE = new AppDataService();

  public static getInstance(): AppDataService {
    return AppDataService.INSTANCE;
  }

  private constructor(private encryptionService = EncryptionService.getInstance(), private toastService = ToastService.getInstance()) {}

  async load(): Promise<AppData> {
    return await AsyncStorage.getItem('APP_DATA_KEY_STORAGE').then((res) => JSON.parse(res || JSON.stringify(DefaultAddData)));
  }

  async save(appData: AppData): Promise<void> {
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(appData));
  }

  async toggleTheme(appData: AppData, setAppData: (appData: AppData) => void): Promise<void> {
    const theme = appData.theme.dark ? Theme.Light : Theme.Dark;
    const newAppData = { ...appData, theme };
    setAppData(newAppData);
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(newAppData));
  }

  async createNote(note: NoteToCreate): Promise<void> {
    const memories = [...note.appData.memories];
    const id = Date.now() + '';
    const updatedValue = note.encryptionKey ? this.encryptionService.encrypt(note.encryptionKey, note.value) : note.value;
    memories.unshift({ id, label: note.label, value: updatedValue, isEncrypted: note.encryptionKey != '' });
    const newAppData = { ...note.appData, memories };
    note.setAppData(newAppData);
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(newAppData))
      .then(() => this.toastService.show('Your note has been saved successfully'))
      .catch(() => this.toastService.show('Error while saving your note :( please try again'));
  }

  async updateNote(note: NoteToUpdate): Promise<void> {
    const updatedValue = note.encryptionKey ? this.encryptionService.encrypt(note.encryptionKey, note.value) : note.value;
    const memories = [...note.appData.memories];
    const index = memories.findIndex((n) => note.id === n.id);
    if (index < 0) return;
    memories[index] = { id: note.id, label: note.label, value: updatedValue, isEncrypted: note.encryptValue };
    const newAppData = { ...note.appData, memories };
    note.setAppData(newAppData);
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(newAppData))
      .then(() => this.toastService.show('Your note has been updated successfully'))
      .catch(() => this.toastService.show('Error while updating your note :( please try again'));
  }

  async deleteNote(note: NoteToDelete): Promise<void> {
    let memories = [...note.appData.memories];
    memories = memories.filter((n) => note.id !== n.id);
    const newAppData = { ...note.appData, memories, swipeToDeleteMemoryInfoAlreadyShown: true };
    note.setAppData(newAppData);
    return await AsyncStorage.setItem('APP_DATA_KEY_STORAGE', JSON.stringify(newAppData))
      .then(() => this.toastService.show('Your note has been deleted successfully'))
      .catch(() => this.toastService.show('Error while deleting your note :( please try again'));
  }
}
