import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, NavigationProp, useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import {useAuth} from '../screens/auth/AuthContext';
import {RootStackParamList} from '../types/types';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
// @ts-ignore
import {API_URL} from '@env';
import moment from 'moment';
import {useTheme} from '../utils/ThemeContext';
import TransferSuccessImageDark from '../../assets/images/emptyState/TransferSuccessDark.png';
import TransferSuccessImageLight from '../../assets/images/emptyState/TransferSuccessLight.png';
import { useTranslation } from 'react-i18next';

const {height, width} = Dimensions.get('window');

type TransactionSuccessRouteProp = RouteProp<RootStackParamList, 'TransactionSuccess'>;

const TransactionSuccessScreen: React.FC = () => {
  const { t } = useTranslation("transactionsuccess");
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<TransactionSuccessRouteProp>();

  const { blockHash, transactionHash, timestamp, amount, destination_address } = route.params;
  
  const [transaction, setTransaction] = useState<Record<string, string> | null>(null)
  const [loading, setLoading] = useState<boolean>(true);
  const {token, accountAddress, loggedIn} = useAuth();
  const formatDate = (date: string) => {
    return moment(date).format('MMMM DD, YYYY, h:mm:ss A');
  };
  const {isDarkMode, theme} = useTheme();

  useEffect(() => {
    const fetchLastTransaction = async () => {
      if (loggedIn && accountAddress) {
        try {
          // Fetch metadata to get the total count of transactions
          const metadataResponse = await axios.get(
            `${API_URL}/v1/accounts/${accountAddress}/transactions?limit=1&offset=0`,
            {
              headers: {
                Authorization: `Bearer ${token?.accessToken}`,
              },
            },
          );
  
          const totalTransactions = metadataResponse.data.metadata.count;
          // console.log('metadataResponse:', metadataResponse);
          // console.log('totalTransactions:', totalTransactions);
  
          if (totalTransactions > 0) {
            // Fetch the last transaction using the offset based on the total count
            const lastTransactionResponse = await axios.get(
              `${API_URL}/v1/accounts/${accountAddress}/transactions?limit=1&offset=${
                totalTransactions - 1
              }`,
              {
                headers: {
                  Authorization: `Bearer ${token?.accessToken}`,
                },
              },
            );
  
            if (
              lastTransactionResponse.status === 200 &&
              lastTransactionResponse.data.transactions.length > 0
            ) {
              // Set the last transaction as the current transaction
              setTransaction(lastTransactionResponse.data.transactions[0]);
            }
          }
        } catch (error) {
          console.error('Error fetching last transaction:', error);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchLastTransaction();
  }, [token, accountAddress, loggedIn]);
  
  if (loading || !transaction) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryWhite} />
      </View>
    );
  }

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      <View style={styles.transferHeader}>
        <Image
          source={isDarkMode ? TransferSuccessImageDark : TransferSuccessImageLight}
          style={styles.TransferDoneImage}
          resizeMode="contain"
        />
        <Text style={[styles.title, {color: theme.textColor}]}>
          {t("transactionsuccess:transactionDone")}
        </Text>
        <Text style={[styles.bodyText, {color: theme.secondaryTextColor}]}>
          {t("transactionsuccess:transactionDoneDescription")}
        </Text>
        <Text style={[styles.timeText, {color: theme.textColor}]}>
          {formatDate(transaction.tx_created_at)}
        </Text>
      </View>

      <View style={styles.transferDetails}>
        <Text style={[styles.h2, {color: theme.textColor}]}>
        {t("transactionsuccess:transactionDetails")}
        </Text>
        {transaction ? (
          <>
            <View
              style={[
                styles.TransactionContainer,
                {
                  backgroundColor: theme.secondaryBGColor,
                  borderColor: theme.borderStroke,
                },
              ]}>
              <Text
                style={[styles.detailText, {color: theme.secondaryTextColor}]}>
                {t("transactionsuccess:amount")}
              </Text>
              <Text style={[styles.apiText, {color: theme.textColor}]}>
                {/* {transaction.tx_amount} */}
                {amount}
              </Text>
            </View>
            <View
              style={[
                styles.TransactionContainer,
                {
                  backgroundColor: theme.secondaryBGColor,
                  borderColor: theme.borderStroke,
                },
              ]}>
              <Text style={styles.detailText}>{t("transactionsuccess:receiver")}</Text>
              <Text style={[styles.apiText, {color: theme.textColor}]}>
                {/* {transaction.tx_wallet_recipient_address} */}
                {destination_address}
              </Text>
            </View>
            <View
              style={[
                styles.TransactionContainer,
                {
                  backgroundColor: theme.secondaryBGColor,
                  borderColor: theme.borderStroke,
                },
              ]}>
              <Text style={styles.detailText}>{t("transactionsuccess:transactionHash")}</Text>
              <Text style={[styles.apiText, {color: theme.textColor}]}>
                {/* {transaction.tx_hash} */}
                {blockHash}
              </Text>
            </View>
          </>
        ) : (
          <Text style={styles.detailText}>
            No transaction details available
          </Text>
        )}
      </View>

      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={[styles.buttonText, {color: theme.primaryBGColor}]}>
            Back to Wallet
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primaryBGColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  transferHeader: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.space_16,
  },
  transferDetails: {
    justifyContent: 'flex-start',
    width: '100%',
  },
  title: {
    fontSize: FONTSIZE.size_20,
    marginBottom: 4,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhite,
  },
  TransactionContainer: {
    borderRadius: 12,
    paddingVertical: width * 0.018,
    paddingHorizontal: width * 0.028,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    backgroundColor: COLORS.secondaryBGColor,
    justifyContent: 'center',
  },

  h2: {
    fontSize: FONTSIZE.size_18,
    marginBottom: 10,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhite,
  },
  bodyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  timeText: {
    color: COLORS.primaryWhite,
  },
  detailText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryTextColor,
    marginBottom: 10,
  },
  apiText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
  },
  nextButtonContainer: {
    height: height * 0.07,
    width: '100%',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryGoldHex,
    borderRadius: BORDERRADIUS.radius_15,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  TransferDoneImage: {
    width: 150,
    height: 120,
    marginVertical: SPACING.space_24,
  },
});

export default TransactionSuccessScreen;
