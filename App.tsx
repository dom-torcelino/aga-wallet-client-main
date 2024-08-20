import React, {useCallback, useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BottomSheet, {BottomSheetMethods} from './src/components/BottomSheet';
import {BottomSheetProvider} from './src/components/BottomSheetContext';
import Transfer from './src/components/Transfer';
import Receive from './src/components/Receive';
import {COLORS} from './src/constants/theme';
import BottomSheetScrollView from './src/components/BottomSheetScrollView';
import AuthNavigator from './src/navigations/AuthNavigator';
import Toast from './src/components/Toast';
import {AuthProvider} from './src/screens/auth/AuthContext';
import {BackHandler} from 'react-native';
import {ThemeProvider} from './src/utils/ThemeContext';

import './src/translations';

const App: React.FC = () => {
  const bottomSheetRef = useRef<BottomSheetMethods>(null);
  const bottomSheetRef2 = useRef<BottomSheetMethods>(null);
  const toastRef = useRef<any>(null);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  // const navigation = useNavigation;

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
      onBackPress,
    );
    return () => backHandler.remove();
  }, [isBottomSheetOpen, closeBottomSheet, closeBottomSheet2]);

  return (
    <ThemeProvider>
      <SafeAreaProvider>
        <StatusBar backgroundColor={COLORS.primaryBGColor} />
        <GestureHandlerRootView style={{flex: 1}}>
          <BottomSheetProvider
            pressHandler={pressHandler}
            pressHandler2={pressHandler2}>
            <AuthProvider>
              <NavigationContainer theme={DarkTheme}>
                <AuthNavigator />
                <BottomSheetScrollView
                  ref={bottomSheetRef}
                  snapTo="80%"
                  // backgroundColor={COLORS.secondaryBGColor}
                  backDropColor="black">
                  <Transfer closeBottomSheet={closeBottomSheet} />
                </BottomSheetScrollView>
                <BottomSheet
                  ref={bottomSheetRef2}
                  snapTo="80%"
                  // backgroundColor={COLORS.secondaryBGColor}
                  backDropColor="black">
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
