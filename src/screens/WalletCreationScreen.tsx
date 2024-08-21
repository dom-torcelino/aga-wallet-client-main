import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import {RootStackParamList} from '../types/types';
import TextInput from '../components/ui/TextInput';
import {useAuth} from './auth/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
// @ts-ignore
import {API_URL} from '@env';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

const {height} = Dimensions.get('window');

const WalletCreationScreen: React.FC = () => {
  const { t } = useTranslation("createwallet"); 
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {token, setAccountAddress} = useAuth();
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const {theme} = useTheme();

  const handleCreateWallet = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      
    }

    if (name.length < 6 || name.length > 12 ) {
      setError('Wallet name must be between 6 and 12 characters')

      return(null);
    }

    setLoading(true);
    setError('');

    try {
      if (!token) {
        setError('User is not authenticated');
        setLoading(false);
        return;
      }

      // Fetch to create wallet
      const walletResponse = await fetch(`${API_URL}/v1/wallets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.accessToken}`, // Use the Bearer token
        },
        body: JSON.stringify({account_id: name, password}), // Include account ID and password
      });

      setLoading(false);

      if (walletResponse.ok) {
        const walletData = await walletResponse.json();
        const {wallet_address} = walletData;
        setAccountAddress(wallet_address);
        await AsyncStorage.setItem('walletPassword', password); // Save the wallet password
        navigation.navigate('Home'); // Navigate to home or other screen
      } else {
        const walletErrorData = await walletResponse.json();
        setError(walletErrorData.message || 'Wallet creation failed');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView
      style={[styles.main, {backgroundColor: theme.primaryBGColor}]}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <View style={styles.wFull}>
            <Text style={[styles.headerText, {color: theme.textColor}]}>
              {t("createwallet:setupYourWallet")}
            </Text>
            <Text style={[styles.subText, {color: theme.secondaryTextColor}]}>
              {t("createwallet:setupYourWalletDescription")}
            </Text>
            <TextInput
              placeholder={t("createwallet:walletName")}
              value={name}
              onChangeText={setName}
              secureTextEntry={false}
            />
            <TextInput
              placeholder={t("createwallet:password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              showVisibilityToggle={true}
            />
            <TextInput
              placeholder={t("createwallet:confirmPassword")}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
              showVisibilityToggle={true}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                onPress={handleCreateWallet}
                activeOpacity={0.7}
                style={styles.loginBtn}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={COLORS.primaryBGColor} />
                ) : (
                  <Text style={[styles.loginText, {color: theme.textColor}]}>
                    {t("createwallet:createWallet")}
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: SPACING.space_8,
  },
  container: {
    top: '10%',
    padding: SPACING.space_15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: SPACING.space_16,
  },
  subText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryTextColor,
    fontFamily: FONTFAMILY.poppins_regular,
    marginVertical: SPACING.space_8,
  },
  loginBtnWrapper: {
    height: height * 0.07,
    width: '100%',
    marginTop: SPACING.space_12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryGoldHex,
    borderRadius: BORDERRADIUS.radius_15,
  },
  loginText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  wFull: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: SPACING.space_10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});

export default WalletCreationScreen;
