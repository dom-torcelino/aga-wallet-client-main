import {
  StyleSheet,
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import QRCode from 'react-native-qrcode-svg';
import Clipboard from '@react-native-clipboard/clipboard';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import WalletAddressLoading from './ui/WalletAddressLoading';
import {useAuth} from '../screens/auth/AuthContext';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

interface TransferProps {
  closeBottomSheet2: () => void;
  showToast: (message: string) => void;
}

const {width} = Dimensions.get('window');

const Receive: React.FC<TransferProps> = ({closeBottomSheet2, showToast}) => {
  const { t } = useTranslation();
  const {accountAddress} = useAuth();
  const SIZE = width * 0.5;
  const {theme} = useTheme();
  const copyToClipboard = () => {
    Clipboard.setString(accountAddress || '');
    showToast('Wallet address copied to clipboard!');
    closeBottomSheet2();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.receiveContainer}>
        <Text style={[styles.headerText, {color: theme.textColor}]}>
          {t("wallet:myWalletDetails")}
        </Text>
        <Text style={[styles.bodyTitle, {color: theme.textColor}]}>
          {t("wallet:myWalletDetailsDescription")}
        </Text>
        <View style={styles.qrContainer}>
          {!accountAddress ? (
            // <WalletAddressLoading />
            <Text style={[styles.headerText, {color: theme.textColor}]}>
              No qr
            </Text>
          ) : (
            <View style={styles.qrWrapper}>
              <QRCode value={accountAddress} size={SIZE} />
            </View>
          )}
        </View>
        <Text style={styles.walletID}>{accountAddress}</Text>
        <TouchableWithoutFeedback onPress={copyToClipboard}>
          <View style={styles.buttonContainer}>
            <Text style={[styles.buttonText, {color: theme.primaryBGColor}]}>{t("wallet:copyWalletAddress")}</Text>
          </View>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  receiveContainer: {
    paddingHorizontal: SPACING.space_16,
    paddingVertical: SPACING.space_20,
    flex: 1,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_semibold,
    textAlign: 'center',
    // marginVertical: SPACING.space_10,
  },
  bodyTitle: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
    marginVertical: SPACING.space_10,
    color: COLORS.primaryWhite,
  },
  qrContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrWrapper: {
    padding: SPACING.space_10,
    backgroundColor: COLORS.primaryWhite,
    borderRadius: BORDERRADIUS.radius_15,
  },
  walletID: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    marginVertical: SPACING.space_20,
    paddingHorizontal: SPACING.space_20,
    color: '#CB901A',
    textAlign: 'center',
  },
  buttonContainer: {
    padding: SPACING.space_15,
    backgroundColor: COLORS.primaryGoldHex,
    borderRadius: BORDERRADIUS.radius_15,
    marginVertical: SPACING.space_10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryBGColor,
    textTransform: "capitalize"
  },
});

export default Receive;
