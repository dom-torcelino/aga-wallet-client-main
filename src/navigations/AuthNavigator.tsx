import React from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import Login from '../screens/auth/Login';
import ForgotPassword from '../screens/auth/ForgotPassword';
import Register from '../screens/auth/Register';
import {COLORS} from '../constants/theme';
import BottomTabNavigator from './BottomTabNavigator';
import {RootStackParamList} from '../types/types'; // Import the type
import TokenDetails from '../components/TokenDetails';
import QrScanner from '../QrScanner';
import {Easing } from 'react-native';
import ResetPassword from '../components/ResetPassword';
import WalletCreationScreen from '../screens/WalletCreationScreen';
import TransactionSuccessScreen from '../screens/TransactionSuccessScreen';
import TransactionFailureScreen from '../screens/TransactionFailureScreen';
import EnterPasswordScreen from '../screens/SendAssetPasswordScreen';
import TransactionDetails from '../components/TransactionDetails';
import GameView from '../components/GameView';
import {useTheme} from '../utils/ThemeContext';
import NotificationsScreen from '../screens/NotificationScreen';
import { SendAssetScreen } from '../screens/SendAssetScreen';
import { useTranslation } from 'react-i18next';
import { SendAssetAmountScreen } from '../screens/SendAssetAmountScreen';

const Stack = createStackNavigator<RootStackParamList>();

const config = {
  animation: 'spring' as const,
  config: {
    stiffness: 1000,
    damping: 100,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: 'timing' as const,
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const AuthNavigator = () => {
  const {theme} = useTheme();
  const { t } = useTranslation();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: COLORS.primaryWhite,
        headerBackTitleVisible: false,
        headerStyle: {
          backgroundColor: COLORS.primaryGoldHex,
        },
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        transitionSpec: {
          open: config,
          close: closeConfig,
        },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WalletCreation"
        component={WalletCreationScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="SendAsset"
        component={SendAssetScreen}
        options={{
          title: `${t("sendasset:sendAsset")}`,
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="SendAssetPassword"
        component={EnterPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TokenDetails"
        component={TokenDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="TransactionDetails"
        component={TransactionDetails}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
       
      <Stack.Screen
        name="NotificationsScreen"
        component={NotificationsScreen}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          title: "Notifications",
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="QrScanner"
        component={QrScanner}
        options={{ headerShown: false}}
      />
      <Stack.Screen
        name="SendAssetAmount"
        component={SendAssetAmountScreen}
        options={{
          title: `${t("sendassetamount:sendAssetAmount")}`,
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.primaryBGColor,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTintColor: theme.textColor,
        }}
      />
      <Stack.Screen
        name="TransactionSuccess"
        component={TransactionSuccessScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TransactionFailure"
        component={TransactionFailureScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GameView"
        component={GameView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
