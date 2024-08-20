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
import {useAuth} from '../screens/auth/AuthContext';
import BackButton from './ui/BackButton';
import {useTheme} from '../utils/ThemeContext';

const {height} = Dimensions.get('window');

type SendAmountRouteProp = RouteProp<RootStackParamList, 'SendAmount'>;

const SendAmount: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<SendAmountRouteProp>();
  const {token, recipient_address} = route.params;
  const {balance} = useAuth();
  const {theme} = useTheme();

  // State to manage the input value, initialized with '0'
  const [amount, setAmount] = useState('0');

  // State to manage error message
  const [error, setError] = useState<string | null>(null);

  // Handle input change to ensure numeric input and prevent starting with 0
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
      setError('Please enter a valid amount to send.');
      return;
    }
    if (numericAmount > balance) {
      setError('You do not have enough balance to send this amount.');
      return;
    }

    navigation.navigate('EnterPassword', {
      token,
      recipient_address,
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
          Available Balance: {balance.toFixed(2)}
        </Text>
        <TextInput
          autoFocus={true}
          style={[styles.input, {color: theme.textColor}]}
          keyboardType="numeric"
          inputMode="numeric"
          value={amount}
          onChangeText={handleInputChange}
        />
        {/* Display error message if there is one */}

        <View>
          <View
            style={[
              styles.receiverAddressContainer,
              {backgroundColor: theme.secondaryBGColor},
            ]}>
            <Text
              style={[styles.reminderText, {color: theme.secondaryTextColor}]}>
              Sending to:
            </Text>
            <Text
              style={[styles.addressValidation, {color: theme.textColor}]}
              numberOfLines={1}
              ellipsizeMode="tail">
              {recipient_address}
            </Text>
          </View>
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity style={styles.nextButton} onPress={handleSend}>
          <Text style={styles.buttonText}>Send</Text>
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
    backgroundColor: COLORS.secondaryBGColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: SPACING.space_32,
    paddingHorizontal: 6,
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

export default SendAmount;
