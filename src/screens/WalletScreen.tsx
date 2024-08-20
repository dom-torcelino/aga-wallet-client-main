import {
  StatusBar,
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CardBalance from '../components/CardBalance';
import Tabs from '../components/Tabs';
import Transaction from '../components/Transaction';
import Tokens from '../components/Tokens';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import {mockTokens, TokenData} from '../data/mockData';
import {RootStackParamList} from '../constants/types';
import {API_URL} from '@env';
import {useAuth} from './auth/AuthContext';
import {useCallback} from 'react';

const walletTabs = ['Assets', 'Transaction'];

const WalletScreen: React.FC = () => {
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {token, userId, setAccountAddress, setBalance, balance, loggedIn} =
    useAuth();
  const [activeTab, setActiveTab] = useState(walletTabs[0]);
  const [refreshing, setRefreshing] = useState(false);
  const [hasWallet, setHasWallet] = useState<boolean>(true);

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        // Exit the app when back button is pressed on Wallet screen
        BackHandler.exitApp();
        return true;
      }
      return false; // Let other screens handle the back press normally
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);

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

      if (response.ok) {
        const wallet = await response.json();
        if (wallet.wallets.length > 0) {
          const fetchedAccountAddress = wallet.wallets[0].accountAddress;
          const fetchedBalance = wallet.wallets[0].free;

          setAccountAddress(fetchedAccountAddress);
          setBalance(fetchedBalance);
          setHasWallet(true);
        } else {
          setHasWallet(false);
        }
      } else {
        setHasWallet(false);
        console.log('Failed to fetch wallet address');
      }
    } catch (error) {
      // console.error('Failed to fetch wallet data:', error);
      console.log('Failed to fetch wallet data:');
      setHasWallet(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // This will be called when the screen is focused (i.e., after navigating back)
      getWalletData();
    }, []),
  );

  const onPressToken = (item: TokenData) => {
    navigation.navigate('TokenDetails', {token: item});
  };

  const onPressTransaction = (item: TokenData) => {
    navigation.navigate('TransactionDetails', {token: item});
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Transaction':
        return <Transaction onPressTransaction={onPressTransaction} />;
      case 'Assets':
        return <Tokens data={mockTokens} onPressToken={onPressToken} />;
      default:
        return null;
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    getWalletData().finally(() => setRefreshing(false));
  };

  const handleCreateWallet = () => {
    navigation.navigate('WalletCreation');
  };

  const data = [{key: 'content'}]; // Dummy data for FlatList

  if (!hasWallet) {
    // Show button to create a wallet if no wallet exists
    return (
      <View style={styles.EmptyContainer}>
        <View style={styles.ImageContainer}>
          <Image
            source={require('../../assets/images/emptyState/NoWalletFound.png')}
            style={styles.emptyStateImage}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.emptyStateHeaderText}>No wallet found</Text>
        <Text style={styles.bodyText}>
          You cant use this feature if you {'\n'}have no wallet{' '}
        </Text>
        {/* <Button title="Create Wallet" onPress={handleCreateWallet} /> */}
        <TouchableOpacity
          onPress={handleCreateWallet}
          activeOpacity={0.7}
          style={styles.createWalletBtn}>
          <Text style={styles.createWalletText}>Create Wallet</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBGColor} />

      <FlatList
        style={styles.ScreenWrapper}
        data={data}
        keyExtractor={item => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <HeaderBar title="Wallet" />
            <CardBalance balance={balance} />
            <Tabs
              tabs={walletTabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        }
        renderItem={() => <View>{renderTabContent()}</View>}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
  },
  ScreenWrapper: {
    paddingHorizontal: SPACING.space_16,
  },
  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: SPACING.space_16,
  },
  ImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  emptyStateHeaderText: {
    fontSize: 20,
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_medium,
    marginBottom: 10,
    textAlign: 'center',
  },
  bodyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginBottom: SPACING.space_24,
  },
  createWalletBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryGoldHex,
    padding: 10,
    borderRadius: 10,
  },
  createWalletText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default WalletScreen;
