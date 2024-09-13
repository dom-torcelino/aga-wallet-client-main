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
import React, {useState, useEffect} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
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
import {RootStackParamList} from '../types/types';
//@ts-ignore
import {API_URL} from '@env';
import {useAuth} from './auth/AuthContext';
import {useCallback} from 'react';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
import EmptyState from '../components/ui/EmptyState';
import NoWalletFoundImageDark from '../../assets/images/emptyState/NoWalletFound.png';
import NoWalletFoundImagelight from '../../assets/images/emptyState/NoWalletFoundLight.png';

const {height} = Dimensions.get('window');

const WalletScreen: React.FC = () => {
  const { t } = useTranslation(["wallet"]);
  const [assets, setAssets] = useState<Asset[]>([])
  const isFocused = useIsFocused();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {token, userId, setAccountAddress, setBalance, balance, loggedIn} = useAuth();
  const [activeTab, setActiveTab] = useState<string>(t("wallet:assets"));
  const tabs =  [t("wallet:assets"), t("wallet:transactions")]
  const [refreshing, setRefreshing] = useState(false);
  const [hasWallet, setHasWallet] = useState<boolean>(true);
  const { theme, isDarkMode } = useTheme();
  

  const onPressToken = (item: TokenData) => {
    navigation.navigate('TokenDetails', {token: item});
  };

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        BackHandler.exitApp();
        <div className="
        "></div>
        return true;
      }
      return false;
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

      const response = await fetch(`${API_URL}/v1/users/${userId}/accounts`, {
        headers: {
          Authorization: `Bearer ${token.accessToken}`,
        },
      });

      
      
      if (response.ok) {
        const walletData = await response.json();
        // console.log(walletData.accounts[0].account_address);

        // console.log(walletData.metadata.count > 0);
        if (walletData.metadata.count > 0) {
          const wallet = walletData.accounts[0]
          setAccountAddress(walletData.accounts[0].account_address);
          setBalance(wallet.free); //TODO FIX BALANCE IN BACKEND
          setHasWallet(true);
          
          const asset = {
            tokenSymbol: wallet.tokenSymbol,
            walletAddress: wallet.accountAddress,
            balance: wallet.free
          } as Asset
          setAssets([asset])
          
        } else {
          setHasWallet(false);
        }
      } else {
        setHasWallet(false);
      }
    } catch (error) {
      setHasWallet(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      getWalletData();
    }, []),
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case t("wallet:assets"):
        return <Tokens onPressToken={onPressToken} />;
      case t("wallet:transactions"):
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

  const data = [{key: 'content'}];
  if (!hasWallet) {
    return (
      <View
        style={[
          styles.EmptyContainer,
          {backgroundColor: theme.primaryBGColor},
        ]}>
          <EmptyState
            image = {isDarkMode ? NoWalletFoundImageDark : NoWalletFoundImagelight}
            headerText = {t("wallet:noWalletFound")}
            bodyText = {t("wallet:noWalletDescription")}
            theme = {theme}
            showButton ={true}
            buttonText = {t("wallet:createWallet")}
            onPressButton={handleCreateWallet}
          />
        {/* <View style={styles.ImageContainer}> 
          <Image
            source={isDarkMode ? NoWalletFoundImageDark : NoWalletFoundImagelight}
            style={styles.emptyStateImage}
            resizeMode="contain"
          />
        </View>
        <Text 
          style={[
            styles.emptyStateHeaderText, 
            {color: theme.secondaryTextColor }
          ]}
        >
          {t("wallet:noWalletFound")}
        </Text>
        <Text style={styles.bodyText}>
          {t("wallet:noWalletDescription")}
        </Text>
        <TouchableOpacity
          onPress={handleCreateWallet}
          activeOpacity={0.7}
          style={styles.createWalletBtn}>
          <Text style={[styles.createWalletText, {color: theme.primaryBGColor}]}>{t("wallet:createWallet")}</Text>
        </TouchableOpacity> */}
      </View>
    );
  }

  return (
    <View style={[styles.ScreenContainer, {backgroundColor: theme.primaryBGColor}]}>
      <FlatList
        style={styles.ScreenWrapper}
        data={data}
        keyExtractor={item => item.key}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListHeaderComponent={
          <>
            <HeaderBar title={t("wallet:wallet")} showNotificationIcon={true} />
            <CardBalance balance={balance} />
            <Tabs
              tabs={tabs}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
            />
          </>
        }
        renderItem={() => <View>{renderTabContent()}</View>
      }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
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
    height: height * 0.06,
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
