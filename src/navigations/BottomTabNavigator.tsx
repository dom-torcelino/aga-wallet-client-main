import React, {useEffect, useState} from 'react';
import {Dimensions} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import GameScreen from '../screens/GameScreen';
import WalletScreen from '../screens/WalletScreen';
import SettingsScreen from '../screens/SettingsScreen';
import {COLORS, SPACING} from '../constants/theme';
import GameController from '../../assets/SVG/GameController';
import WalletIcon from '../../assets/SVG/WalletIcon';
import SettingsIcon from '../../assets/SVG/Settings';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
// @ts-ignore
import {API_URL} from '@env';
import { useTheme } from '../utils/ThemeContext';

const {height} = Dimensions.get('window');
// const Tab = createBottomTabNavigator();
const Tab = createMaterialTopTabNavigator();

const WalletTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme(); // Get the theme
  return (
    <WalletIcon
      size={24}
      fillColor={focused ? theme.primaryColor : theme.textColor} // Use dynamic colors
    />
  );
};

const GameTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme(); // Get the theme
  return (
    <GameController
      size={32}
      fillColor={focused ? theme.primaryColor : theme.textColor} // Use dynamic colors
    />
  );
};

const SettingsTabIcon = ({ focused }: { focused: boolean }) => {
  const { theme } = useTheme(); // Get the theme
  return (
    <SettingsIcon
      size={24}
      fillColor={focused ? theme.primaryColor : theme.textColor} // Use dynamic colors
    />
  );
};

const BottomTabNavigator = () => {
  const [data, setData] = useState<any>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme } = useTheme();

  useEffect(() => {
    const checkWallet = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          navigation.navigate('Login');
          return;
        }

        const {token, userId} = JSON.parse(userToken); // Adjusted to extract userId
        const response = await fetch(`${API_URL}/v1/users/${userId}/wallets`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`, // Assuming Bearer token
          },
        });

        if (!response.ok) {
          navigation.navigate('WalletCreation');
          return;
        }

        const wallets = await response.json();
        if (wallets.length === 0) {
          navigation.navigate('WalletCreation');
        } else {
          setData(wallets);
        }
      } catch (error) {
        // Handle error
      }
    };

    checkWallet();
  }, [navigation]);
  return (
    <Tab.Navigator
      tabBarPosition="bottom"
      initialRouteName="Wallet"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarIndicatorStyle: {
          height: 0,
        },
        tabBarStyle: {
          padding: SPACING.space_8,
          backgroundColor: theme.secondaryBGColor,
        },
        tabBarPressOpacity: 1,
        tabBarPressColor: 'transparent',
      }}>
      <Tab.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          tabBarIcon: WalletTabIcon,
        }}
      />
      <Tab.Screen
        name="Game"
        component={GameScreen}
        options={{
          tabBarIcon: GameTabIcon,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: SettingsTabIcon,
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
