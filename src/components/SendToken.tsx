/* eslint-disable prettier/prettier */
import { StatusBar, StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Dimensions, Image } from 'react-native';
import React, { useState } from 'react';
import { RouteProp, useRoute, useNavigation, NavigationProp } from '@react-navigation/native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import BackButtonIcon from '../../assets/SVG/BackButtonIcon';
import { RootStackParamList } from '../constants/types'; // Import the type
import ScanIcon from '../../assets/SVG/ScanIcon';
import { useBottomSheet } from './BottomSheetContext';

const { height } = Dimensions.get('window');

type SendTokenRouteProp = RouteProp<RootStackParamList, 'SendToken'>;

const SendToken: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { pressHandler } = useBottomSheet();
  const route = useRoute<SendTokenRouteProp>();
  const { token } = route.params;
 

  const [recipient_address, setRecipient_address] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const validateAddress = (address: string) => {
    const addressRegex = /^5[a-zA-Z0-9]{47}$/; // Update the regex to match your wallet address format
    return addressRegex.test(address);
  };

  const onPressButton = () => {
    if (validateAddress(recipient_address)) {
      setErrorMessage('');
      navigation.navigate('SendAmount', { token, recipient_address });
      
    } else {
      setErrorMessage('The wallet address is not valid. Please check and try again.');
    }
  };

 

  return (
    <SafeAreaView style={styles.main}>
      <View>
        <View style={styles.container}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <BackButtonIcon size={30} style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.coinType}>
            <View style={styles.coinTypeLeft}>
              <Image source={typeof token.image === 'string' ? { uri: token.image } : token.image} style={styles.image} />
              <View>
                <Text style={styles.coin}>{token.coin}</Text>
                <Text style={styles.crypto}>{token.crypto}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={pressHandler}>
              <Text style={styles.changeCoin}>Change</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={styles.addressHeading}>Who are you sending to?</Text>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="e.g : 16HFHicyvB9RXFTxrBazas..."
              placeholderTextColor={COLORS.placeHolderTextColor}
              value={recipient_address}
              onChangeText={(text) => {
                setRecipient_address(text);
                setErrorMessage(''); // Clear error message on input change
              }}
            />
            <TouchableOpacity onPress={() => navigation.navigate('QrScanner')}>
              <ScanIcon size={30} style={styles.backButton} />
            </TouchableOpacity>
          </View>
          {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}
          <Text style={styles.addressValidation} numberOfLines={1} ellipsizeMode="tail">
            {recipient_address || "Enter the recipient's wallet address."}
          </Text>
        </View>
        <View>
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>•</Text>
            <Text style={styles.reminderText}>Mistransferred assets cannot be recovered due to the nature of the blockchain.</Text>
          </View>
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>•</Text>
            <Text style={styles.reminderText}>When transferring to an exchange or external wallet, please make sure it’s transferred to the same blockchain network.</Text>
          </View>
          <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>•</Text>
            <Text style={styles.reminderText}>Transferring by username is a function that can be used when transferring between AGA wallet users.</Text>
          </View>
        </View>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity onPress={onPressButton} activeOpacity={0.7} style={styles.nextButton}>
          <Text style={styles.buttonText}>Continue</Text>
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
  container: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: SPACING.space_18,
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
  image: {
    width: 60,
    height: 60,
    marginRight: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
    borderColor: COLORS.strokeColor,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginVertical: 10,
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
  input: {
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    flex: 1,
    justifyContent: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    marginTop: SPACING.space_10,
  },
  reminderContainer: {
    flexDirection: 'row',
    marginBottom: 4,
    paddingHorizontal: 6,
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
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    lineHeight: 34,
  },
  addressValidation: {
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryWhite,
    lineHeight: 34,
    paddingVertical: SPACING.space_10,
  },
  backButtonContainer: {
    top: 0,
    zIndex: 1,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    backgroundColor: COLORS.secondaryBGColor,
    padding: 6,
  },
  backButton: {
    marginRight: 2,
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

export default SendToken;
