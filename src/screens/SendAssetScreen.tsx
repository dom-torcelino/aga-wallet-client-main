import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {
  RouteProp,
  useRoute,
  useNavigation,
  NavigationProp,
} from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import {RootStackParamList} from '../types/types';
import ScanIcon from '../../assets/SVG/ScanIcon';
import {useAuth} from './auth/AuthContext';
import {useTheme} from '../utils/ThemeContext';
import { useBottomSheet } from '../components/BottomSheetContext';
import { validateWalletAddress } from '../utils/validators';
import { useTranslation } from 'react-i18next';

const {height, width} = Dimensions.get('window');
const IMAGE_SIZE = width * 0.11;

type SendAssetScreenProp = RouteProp<RootStackParamList, 'SendAsset'>;

export const SendAssetScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {theme} = useTheme();
  const { pressHandler } = useBottomSheet();
  const route = useRoute<SendAssetScreenProp>();
  const {token} = route.params;
  // TODO: use the useAppContext hook for the balance
  const {balance} = useAuth();

  const [recipientAddress, setRecipientAddress] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const onPressContinue = () => {
    if (validateWalletAddress(recipientAddress)) {
      setErrorMessage('');
      navigation.navigate('SendAssetAmount', {
        token,
        recipientAddress,
      });
    } else {
      setErrorMessage(t("sendasset:errorInvalidAddress"));
    }
  };

  return (
    <SafeAreaView
      style={[styles.main, {backgroundColor: theme.primaryBGColor}]}>
      <View>
        <View style={styles.container}>
          <View
            style={[
              styles.coinType,
              {
                backgroundColor: theme.secondaryBGColor,
                borderColor: theme.borderStroke,
              },
            ]}>
            <View style={styles.coinTypeLeft}>
              <Image
                source={
                  typeof token.image === 'string'
                    ? {uri: token.image}
                    : token.image
                }
                style={styles.image}
              />
              <View>
                <Text style={[styles.coin, {color: theme.textColor}]}>
                  {token.coin}
                </Text>
                <Text
                  style={[styles.crypto, {color: theme.secondaryTextColor}]}>
                  {balance.toLocaleString()}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={pressHandler}>
              <Text style={styles.changeCoin}>{t("sendasset:change")}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <Text style={[styles.addressHeading, {color: theme.textColor}]}>
          {t("sendasset:whoAreYouSending")}
          </Text>
          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: theme.secondaryBGColor,
                borderColor: theme.borderStroke,
              },
            ]}>
            <TextInput
              style={[styles.input, {color: theme.textColor}]}
              placeholder={t("sendasset:egAddress")}
              placeholderTextColor={theme.placeHolderTextColor}
              value={recipientAddress}
              onChangeText={text => {
                setRecipientAddress(text);
                setErrorMessage('');
              }}
            />
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('QrScanner', { setRecipient_address: setRecipientAddress })
              }>
              <ScanIcon
                fill={theme.textColor}
                size={30}
                style={styles.backButton}
              />
            </TouchableOpacity>
          </View>
          {errorMessage ? (
            <Text style={styles.errorText}>{errorMessage}</Text>
          ) : null}
          <Text
            style={[styles.addressValidation, {color: theme.textColor}]}
            numberOfLines={1}
            ellipsizeMode="tail">
            {recipientAddress || t("sendasset:enterTheRecipientAddress")}
          </Text>
        </View>
        <View>
          <View style={styles.reminderContainer}>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              •
            </Text>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              {t("sendasset:mistransferredAssets")}
            </Text>
          </View>
          <View style={styles.reminderContainer}>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              •
            </Text>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              {t("sendasset:whenTransferring")}
            </Text>
          </View>
          <View style={styles.reminderContainer}>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              •
            </Text>
            <Text
              style={[
                styles.reminderText,
                {color: theme.placeHolderTextColor},
              ]}>
              {t("sendasset:transferringByUsername")}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={onPressContinue}
          activeOpacity={0.7}
          style={styles.nextButton}>
          <Text style={styles.buttonText}>{t("sendasset:continue")}</Text>
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
    marginBottom: SPACING.space_16,
  },
  coinType: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: 12,
    padding: width * 0.026,
    justifyContent: 'space-between',
  },
  coinTypeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    marginRight: 10,
  },
  
  coin: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    lineHeight: 34,
  },
  // coinName: {
  //   fontSize: FONTSIZE.size_20,
  //   fontFamily: FONTFAMILY.poppins_regular,
  //   color: COLORS.secondaryTextColor,
  // },
  crypto: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
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
