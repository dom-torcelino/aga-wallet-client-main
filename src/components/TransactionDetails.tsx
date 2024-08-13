import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';

import {RootStackParamList} from '../constants/types'; // Import the type
import moment from 'moment';
import BackButton from './ui/BackButton';


type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

const TransactionDetails: React.FC = () => {
  const route = useRoute<TransactionDetailsRouteProp>();
  const {transaction} = route.params;

  const formatTransactionType = (type: string) => {
    return type === 't' ? 'Transferred' : 'Received';
  };

  const statusType = (type: string) => {
    return type === 's' ? 'Success' : 'Failed';
  };

  const formatDate = (date: string) => {
    return moment(date).format('MMMM DD, YYYY, h:mm:ss A');
  };

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.settingsWrapper}>
        <Text style={styles.label}>
          {formatTransactionType(transaction.tx_type)}
        </Text>
        <Text style={styles.amountText}>{transaction.tx_amount}</Text>

        <Text style={styles.label}>From</Text>
        <Text style={styles.detail}>
          {transaction.tx_wallet_sender_address}
        </Text>

        <Text style={styles.label}>To</Text>
        <Text style={styles.detail}>
          {transaction.tx_wallet_recipient_address}
        </Text>

        <Text style={styles.label}>Transaction ID</Text>
        <Text style={styles.detail}>{transaction.tx_id}</Text>

        <Text style={styles.label}>Status</Text>
        <Text style={styles.detail}>{statusType(transaction.tx_status)}</Text>

        <Text style={styles.label}>Date</Text>
        <Text style={styles.detail}>
          {formatDate(transaction.tx_created_at)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    padding: 20,
  },

  settingsWrapper: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
  },
  amountText: {
    fontSize: 40,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryWhite,
    marginTop: 10,
  },
  detail: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    marginBottom: 10,
  },
});

export default TransactionDetails;
