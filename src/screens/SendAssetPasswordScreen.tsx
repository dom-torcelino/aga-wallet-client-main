import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
// @ts-ignore
import {API_URL} from '@env';
import {useAuth} from './auth/AuthContext';
import {useTheme} from '../utils/ThemeContext';
import { useTranslation } from 'react-i18next';

type EnterPasswordRouteProp = RouteProp<RootStackParamList, 'SendAssetPassword'>;

const EnterPasswordScreen: React.FC = () => {
  const { t } = useTranslation(["sendassetpassword"]);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EnterPasswordRouteProp>();
  const {amount, recipientAddress } = route.params;
  const {token: authToken, accountAddress: sender_address} = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const {theme} = useTheme();

  const handleConfirm = async () => {
    if (password) {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        const response = await fetch(`${API_URL}/v1/transactions/send`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken?.accessToken}`,
          },
          body: JSON.stringify({
            amount,
            sender_address,
            recipient_address: recipientAddress,
            password,
          }),
        });

        const transaction = await response.json()

        if (response.ok) {
          navigation.navigate('TransactionSuccess', { 
            blockHash: transaction.block_hash,
            transactionHash:  transaction.transaction_hash
          });
        } else {
          setError('Incorrect password and try again.');
        }
      } catch (error) {
        console.error('Transaction failed', error);
        setError('An error occurred. Please try again later.');
      } finally {
        setLoading(false); // Stop loading after transaction
      }
    } else {
      setError('Password is required.');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      <Text style={[styles.title, {color: theme.textColor}]}>
        {t("sendassetpassword:enterYourWalletPassword")}
      </Text>
      <TextInput
        autoFocus={true}
        value={password}
        maxLength={64}
        onChangeText={text => {
          setPassword(text);
          setError(null);
        }}
        secureTextEntry={true}
        style={[styles.input, {color: theme.textColor}]}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryGoldHex} />
      ) : (
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>{t("sendassetpassword:confirm")}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: COLORS.primaryBGColor,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: COLORS.textColor,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    textAlign: 'center',
    marginBottom: 24,
    color: COLORS.primaryWhite,
    fontSize: FONTSIZE.size_20,
    borderRadius: BORDERRADIUS.radius_10,
  },
  errorText: {
    color: 'red',
    fontSize: FONTSIZE.size_14,
    textAlign: 'center',
    marginBottom: 24,
  },
  button: {
    backgroundColor: COLORS.primaryGoldHex,
    padding: SPACING.space_10,
    alignItems: 'center',
    borderRadius: BORDERRADIUS.radius_10,
  },
  buttonText: {
    color: COLORS.primaryBGColor,
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default EnterPasswordScreen;
