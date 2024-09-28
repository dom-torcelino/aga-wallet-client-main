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
import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import MoneySendIcon from '../../assets/SVG/MoneySendIcon';
import MoneyReceivedIcon from '../../assets/SVG/MoneyReceivedIcon';
import EmptyTransactionDark from '../../assets/images/emptyState/EmptyTransaction.png';
import EmptyTransactionLight from '../../assets/images/emptyState/EmptyTransactionLight.png';
import { API_URL } from '@env';
import { useTheme } from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';
import EmptyState from './ui/EmptyState';
import { useAppContext } from '../state';

interface TransactionData {
  tx_id: number;
  tx_wallet_sender_address: string;
  tx_wallet_recipient_address: string;
  tx_amount: number;
  tx_status: string;
  tx_created_at: string;
  tx_updated_at: string;
  tx_type: string;
}

const { width } = Dimensions.get('window');

const groupByDate = (transactions: TransactionData[]) => {
  return transactions.reduce(
    (grouped: { title: string; data: TransactionData[] }[], transaction) => {
      const date = new Date(transaction.tx_created_at).toLocaleDateString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });
      const group = grouped.find(g => g.title === date);
      if (group) {
        group.data.push(transaction);
      } else {
        grouped.push({ title: date, data: [transaction] });
      }
      return grouped;
    },
    []
  );
};

const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
};

const Transaction: React.FC = () => {
  const { t } = useTranslation(['wallet']);
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const [transactionCount, setTransactionCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const skeletonCount = 5;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { theme, isDarkMode } = useTheme();
  const { state, dispatch } = useAppContext();
  const {loggedIn, accountAddress, accessToken} = state;

  const fetchTransactions = useCallback(async (isLoadMore = false) => {
    if (loggedIn && accountAddress) {
      try {
        const response = await axios.get(
          `${API_URL}/v1/accounts/${accountAddress}/transactions?limit=${limit}&sort_by=tx_id&order_by=desc`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        if (response.status === 200) {


          const transactions = response.data.transactions;

          if (isLoadMore) {
            setTransactions(prevTransactions => [...prevTransactions, ...transactions]);
          } else {
            setTransactions(transactions);
          }

          setTransactionCount(response.data.metadata.count);
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    }
  }, [accountAddress, loggedIn, limit]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const loadMore = async () => {
    if (transactions.length >= transactionCount || loadingMore) {
      return;
    }

    setLoadingMore(true);

    // Increase the limit to fetch more transactions
    setLimit(prevLimit => prevLimit + 10);

    // Call fetchTransactions to load more data
    await fetchTransactions(true);

    setLoadingMore(false);
  };

  const groupedData = groupByDate(transactions);

  const renderItem = ({ item }: { item: TransactionData | null }) => {
    if (!item) {
      return <TransactionSkeleton />;
    }

    const senderAddress = truncateAddress(item.tx_wallet_sender_address);
    const recipientAddress = truncateAddress(item.tx_wallet_recipient_address);

    return (
      <TouchableOpacity
        style={[
          styles.container,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}
        onPress={() => navigation.navigate('TransactionDetails', { transaction: item })}
      >
        <View style={styles.dataContainer}>
          <View style={[styles.iconWrapper, { backgroundColor: theme.layeBGColor }]}>
            {item.tx_type === 't' ? (
              <MoneySendIcon size={30} fillColor={'#C12727'} />
            ) : (
              <MoneyReceivedIcon size={30} fillColor={'#48B22E'} />
            )}
          </View>

          <View>
            <Text style={[styles.name, { color: theme.textColor }]}>
              {item.tx_type === 't' ?  recipientAddress : senderAddress}
            </Text>
            <Text style={[styles.type, { color: theme.secondaryTextColor }]}>
              {item.tx_type === 't' ? t('wallet:transfer') : t('wallet:receive')}
            </Text>
          </View>
        </View>

        <Text
          style={[
            styles.amount,
            {
              color: item.tx_type === 't' ? COLORS.redTextColor : COLORS.greenTextColor,
            },
          ]}
        >
          {item.tx_type === 't' ? `-${item.tx_amount}` : `+${item.tx_amount}`}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section: { title } }: { section: { title: string } }) => (
    <Text style={[styles.dateHeader, { color: theme.textColor }]}>{title}</Text>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.footer}>
        <ActivityIndicator size="large" color={theme.textColor} />
      </View>
    );
  };

  const renderEmptyState = () => (
    <View style={styles.emptyContainer}>
      <EmptyState
        image={isDarkMode ? EmptyTransactionDark : EmptyTransactionLight}
        headerText={t('wallet:emptyTransaction')}
        bodyText={t('wallet:emptyTransactionDescription')}
        theme={theme}
      />
    </View>
  );

  return (
    <View style={styles.TransactionStyles}>
      <SectionList
        sections={loading ? [{ title: '', data: Array(skeletonCount).fill(null) }] : groupedData}
        renderItem={loading ? () => <TransactionSkeleton /> : renderItem}
        renderSectionHeader={renderSectionHeader}
        keyExtractor={(item, index) => loading ? index.toString() : `${item.tx_id}:${index}`} // Ensure uniqueness
        ListFooterComponent={renderFooter}
        ListEmptyComponent={!loading && transactions.length === 0 ? renderEmptyState : null}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.1}
      />
      {/* {transactions.length < transactionCount && !loading && (
        <TouchableOpacity
          style={[styles.loadMoreButton, { backgroundColor: theme.layeBGColor, borderColor: theme.borderStroke }]}
          onPress={loadMore}
          disabled={loadingMore}
        >
          {loadingMore ? (
            <ActivityIndicator size="small" color={COLORS.primaryWhite} />
          ) : (
            <Text style={[styles.loadMoreText, { color: theme.textColor }]}>Load More</Text>
          )}
        </TouchableOpacity>
      )} */}
       {transactions.length < transactionCount && !loading && (
  loadingMore ? (
    <></>  // You can leave this empty or add a loading indicator
  ) : (
    <TouchableOpacity
      style={[styles.loadMoreButton, { backgroundColor: theme.layeBGColor, borderColor: theme.borderStroke }]}
      onPress={loadMore}
      disabled={loadingMore}
    >
      <Text style={[styles.loadMoreText, { color: theme.textColor }]}>{t('wallet:loadMore')}</Text>
    </TouchableOpacity>
  )
)}
    </View>
  );
};

const styles = StyleSheet.create({
  TransactionStyles: {
    flex: 1,
    marginBottom: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
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
});

export default Transaction;
