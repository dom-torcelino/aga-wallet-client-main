import React, {useState, useEffect} from 'react';
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
import {RootStackParamList} from '../constants/types'
import {COLORS} from '../constants/theme';
// @ts-ignore
import {API_URL} from '@env';
import {useAuth} from './auth/AuthContext';

type EnterPasswordRouteProp = RouteProp<RootStackParamList, 'EnterPassword'>;

const EnterPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EnterPasswordRouteProp>();
  const {amount, recipient_address} = route.params;
  const {token: authToken, accountAddress: sender_address} = useAuth();
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  console.log(authToken, recipient_address, sender_address);

  const handleConfirm = async () => {
    if (password) {
      setLoading(true); // Start loading
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
            recipient_address,
            password,
          }),
        });

        if (response.ok) {
          navigation.navigate('TransactionSuccessScreen');
        } else {
          navigation.navigate('TransactionFailure');
        }
      } catch (error) {
        console.error('Transaction failed', error);
        navigation.navigate('TransactionFailure');
      } finally {
        setLoading(false); // Stop loading after transaction
      }
    } else {
      alert('Password does not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter your Wallet Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={styles.input}
      />

      {loading ? (
        <ActivityIndicator size="large" color={COLORS.primaryGoldHex} />
      ) : (
        <TouchableOpacity onPress={handleConfirm} style={styles.button}>
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primaryBGColor,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: COLORS.secondaryTextColor,
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    width: '80%',
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.primaryWhite,
  },
  button: {
    backgroundColor: COLORS.primaryGoldHex,
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default EnterPasswordScreen;
