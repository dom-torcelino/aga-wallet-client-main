import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import MoneySendIcon from '../../assets/SVG/MoneySendIcon';
import MoneyReceivedIcon from '../../assets/SVG/MoneyReceivedIcon';
import {useAuth} from '../screens/auth/AuthContext';
import axios from 'axios';
import TransactionSkeleton from './ui/TransactionSkeleton'; // Import the skeleton loader component
// @ts-ignore
import {API_URL} from '@env';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../constants/types'; // Import the type

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

interface TransactionProps {
  onPressTransaction: (item: TransactionData) => void;
}

const {width} = Dimensions.get('window');

const groupByDate = (transactions: TransactionData[]) => {
  return transactions.reduce(
    (grouped: Record<string, TransactionData[]>, transaction) => {
      const date = new Date(transaction.tx_created_at).toDateString();
      if (!grouped[date]) {
        grouped[date] = [];
      }
      grouped[date].push(transaction);
      return grouped;
    },
    {},
  );
};

const truncateAddress = (address: string) => {
  return `${address.substring(0, 6)}...${address.substring(
    address.length - 4,
  )}`;
};

const Transaction: React.FC<TransactionProps> = () => {
  const [transactions, setTransactions] = useState<TransactionData[]>([]);
  const {token, accountAddress, loggedIn} = useAuth();
  const [loading, setLoading] = useState(true); // Add a loading state
  const skeletonCount = 5;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  useEffect(() => {
    let isMounted = true; // Add a flag to track if the component is mounted

    const fetchTransactions = async () => {
      if (loggedIn && accountAddress) {
        try {
          // console.log('Token:', token?.accessToken); // Log the token to inspect it

          const response = await axios.get(
            `${API_URL}/v1/wallets/${accountAddress}/transactions?limit=10&offset=0`,
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
            setTransactions(sortedTransactions);
          }
        } catch (error) {
          if (isMounted) {
            console.error('Error fetching transactions:', error);
          }
        } finally {
          if (isMounted) {
            setLoading(false); // Set loading to false after fetching data
          }
        }
      }
    };

    fetchTransactions();

    return () => {
      isMounted = false;
    };
  }, [token, accountAddress, loggedIn]);

  const groupedData = groupByDate(transactions);
  const renderItem = ({item}: {item: TransactionData}) => (
    <TouchableOpacity
      key={item.tx_id.toString()}
      style={styles.container}
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
          <Text style={styles.name}>
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

  const renderDateHeader = ({item: date}: {item: string}) => (
    <View>
      <Text style={styles.dateHeader}>{date}</Text>
      <FlatList
        data={groupedData[date]}
        renderItem={renderItem}
        keyExtractor={transaction => transaction.tx_id.toString()}
      />
    </View>
  );

  return (
    <FlatList
      data={loading ? Array(skeletonCount).fill('') : Object.keys(groupedData)} // Show skeletons while loading
      renderItem={loading ? () => <TransactionSkeleton /> : renderDateHeader}
      keyExtractor={(item, index) => (loading ? index.toString() : item)}
      contentContainerStyle={styles.TransactionStyles}
      scrollEnabled={false}
    />
  );
};

const styles = StyleSheet.create({
  TransactionStyles: {
    marginBottom: 90,
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
    marginTop: SPACING.space_15,
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
});

export default Transaction;
