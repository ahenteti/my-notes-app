import { Memory } from './Memory';
import { Theme } from './Theme';

export interface AppData {
  memories: Memory[];
  theme: Theme;
  swipeToDeleteMemoryInfoAlreadyShown: boolean;
}

export const DefaultAddData: AppData = {
  memories: [],
  theme: Theme.Light,
  swipeToDeleteMemoryInfoAlreadyShown: false,
};
