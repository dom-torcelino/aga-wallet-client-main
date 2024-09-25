import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  Image,
  BackHandler,
  Dimensions,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import HeaderBar from '../components/HeaderBar';
import CardBalance from '../components/CardBalance';
import Tabs from '../components/Tabs';
import Transaction from '../components/Transaction';
import Tokens, { Asset, TokenData } from '../components/Tokens';
import {
  useNavigation,
  NavigationProp,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
// @ts-ignore
import { API_URL } from '@env';
import { useAuth } from './auth/AuthContext';
import { useTheme } from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
import EmptyState from '../components/ui/EmptyState';
import NoWalletFoundImageDark from '../../assets/images/emptyState/NoWalletFound.png';
import NoWalletFoundImageLight from '../../assets/images/emptyState/NoWalletFoundLight.png';

const { height } = Dimensions.get('window');

const WalletScreen: React.FC = () => {
  const { t } = useTranslation(['wallet']);
  const [assets, setAssets] = useState<Asset[]>([]);
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { token, userId, setAccountAddress, setBalance, balance, loggedIn } = useAuth();
  const [activeTab, setActiveTab] = useState<string>(t("wallet:assets"));
  const tabs =  [t("wallet:assets"), t("wallet:transactions")]
  const [refreshing, setRefreshing] = useState(false);
  const [hasWallet, setHasWallet] = useState<boolean>(true);
  const { theme, isDarkMode } = useTheme();

  const onPressToken = (item: TokenData) => {
    navigation.navigate('TokenDetails', { token: item });
  };

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        BackHandler.exitApp();
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    return () => backHandler.remove();
  }, [isFocused]);

  const getWalletData = async () => {
    try {
      if (!loggedIn || !token || !userId) {
        throw new Error('User is not logged in or no user token/userId found');
      }

      const response = await fetch(`${API_URL}/v1/users/${userId}/accounts`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      if (response.ok) {
        const accountData = await response.json();
        const accountAddress = accountData.accounts[0]?.account_address;

        if (!accountAddress) {
          throw new Error('No account address found.');
        }

        setAccountAddress(accountAddress);
        setHasWallet(true);

        const response2 = await fetch(`${API_URL}/v1/users/${userId}/accounts/${accountAddress}`, {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
        });

        if (response2.ok) {
          const walletData = await response2.json();
          const freeBalance = walletData?.account_assets?.[0]?.free;
          if (freeBalance === undefined) {
            throw new Error('Free balance not found.');
          }

          setBalance(freeBalance);
        } else {
          console.log('response2 not ok');
        }
      } else {
        setHasWallet(false);
      }
    } catch (error) {
      setHasWallet(false);
      console.log('Error fetching wallet data:', error.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getWalletData();
    }, [])
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'assets': // Use identifier for switch
        return <Tokens onPressToken={onPressToken} />;
      case 'transactions': // Use identifier for switch
        return <Transaction />;
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

  const data = [{ key: 'content' }];

  console.log(!hasWallet)
  
  if (!hasWallet) {
    return (
      <View style={[styles.EmptyContainer, { backgroundColor: theme.primaryBGColor }]}>
        <EmptyState
          image={isDarkMode ? NoWalletFoundImageDark : NoWalletFoundImageLight}
          headerText={t('wallet:noWalletFound')}
          bodyText={t('wallet:noWalletDescription')}
          theme={theme}
          showButton={true}
          buttonText={t('wallet:createWallet')}
          onPressButton={handleCreateWallet}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.ScreenContainer, { backgroundColor: theme.primaryBGColor }]}>
        <FlatList
          style={styles.ScreenWrapper}
          data={data}
          keyExtractor={item => item.key}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <>
              <HeaderBar title={t('wallet:wallet')} showNotificationIcon={true} />
              <CardBalance balance={balance} />
              <Tabs
                tabs={tabs.map(tab => t(`wallet:${tab}`))} // Dynamically translate tab labels
                activeTab={t(`wallet:${activeTab}`)} // Translate active tab for display
                setActiveTab={(translatedTab) => {
                  const tabIdentifier = tabs[tabs.map(tab => t(`wallet:${tab}`)).indexOf(translatedTab)];
                  setActiveTab(tabIdentifier); // Set the identifier based on translation
                }}
              />
            </>
          }
          renderItem={() => <View>{renderTabContent()}</View>}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  }

 
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
  },
  ScreenWrapper: {
    paddingHorizontal: SPACING.space_16,
  },
  EmptyContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: SPACING.space_16,
  },
});

export default WalletScreen;
