import React, {useRef} from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity, Dimensions, Alert, } from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {captureRef} from 'react-native-view-shot';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import Share from 'react-native-share';

import {RootStackParamList} from '../types/types'; // Import the type
import moment from 'moment';
import BackButton from './ui/BackButton';
import {useTheme} from '../utils/ThemeContext';
import successIcon from '../../assets/images/SuccessIcon.png'
import errorIcon from '../../assets/images/ErrorIcon.png'
import MoneySendIcon from '../../assets/SVG/MoneySendIcon';
import MoneyReceivedIcon from '../../assets/SVG/MoneyReceivedIcon';

const {height, width} = Dimensions.get('window');
const IMAGE_SIZE = width * 0.2;


type TransactionDetailsRouteProp = RouteProp<
  RootStackParamList,
  'TransactionDetails'
>;

const TransactionDetails: React.FC = () => {
  const route = useRoute<TransactionDetailsRouteProp>();
  const {transaction} = route.params;
  const {theme} = useTheme();

  const viewRef = useRef(null); // Ref to capture the view


  const formatTransactionType = (type: string) => {
    return type === 't' ? 'Transferred' : 'Received';
  };

  const statusType = (type: string) => {
    return type === 's' ? 'Successful' : 'Failed';
  };

  const isSuccess = transaction.tx_status === 's';

  const formatDate = (date: string) => {
    return moment(date).format('MMM DD, YYYY, h:mm A');
  };

  const truncateAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(
      address.length - 4,
    )}`;
  };

  const onCaptureAndShare = async () => {
    try {
      const uri = await captureRef(viewRef, {
        format: 'png',
        quality: 0.8,
      });

      await Share.open({
        title: 'Transaction Details',
        url: uri,
        message: 'Here are the transaction details',
      });
    } catch (error: any) {
      console.log('Error', error.message);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      {/* <BackButton /> */}
      <View
      ref={viewRef}
        style={[
          styles.settingsWrapper,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}>
          
         <View style={styles.topContainer}>
          <View style={styles.statusContainer}>
            { transaction.tx_type === 't' ? (<MoneySendIcon size={IMAGE_SIZE} fillColor={'#C12727'} />) : (<MoneyReceivedIcon size={IMAGE_SIZE} fillColor={'#48B22E'} />) }
          </View>
          <View style={styles.centerText}>
              <Text style={[styles.headerText, {color: theme.secondaryTextColor}]}>{transaction.tx_type === 't' ? 'Sent to' : 'From'}</Text>
              <Text style={[styles.headDetail, {color: theme.textColor}]}>
                {truncateAddress(transaction.tx_wallet_recipient_address)}
              </Text>
            </View>

            <View style={styles.centerText}>
              <Text style={[styles.label, {color: theme.secondaryTextColor}]}>
                {formatDate(transaction.tx_created_at)}
              </Text>
            </View>
            
          <View style={styles.centerText}>
          <Text style={[styles.amountText, {color: theme.textColor}]}>
              $ {transaction.tx_amount}
            </Text>
            {/* <Text style={styles.label}>
              {formatTransactionType(transaction.tx_type)}
            </Text>
            <Text style={[styles.amountText, {color: theme.textColor}]}>
              {transaction.tx_amount} 
            </Text> */}
          </View>

          <View style={styles.centerText}>
            <Image
              source={isSuccess ? successIcon : errorIcon}
              style={styles.ImageStyles}
            />
            <Text style={[styles.status, { color: isSuccess ? '#1F8722' : '#C12727' }]}>
              {statusType(transaction.tx_status)}
            </Text>
          </View>
         </View>
        
        <View style={[styles.lineStyles, {backgroundColor: theme.textColor}]} />

        <View style={styles.bottomContainer}>
        <View style={styles.row}>
            <Text style={styles.label}>To: </Text>
            <Text style={[styles.detail, {color: theme.textColor}]}>
              { transaction.tx_type === 't' ?  truncateAddress(transaction.tx_wallet_recipient_address) :truncateAddress(transaction.tx_wallet_sender_address) }
            </Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.label}>From:</Text>
          <Text style={[styles.detail, {color: theme.textColor}]}>
          { transaction.tx_type === 't' ?  truncateAddress(transaction.tx_wallet_sender_address) :truncateAddress(transaction.tx_wallet_recipient_address) }
          </Text>
        </View>
          <View style={styles.row}>
            <Text style={styles.label}>Transaction ID:</Text>
            <Text style={[styles.detail, {color: theme.textColor}]}>
              {transaction.tx_id}
            </Text>
          </View>
        </View>
        {/* <Text style={styles.label}>Date</Text>
        <Text style={[styles.detail, {color: theme.textColor}]}>
          {formatDate(transaction.tx_created_at)}
        </Text> */}
      </View>
        <TouchableOpacity 
            onPress={onCaptureAndShare}
            style={[styles.shareBtn, {
            backgroundColor: theme.primaryGoldHex,
            borderColor: theme.borderStroke,
          }]}>
               <Text style={[styles.shareBtnText, {color: theme.primaryBGColor}]}>Share</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    justifyContent: 'space-between',
    padding: 20,
  },

  settingsWrapper: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
  },
  topContainer:{
    paddingBottom: SPACING.space_20,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 16,
  },
  bottomContainer:{
    paddingVertical: SPACING.space_20,
    rowGap: 12,
  },
  lineStyles: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.strokeColor,
  },
  amountText: {
    fontSize: 40,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingTop: SPACING.space_10,
  },
  label: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryWhite,
    // marginTop: 10,
  },
  centerText: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 6,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  headDetail: {
    fontSize: FONTSIZE.size_20, 
    fontFamily: FONTFAMILY.poppins_medium,
  },
  ImageStyles:{
    width: 18,
    height: 18,
  },
  status: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  detail: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  shareBtn: {
    width: '100%', 
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    height: height * 0.07,
    fontFamily: FONTFAMILY.poppins_regular,
    borderWidth: 1,
    backgroundColor: COLORS.primaryGoldHex,
    borderColor: COLORS.borderStroke,
    justifyContent: 'center',
    alignItems: 'center',
  },

  shareBtnText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default TransactionDetails;
