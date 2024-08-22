import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
} from 'react-native';
import React, {useState} from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {useAuth} from './auth/AuthContext';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

const {height} = Dimensions.get('window');

type SendAmountRouteProp = RouteProp<RootStackParamList, 'SendAssetAmount'>;

export const SendAssetAmountScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<SendAmountRouteProp>();
  const { token, recipientAddress } = route.params;
  const {balance, accountAddress} = useAuth();
  const {theme} = useTheme();
  const [amount, setAmount] = useState('0');
  const [error, setError] = useState<string | null>(null);
  const handleInputChange = (text: string) => {
    let numericValue = text.replace(/[^0-9.]/g, '').slice(0, 10);

    if (numericValue.length > 1 && numericValue.startsWith('0')) {
      numericValue = numericValue.slice(1);
    }

    setAmount(numericValue);
    setError(null); // Clear error when the user starts typing
  };

  const handleSend = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      setError(t("sendassetamount:errorInvalidAmount"));
      return;
    }
    if (numericAmount > balance) {
      setError(t("sendassetamount:errorBalanceNotEnough"));
      return;
    }

    navigation.navigate('SendAssetPassword', {
      walletAddress: accountAddress,
      token,
      recipientAddress,
      amount: numericAmount,
    });
  };

  return (
    <SafeAreaView
      style={[styles.main, {backgroundColor: theme.primaryBGColor}]}>
      <View>
        {/* <BackButton /> */}
        <Text
          style={[styles.addressHeading, {color: theme.secondaryTextColor}]}>
          {t("sendassetamount:availableBalance")}{balance.toLocaleString()}
        </Text>
        <TextInput
          autoFocus={true}
          style={[styles.input, {color: theme.textColor}]}
          keyboardType="numeric"
          inputMode="numeric"
          value={amount}
          onChangeText={handleInputChange}
        />
        <View>
          <View
            style={[
              styles.receiverAddressContainer,
              {backgroundColor: theme.secondaryBGColor},
            ]}>
            <Text
              style={[styles.reminderText, {color: theme.secondaryTextColor}]}>
              {t("sendassetamount:sendingTo")}
            </Text>
            <Text
              style={[styles.addressValidation, {color: theme.textColor}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {recipientAddress}
            </Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSend}>
          <Text style={styles.buttonText}>{t("sendassetamount:send")}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: COLORS.primaryBGColor,
  },
  input: {
    borderColor: 'gray',
    padding: 10,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.primaryWhite,
    fontSize: 50,
    borderRadius: BORDERRADIUS.radius_10,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: FONTSIZE.size_14,
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 24,
  },
  receiverAddressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.space_32,
    padding: 6,
    overflow: 'hidden',
    margin: SPACING.space_8,
    borderRadius: BORDERRADIUS.radius_8,
  },
  reminderText: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    marginRight: SPACING.space_10,
    lineHeight: 24,
    color: '#888',
  },
  addressHeading: {
    marginTop: SPACING.space_16,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    lineHeight: 34,
    textAlign: 'center',
  },
  addressValidation: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhite,
    width: '70%',
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
  nextButton: {
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
});
