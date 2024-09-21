import React, { useEffect, useState } from 'react';
import { Dimensions, PermissionsAndroid, Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'; // Updated to Bottom Tab Navigator
import GameScreen from '../screens/GameScreen';
import WalletScreen from '../screens/WalletScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS, SPACING } from '../constants/theme';
import GameController from '../../assets/SVG/GameController';
import WalletIcon from '../../assets/SVG/WalletIcon';
import SettingsIcon from '../../assets/SVG/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useTheme } from '../utils/ThemeContext';
import messaging from '@react-native-firebase/messaging';
import { useAuth } from '../screens/auth/AuthContext';
// @ts-ignore
import { API_URL } from '@env';

const { height } = Dimensions.get('window');
const Tab = createBottomTabNavigator(); // Updated

const WalletTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();
  return (
    <WalletIcon
      size={24}
      fillColor={focused ? theme.primaryColor : theme.textColor}
    />
  );
};

const GameTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();
  return (
    <GameController
      size={32}
      fillColor={focused ? theme.primaryColor : theme.textColor}
    />
  );
};

const SettingsTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme();
  return (
    <SettingsIcon
      size={26}
      fillColor={focused ? theme.primaryColor : theme.textColor}
    />
  );
};

const BottomTabNavigator = () => {
  const [data, setData] = useState<any>(null);
  const { setAccountAddress } = useAuth();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  // Check for FCM token after login
  const checkFCMToken = async (authToken: string) => {
    try {
      await messaging().registerDeviceForRemoteMessages();
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await fetch(`${API_URL}/v1/messagings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ messaging_token: fcmToken }),
        });
      }
    } catch (error) {
      console.error('Failed to register FCM token:', error);
    }
  };

  const requestNotificationPermission = async () => {
    if (Platform.OS === 'android' && Platform.Version >= 33) {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
          {
            title: 'Notification Permission',
            message: 'This app needs access to your notifications',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          }
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn('Permission request error:', err);
        return false;
      }
    }
    return true; // No need to request permission for Android versions below 13
  };

  const checkPermissionAndRegisterToken = async (authToken: string) => {
    const hasPermission = await requestNotificationPermission();
    console.log('Notification permission granted:', hasPermission);

    if (hasPermission) {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;

      if (enabled) {
        await checkFCMToken(authToken);
      } else {
        console.log('User has not enabled notifications.');
      }
    }
  };

  useEffect(() => {
    const checkWalletAndPermissions = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          navigation.navigate('Login');
          return;
        }

        const { token, userId } = JSON.parse(userToken);

        // Request permission only after login
        await checkPermissionAndRegisterToken(token.accessToken);

        const response = await fetch(`${API_URL}/v1/users/${userId}/accounts`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (!response.ok) {
          navigation.navigate('WalletCreation');
          return;
        }

        const wallets = await response.json();

        if (wallets.metadata.count === 0) {
          navigation.navigate('WalletCreation');
        } else {
          setData(wallets);
          setAccountAddress(wallets.accounts[0].account_address);
        }
      } catch (error) {
        console.error('Error fetching wallets:', error);
      }
    };

    checkWalletAndPermissions();
  }, [navigation]);

  // Register background handler for FCM
  useEffect(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Wallet"
      screenOptions={{

        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          paddingTop: 2,
          paddingBottom: 6,
          backgroundColor: theme.secondaryBGColor,
        },
        // tabBarPressOpacity: 1,
        // tabBarPressColor: 'transparent',
      }}
    >
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{ tabBarIcon: WalletTabIcon }}
      />
      <Tab.Screen
        name="Game"
        component={GameScreen}
        options={{ tabBarIcon: GameTabIcon }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ tabBarIcon: SettingsTabIcon }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
