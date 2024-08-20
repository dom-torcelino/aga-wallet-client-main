/* eslint-disable prettier/prettier */
import {Context, createContext} from 'react';

type DarkModeContextValue = {
  isDarkMode: boolean;
  useDeviceSettings: boolean;
  setIsDarkMode: (prev: boolean) => void;
  setUseDeviceSettings: (prev: boolean) => void;
};

const DarkMode: Context<DarkModeContextValue> =
  createContext<DarkModeContextValue>({
    isDarkMode: false,
    useDeviceSettings: false,
    setIsDarkMode: () => {},
    setUseDeviceSettings: () => {},
  });
export default DarkMode;
