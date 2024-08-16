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
import {useNavigation, NavigationProp} from '@react-navigation/native';
import axios from 'axios';
import {useAuth} from '../screens/auth/AuthContext';
import {RootStackParamList} from '../constants/types';
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

const {height, width} = Dimensions.get('window');

const TransactionSuccessScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [lastTransaction, setLastTransaction] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const {token, accountAddress, loggedIn} = useAuth();
  const formatDate = (date: string) => {
    return moment(date).format('MMMM DD, YYYY, h:mm:ss A');
  };

  useEffect(() => {
    const fetchLastTransaction = async () => {
      if (loggedIn && accountAddress) {
        try {
          // First fetch to get the count of transactions
          const metadataResponse = await axios.get(
            `${API_URL}/v1/wallets/${accountAddress}/transactions?limit=1&offset=0`,
            {
              headers: {
                Authorization: `Bearer ${token?.accessToken}`,
              },
            },
          );

          const totalTransactions = metadataResponse.data.metadata.count;

          // Fetch the most recent transaction using the count - 1 as the offset
          if (totalTransactions > 0) {
            const lastTransactionResponse = await axios.get(
              `${API_URL}/v1/wallets/${accountAddress}/transactions?limit=1&offset=${
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
              setLastTransaction(lastTransactionResponse.data.transactions[0]);
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primaryWhite} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.transferHeader}>
        <Image
          source={require('../../assets/images/emptyState/TransferSuccess.png')}
          style={styles.TransferDoneImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Transaction Done!</Text>
        <Text style={styles.bodyText}>
          Transaction has been done {'\n'}successfully
        </Text>
        <Text style={styles.timeText}>
          {formatDate(lastTransaction.tx_created_at)}
        </Text>
      </View>

      <View style={styles.transferDetails}>
        <Text style={styles.h2}>Transaction Details</Text>
        {lastTransaction ? (
          <>
            {/* <Text style={styles.detailText}>
              Transaction ID: {lastTransaction.tx_id}
            </Text> */}
            <View style={styles.TransactionContainer}>
              <Text style={styles.detailText}>Amount</Text>
              <Text style={styles.apiText}>{lastTransaction.tx_amount}</Text>
            </View>
            <View style={styles.TransactionContainer}>
              <Text style={styles.detailText}>Receiver</Text>
              <Text style={styles.apiText}>
                {lastTransaction.tx_wallet_recipient_address}
              </Text>
            </View>
            <View style={styles.TransactionContainer}>
              <Text style={styles.detailText}>Transaction Hash</Text>
              <Text style={styles.apiText}>{lastTransaction.tx_hash}</Text>
            </View>
            {/* <Text style={styles.detailText}>
              Transaction Hash: {lastTransaction.tx_hash}
            </Text> */}
            {/* <Text style={styles.detailText}>
              Status: {lastTransaction.tx_status === 's' ? 'Success' : 'Failed'}
            </Text> */}
            {/* <Text style={styles.detailText}>
              Receiver: {lastTransaction.tx_wallet_recipient_address}
            </Text> */}
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
          <Text style={styles.buttonText}>Back to Wallet</Text>
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
  title: {
    fontSize: FONTSIZE.size_20,
    marginBottom: 4,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhite,
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
