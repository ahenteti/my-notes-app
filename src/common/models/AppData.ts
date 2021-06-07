import { Note } from './Note';
import { Theme } from './Theme';

export interface AppData {
  memories: Note[];
  theme: Theme;
  swipeToDeleteMemoryInfoAlreadyShown: boolean;
}

export const DefaultAddData: AppData = {
  memories: [],
  theme: Theme.Light,
  swipeToDeleteMemoryInfoAlreadyShown: false,
};
