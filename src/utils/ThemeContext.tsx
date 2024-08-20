/* eslint-disable prettier/prettier */
import React, {createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Theme {
  primaryColor: string;
  primaryBGColor: string;
  secondaryBGColor: string;
  layeBGColor: string,
  strokeColor: string,
  iconColor: string,
  primaryWhite: string,
  secondaryWhite: string,
  borderStroke: string, 
  secondaryTextColor: string,
  greenTextColor: string,
  redTextColor: string,
  primaryGoldHex: string,
  primaryWhiteHex: string,
  placeHolderTextColor: string,
  textColor: string,
  unreadNotificationBG: string,
  unreadNotificationBorder: string,
  primaryRedHex: string,
  primaryOrangeHex: string,
  primaryBlackHex: string,
  primaryDarkGreyHex: string,
  secondaryDarkGreyHex: string,
  primaryGreyHex: string,
  secondaryGreyHex: string,
  primaryLightGreyHex: string,
  secondaryLightGreyHex: string,
  primaryBlackRGBA: string,
  secondaryBlackRGBA: string,
}
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const LIGHT_THEME = {
    primaryColor: '#D5A952',
    primaryBGColor: '#FFFFFF',
    secondaryBGColor: '#F0F0F0',
    layeBGColor: '#E5E5E5',
    strokeColor: '#C0C0C0',
    iconColor: '#000000',
    primaryWhite: '#FFFFFF',
    secondaryWhite: '#949292',
    borderStroke: '#EEEEEE', 
    secondaryTextColor: '#444444',
    greenTextColor: '#48B22E',
    redTextColor: '#C12727',
    primaryGoldHex: '#D5A952',
    primaryWhiteHex: '#FFFFFF',
    placeHolderTextColor: '#888',
    textColor: '#222222',
    unreadNotificationBG: '#E0E0E0',
    unreadNotificationBorder: '#FF6347',
    primaryRedHex: '#DC3535',
    primaryOrangeHex: '#D17842',
    primaryBlackHex: '#0C0F14',
    primaryDarkGreyHex: '#141921',
    secondaryDarkGreyHex: '#21262E',
    primaryGreyHex: '#D3D3D3',
    secondaryGreyHex: '#D3D3D3',
    primaryLightGreyHex: '#F0F0F0',
    secondaryLightGreyHex: '#AEAEAE',
    primaryBlackRGBA: 'rgba(0,0,0,0.5)',
    secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};
const DARK_THEME = {
    primaryColor: '#D5A952',
    primaryBGColor: '#000000',
    secondaryBGColor: '#141414',
    layeBGColor: '#272727',
    strokeColor: '#3C403F',
    iconColor: '#FFFFFF',
    primaryWhite: '#FFFFFF',
    secondaryWhite: '#949292',
    borderStroke: '#3C403F',
    secondaryTextColor: '#888686',
    greenTextColor: '#48B22E',
    redTextColor: '#C12727',
    primaryGoldHex: '#D5A952',
    primaryWhiteHex: '#FFFFFF',
    placeHolderTextColor: '#888',
    textColor: '#D4D4D4',
    unreadNotificationBG: '#3C3C3C',
    unreadNotificationBorder: '#FF6347',
    primaryRedHex: '#DC3535',
    primaryOrangeHex: '#D17842',
    primaryBlackHex: '#0C0F14',
    primaryDarkGreyHex: '#141921',
    secondaryDarkGreyHex: '#21262E',
    primaryGreyHex: '#252A32',
    secondaryGreyHex: '#252A32',
    primaryLightGreyHex: '#52555A',
    secondaryLightGreyHex: '#AEAEAE',
    primaryBlackRGBA: 'rgba(12,15,20,0.5)',
    secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({children}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const loadTheme = async () => {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      }
    };
    loadTheme();
  }, []);

  const toggleTheme = async () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    await AsyncStorage.setItem('theme', newMode ? 'dark' : 'light');
  };

  const theme = isDarkMode ? DARK_THEME : LIGHT_THEME;

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, isDarkMode}}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
