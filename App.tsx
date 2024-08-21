import React, { useCallback, useEffect, useRef, useState } from 'react';
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BottomSheet, { BottomSheetMethods } from './src/components/BottomSheet';
import { BottomSheetProvider } from './src/components/BottomSheetContext';
import Transfer from './src/components/Transfer';
import Receive from './src/components/Receive';
import { COLORS } from './src/constants/theme';
import BottomSheetScrollView from './src/components/BottomSheetScrollView';
import AuthNavigator from './src/navigations/AuthNavigator';
import Toast from './src/components/Toast';
import { AuthProvider } from './src/screens/auth/AuthContext';
import { BackHandler } from 'react-native';
import { ThemeProvider } from './src/utils/ThemeContext';

import './src/translations'; // Ensure translations are imported
import i18next from 'i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LANGUAGE_KEY } from './src/screens/SettingsScreen';

const App: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef2 = useRef<BottomSheetMethods>(null);
  const toastRef = useRef<any>(null);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isTranslationReady, setIsTranslationReady] = useState(false); // Track when translations are ready

  const pressHandler = useCallback(() => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetOpen(true);
  }, []);
  
  const pressHandler2 = useCallback(() => {
    bottomSheetRef2.current?.expand();
    setIsBottomSheetOpen(true);
  }, []);

  const closeBottomSheet = useCallback(() => {
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
  }, []);

  const closeBottomSheet2 = useCallback(() => {
    bottomSheetRef2.current?.close();
    setIsBottomSheetOpen(false);
  }, []);

  const showToast = useCallback(() => {
    toastRef.current.show({
      type: 'success',
      text: 'Wallet address copied to clipboard!',
      duration: 1000,
    });
  }, []);

  useEffect(() => {
    const onBackPress = () => {
      if (isBottomSheetOpen) {
        closeBottomSheet();
        closeBottomSheet2();
        return true;
      }
      return false;
    };
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      onBackPress
    );
    return () => backHandler.remove();
  }, [isBottomSheetOpen, closeBottomSheet, closeBottomSheet2]);

   // Initialize translations and wait for i18next to be ready
   useEffect(() => {
    const initTranslations = async () => {
      try {
        // Get the saved language from AsyncStorage
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        const initialLanguage = savedLanguage || 'en'; // Default to English if no language is found

        // Set the language in i18next
        await i18next.changeLanguage(initialLanguage);

        // Mark translations as ready
        setIsTranslationReady(true);
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    
    initTranslations();
  }, []);

  // Don't render the app until translations are ready
  if (!isTranslationReady) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.primaryBGColor} />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.primaryBGColor} />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetProvider
            pressHandler={pressHandler}
            pressHandler2={pressHandler2}
          >
            <AuthProvider>
              <NavigationContainer theme={DarkTheme}>
                <AuthNavigator />
                <BottomSheetScrollView
                  ref={bottomSheetRef}
                  snapTo="80%"
                  backDropColor="black"
                >
                  <Transfer closeBottomSheet={closeBottomSheet} />
                </BottomSheetScrollView>
                <BottomSheet
                  ref={bottomSheetRef2}
                  snapTo="80%"
                  backDropColor="black"
                >
                  <Receive
                    closeBottomSheet2={closeBottomSheet2}
                    showToast={showToast}
                  />
                </BottomSheet>
              </NavigationContainer>
            </AuthProvider>
          </BottomSheetProvider>
          <Toast ref={toastRef} />
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
};

export default App;
