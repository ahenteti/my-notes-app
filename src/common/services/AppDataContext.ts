import { createContext, useContext } from 'react';
import { AppData, DefaultAddData } from '../models/AppData';

export type AppDataContextType = {
  appData: AppData;
  setAppData: (appData: AppData) => void;
};

export const AppDataContext = createContext<AppDataContextType>({
  appData: DefaultAddData,
  setAppData: (appData) => console.warn('no appData provider'),
});
export const useAppData = () => useContext(AppDataContext);
