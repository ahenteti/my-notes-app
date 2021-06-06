import { createContext, useContext } from 'react';
import { AppData, DefaultAddData } from '../models/AppData';

export type AppDataReactContextType = {
  appData: AppData;
  setAppData: (appData: AppData) => void;
};

export const AppDataReactContext = createContext<AppDataReactContextType>({
  appData: DefaultAddData,
  setAppData: (appData) => console.warn('no appData provider'),
});
export const useAppData = () => useContext(AppDataReactContext);
