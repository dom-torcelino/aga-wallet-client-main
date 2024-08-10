/* eslint-disable prettier/prettier */
import { StatusBar, StyleSheet, View, RefreshControl } from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, SPACING } from '../constants/theme';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBar from '../components/HeaderBar';
import CardBalance from '../components/CardBalance';
import Tabs from '../components/Tabs';
import Transaction from '../components/Transaction';
import Tokens from '../components/Tokens';
// import NFT from '../components/NFT';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { mockTokens, TokenData } from '../data/mockData';
import { RootStackParamList } from '../constants/types';
// @ts-ignore
import { API_URL } from '@env';
import { useAuth } from './auth/AuthContext';

const walletTabs = ['Assets', 'Transaction' ];

const WalletScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, userId, setAccountAddress, setBalance, balance, loggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState(walletTabs[0]);
  const [refreshing, setRefreshing] = React.useState(false);

  useEffect(() => {
    let isMounted = true;

    const getWalletData = async () => {
      try {
        if (!loggedIn || !token || !userId) {
          throw new Error('User is not logged in or no user token/userId found');
        }

        const response = await fetch(`${API_URL}/v1/users/${userId}/wallets`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (isMounted && response.ok) {
          const wallet = await response.json();
          const fetchedAccountAddress = wallet.wallets[0].accountAddress;
          const fetchedBalance = wallet.wallets[0].free;

          setAccountAddress(fetchedAccountAddress);
          setBalance(fetchedBalance);
        } else {
          throw new Error('Failed to fetch wallet address');
        }
      } catch (error) {
        if (isMounted){
          // console.error('Failed to fetch wallet data:', error);
        }
      }
    };

    if (loggedIn) {
      getWalletData();
    }

    return () => {
      isMounted = false;
    }
  }, [token, userId, loggedIn, setAccountAddress, setBalance]);

  const onPressToken = (item: TokenData) => {
    navigation.navigate('TokenDetails', { token: item });
  };

  const onPressTransaction = (item: TokenData) => {
    navigation.navigate('TransactionDetails', { token: item });
  };

  const displayTabContent = () => {
    switch (activeTab) {
      case 'Transaction':
        return <Transaction title="Transaction"
        // data={mockTransactions}
        onPressTransaction={onPressTransaction}
        />;
      case 'Assets':
        return <Tokens title="Assets" data={mockTokens} onPressToken={onPressToken} />;
        
      default:
        return null;
    }
  };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBGColor} />
      <HeaderBar title={'Wallet'} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex} refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <CardBalance balance={balance} />
        <Tabs tabs={walletTabs} activeTab={activeTab} setActiveTab={setActiveTab} />
        {displayTabContent()}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: SPACING.space_20,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
});

export default WalletScreen;
