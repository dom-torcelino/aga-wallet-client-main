/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';
// @ts-ignore
import { API_URL } from '@env';
import { useAuth } from './auth/AuthContext';

type EnterPasswordRouteProp = RouteProp<RootStackParamList, 'EnterPassword'>;

const EnterPasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<EnterPasswordRouteProp>();
  const { amount, recipient_address } = route.params;
  const { token: authToken, accountAddress: sender_address } = useAuth();
  const [password, setPassword] = useState('');
  const [savedPassword, setSavedPassword] = useState<string | null>(null);

  useEffect(() => {
    const getPassword = async () => {
      const storedPassword = await AsyncStorage.getItem('walletPassword');
      setSavedPassword(storedPassword);
    };

    getPassword();
  }, []);

  const handleConfirm = async () => {
    if (password === savedPassword) {
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
        console.log(authToken?.accessToken)
        console.log(amount)
        console.log(sender_address)
        console.log(recipient_address)
        console.log(authToken?.accessToken)
        if (response.ok) {
          navigation.navigate('TransactionSuccess');
        console.log('TransactionSuccess')
        } else {
          navigation.navigate('TransactionFailure');
        console.log('TransactionFailure')
        }
      } catch (error) {
        console.error('Transaction failed', error);
        navigation.navigate('TransactionFailure');
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
      <TouchableOpacity onPress={handleConfirm} style={styles.button}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
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
