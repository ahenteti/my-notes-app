import { AppData } from './AppData';

export interface Note {
  id: string;
  label: string;
  value: string;
  isEncrypted: boolean;
}

export interface NoteToCreate {
  label: string;
  value: string;
  encryptionKey: string;
  appData: AppData;
  setAppData: (appData: AppData) => void;
}

export interface NoteToUpdate {
  id: string;
  label: string;
  value: string;
  encryptionKey: string;
  encryptValue: boolean;
  appData: AppData;
  setAppData: (appData: AppData) => void;
}

export interface NoteToDelete {
  id: string;
  appData: AppData;
  setAppData: (appData: AppData) => void;
}
