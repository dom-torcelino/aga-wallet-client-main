
/* eslint-disable react/no-unstable-nested-components*/
import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import GameScreen from '../screens/GameScreen';
import WalletScreen from '../screens/WalletScreen';
import SettingsScreen from '../screens/SettingsScreen';
import { COLORS } from '../constants/theme';
import GameController from '../../assets/SVG/GameController';
import WalletIcon from '../../assets/SVG/WalletIcon';
import SettingsIcon from '../../assets/SVG/Settings';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// import authFetch from '../utils/authFetch';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
// @ts-ignore
import { API_URL } from '@env';

const { height } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [data, setData] = useState<any>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    const checkWallet = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (!userToken) {
          navigation.navigate('Login');
          return;
        }

        const { token, userId } = JSON.parse(userToken); // Adjusted to extract userId
        const response = await fetch(`${API_URL}/v1/users/${userId}/wallets`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`, // Assuming Bearer token
          },
        });

        if (!response.ok) {
          // If the response is not OK, navigate to WalletCreation
          navigation.navigate('WalletCreation');

          return;
        }

        const wallets = await response.json();
        // console.log(wallets);
        if (wallets.length === 0) {
          navigation.navigate('WalletCreation');
        } else {
          setData(wallets);
          // console.log('have a wallet');
        }
      } catch (error) {
        // console.error('Failed to fetch wallets:', error);
        // console.log('hello');
      }
    };

    checkWallet();
  }, [navigation]);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: styles.tabBarStyle,
        }}>
        <Tab.Screen
          name="Wallet"
          component={WalletScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <WalletIcon
                size={28}
                fillColor={focused ? COLORS.primaryColor : COLORS.primaryWhite}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Game"
          component={GameScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <GameController
                size={36}
                fillColor={focused ? COLORS.primaryColor : COLORS.primaryWhite}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarIcon: ({ focused }) => (
              <SettingsIcon
                size={28}
                fillColor={focused ? COLORS.primaryColor : COLORS.primaryWhite}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: height * 0.08,
    position: 'absolute',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: COLORS.secondaryBGColor,
    borderWidth: 0,
    elevation: 0,
    borderColor: 'transparent',
  },
});

export default BottomTabNavigator;
