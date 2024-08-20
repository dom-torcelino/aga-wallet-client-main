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
import SendToken from '../components/SendToken';
import TokenDetails from '../components/TokenDetails';
import QrScanner from '../QrScanner';
import SendAmount from '../components/SendAmount';
import {Easing} from 'react-native';
import ResetPassword from '../components/ResetPassword';
import WalletCreationScreen from '../screens/WalletCreationScreen';
// import CreatePasswordScreen from '../screens/CreatePasswordScreen';
// import ConfirmPasswordScreen from '../screens/ConfirmPasswordScreen';
import TransactionSuccessScreen from '../screens/TransactionSuccessScreen';
import TransactionFailureScreen from '../screens/TransactionFailureScreen';
import EnterPasswordScreen from '../screens/EnterPasswordScreen';
import TransactionDetails from '../components/TransactionDetails';
import NotificationView from '../components/NotificationView';
import GameView from '../components/GameView';
import {useTheme} from '../utils/ThemeContext';

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
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{headerShown: false}}
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
        name="EnterPassword"
        component={EnterPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={BottomTabNavigator}
        options={{headerShown: false, gestureEnabled: false}}
      />
      <Stack.Screen
        name="SendToken"
        component={SendToken}
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
        name="NotificationView"
        component={NotificationView}
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
        name="QrScanner"
        component={QrScanner}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SendAmount"
        component={SendAmount}
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
        name="TransactionSuccessScreen"
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
