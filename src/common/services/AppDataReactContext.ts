import { createContext, useContext } from 'react';
import { AppData, DefaultAddData } from '../models/AppData';

export type AppDataContext = {
  appData: AppData;
  setAppData: (appData: AppData) => void;
};

export const AppDataReactContext = createContext<AppDataContext>({
  appData: DefaultAddData,
  setAppData: (appData) => console.warn('no appData provider'),
});
export const useAppData = () => useContext(AppDataReactContext);
