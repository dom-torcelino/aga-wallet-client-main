import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Dimensions,
  Alert,
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
import {RootStackParamList} from '../constants/types'; // Import the type
import {useAuth} from '../screens/auth/AuthContext';
import BackButton from './ui/backButton';

const {height} = Dimensions.get('window');

type SendAmountRouteProp = RouteProp<RootStackParamList, 'SendAmount'>;

const SendAmount: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<SendAmountRouteProp>();
  const {token, recipient_address} = route.params;
  const {balance} = useAuth();

  // State to manage the input value
  const [amount, setAmount] = useState('');

  // Handle input change to ensure numeric input and limit to 10 characters
  const handleInputChange = (text: string) => {
    // Allow only numeric values and limit length to 10 characters
    const numericValue = text.replace(/[^0-9.]/g, '').slice(0, 10);
    setAmount(numericValue);
  };

  const handleSend = () => {
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid amount to send.');
      return;
    }
    if (numericAmount > balance) {
      Alert.alert(
        'Insufficient balance',
        'You do not have enough balance to complete this transaction.',
      );
      return;
    }

    navigation.navigate('EnterPassword', {
      token,
      recipient_address,
      amount: numericAmount,
    });
  };

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <BackButton />
        <View>
          <Text style={styles.addressHeading}>
            Available Balance ${balance.toFixed(2)}
          </Text>
          <View>
            <TextInput
              style={styles.input}
              placeholder="$10,000"
              placeholderTextColor="#888"
              keyboardType="numeric"
              inputMode="numeric"
              value={amount}
              onChangeText={handleInputChange}
            />
          </View>
        </View>

        <View>
          <View style={styles.receiverAddressContainer}>
            <Text style={styles.reminderText}>Sending to:</Text>
            <Text
              style={styles.addressValidation}
              numberOfLines={1}
              ellipsizeMode="tail">
              {recipient_address}
            </Text>
          </View>
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
  coinType: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    marginTop: SPACING.space_15,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: BORDERRADIUS.radius_10,
    padding: SPACING.space_12,
    justifyContent: 'space-between',
  },
  coinTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amountBtnContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: 60,
    textAlign: 'center',
  },
  coin: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    lineHeight: 34,
  },
  coinName: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  crypto: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  changeCoin: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryGoldHex,
    paddingRight: SPACING.space_10,
  },
  fiat: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },

  receiverAddressContainer: {
    backgroundColor: COLORS.secondaryBGColor,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 4,
    paddingHorizontal: 6,
    overflow: 'hidden',
    padding: SPACING.space_8,
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
