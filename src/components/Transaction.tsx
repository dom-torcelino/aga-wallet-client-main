import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton'; // Import the skeleton loader component
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types'; // Import the type
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import MoneySendIcon from '../../assets/SVG/MoneySendIcon';
import MoneyReceivedIcon from '../../assets/SVG/MoneyReceivedIcon';
// @ts-ignore
import {API_URL} from '@env';
import {useTheme} from '../utils/ThemeContext';

interface TransactionData {
  tx_id: number;
  tx_wallet_sender_address: string;
  tx_wallet_recipient_address: string;
  tx_amount: number;
  tx_status: string;
  tx_hash: string;
  tx_block_hash: string;
  tx_created_at: string;
  tx_updated_at: string;
  tx_type: string;
}

const {width} = Dimensions.get('window');

const groupByDate = (transactions: TransactionData[]) => {
  return transactions.reduce(
    (grouped: {title: string; data: TransactionData[]}[], transaction) => {
      const date = new Date(transaction.tx_created_at).toDateString();
      const group = grouped.find(g => g.title === date);
      if (group) {
        group.data.push(transaction);
      } else {
        grouped.push({title: date, data: [transaction]});
      }
      return grouped;
    },
    [],
  );
};

const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
  )}`;
};

const Transaction: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10); // Initial limit set to 10
  const {token, accountAddress, loggedIn} = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const skeletonCount = 5;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isDarkMode, toggleTheme, theme} = useTheme();

  useEffect(() => {
    let isMounted = true;

    const fetchTransactions = async () => {
      if (loggedIn && accountAddress) {
        try {
          const response = await axios.get(
            `${API_URL}/v1/wallets/${accountAddress}/transactions?limit=${limit}&offset=${Math.max(
              0,
              transactionCount - limit,
            )}`,
            {
              headers: {
                Authorization: `Bearer ${token?.accessToken}`,
              },
            },
          );

          if (isMounted && response.status === 200) {
            const sortedTransactions = response.data.transactions.sort(
              (a: TransactionData, b: TransactionData) =>
                new Date(b.tx_created_at).getTime() -
                new Date(a.tx_created_at).getTime(),
            );
            setTransactionCount(response.data.metadata.count);
            setTransactions(sortedTransactions);
          }
        } catch (error) {
          if (isMounted) {
            // console.error('Error fetching transactions:', error);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, [token, accountAddress, loggedIn, transactionCount, limit]);

  useEffect(() => {
    const intervalId = setInterval(async () => {
      if (loggedIn && accountAddress) {
        try {
          const response = await axios.get(
            `${API_URL}/v1/wallets/${accountAddress}/transactions?limit=1&offset=0`,
            {
              headers: {
                Authorization: `Bearer ${token?.accessToken}`,
              },
            },
          );

          if (
            response.status === 200 &&
            response.data.metadata.count > transactionCount
          ) {
            // setTransactionCount(response.data.metadata.count);
          }
        } catch (error) {
          // console.error('Error polling transactions:', error);
        }
      }
    }, 10000); // Poll every 10 seconds

    return () => clearInterval(intervalId);
  }, [transactionCount, loggedIn, accountAddress, token]);

  const groupedData = groupByDate(transactions);

  const loadMore = async () => {
    if (transactions.length >= transactionCount) {
      return; // No more transactions to load
    }

    setLoadingMore(true);
    setLimit(prevLimit => prevLimit + 10); // Increase the limit by 10
    setLoadingMore(false);
  };

  const renderItem = ({item}: {item: TransactionData}) => (
    <TouchableOpacity
      key={item.tx_id.toString()}
      style={[
        styles.container,
        {
          backgroundColor: theme.secondaryBGColor,
          borderColor: theme.borderStroke,
        },
      ]}
      onPress={() =>
        navigation.navigate('TransactionDetails', {transaction: item})
      }>
      <View style={styles.dataContainer}>
        <View style={styles.iconWrapper}>
          {item.tx_type === 't' ? (
            <MoneySendIcon size={30} fillColor={'#C12727'} />
          ) : (
            <MoneyReceivedIcon size={30} fillColor={'#48B22E'} />
          )}
        </View>
        <View>
          <Text style={[styles.name, {color: theme.textColor}]}>
            {item.tx_type === 't'
              ? truncateAddress(item.tx_wallet_recipient_address)
              : truncateAddress(item.tx_wallet_sender_address)}
          </Text>
          <Text style={styles.type}>
            {item.tx_type === 't' ? 'transfer' : 'received'}
          </Text>
        </View>
      </View>
      <Text
        style={[
          styles.amount,
          {
            color:
              item.tx_type === 't'
                ? COLORS.redTextColor
                : COLORS.greenTextColor,
          },
        ]}>
        {item.tx_type === 't' ? `-${item.tx_amount}` : `+${item.tx_amount}`}
      </Text>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({
    section: {title},
  }: {
    section: {title: string};
  }) => (
    <Text style={[styles.dateHeader, {color: theme.textColor}]}>{title}</Text>
  );

  const renderFooter = () => {
    if (!loadingMore) {
      return null;
    }

    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={COLORS.primaryWhite} />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Image
        source={require('../../assets/images/emptyState/EmptyTransaction.png')}
        style={styles.emptyStateImage}
        resizeMode="contain"
      />
      <Text style={styles.emptyStateHeaderText}>Empty Transaction</Text>
      <Text style={styles.bodyText}>
        It seems there are no transaction added yet{' '}
      </Text>
    </View>
  );

  return (
    <View style={styles.TransactionStyles}>
      <SectionList
        sections={
          loading
            ? [{title: '', data: Array(skeletonCount).fill(null)}]
            : groupedData
        }
        renderItem={loading ? () => <TransactionSkeleton /> : renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) =>
          loading ? index.toString() : item.tx_id.toString()
        }
        ListFooterComponent={renderFooter}
        ListEmptyComponent={
          !loading && transactions.length === 0 ? renderEmptyState : null
        }
        onEndReached={loadMore}
        onEndReachedThreshold={0.1} // Fetch more data when the list is close to the end
      />
      {transactions.length < transactionCount && !loading && (
        <TouchableOpacity
          style={styles.loadMoreButton}
          onPress={loadMore}
          disabled={loadingMore}>
          {loadingMore ? (
            <ActivityIndicator size="small" color={COLORS.primaryWhite} />
          ) : (
            <Text style={styles.loadMoreText}>Load More</Text>
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  TransactionStyles: {
    // marginBottom: 20,
  },
  dateHeader: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    marginTop: 20,
    color: COLORS.primaryWhite,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    marginTop: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: 12,
    padding: width * 0.026,
    justifyContent: 'space-between',
  },
  dataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconWrapper: {
    marginRight: 10,
    backgroundColor: COLORS.layeBGColor,
    padding: 10,
    borderRadius: 20,
  },
  name: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    lineHeight: 34,
  },
  type: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  amount: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
  },
  loadMoreButton: {
    backgroundColor: COLORS.layeBGColor,
    padding: 10,
    marginVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
  },
  loadMoreText: {
    color: COLORS.textColor,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    // backgroundColor: 'red',
  },
  emptyStateHeaderText: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
  },
  emptyStateImage: {
    width: 150,
    height: 150,
    marginVertical: 10,
  },
  bodyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
});

export default Transaction;
