
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {
  useNavigation,
  useRoute,
  RouteProp,
  NavigationProp,
} from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../constants/theme';

type ConfirmPasswordRouteProp = RouteProp<
  RootStackParamList,
  'ConfirmPassword'
>;

const ConfirmPasswordScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<ConfirmPasswordRouteProp>();
  const { password: originalPassword } = route.params;
  const [password, setPassword] = useState('');

  const handleConfirm = async () => {
    if (password === originalPassword) {
      // Save the password (to AsyncStorage or server)
      await AsyncStorage.setItem('userPassword', password);
      navigation.navigate('Home');
    } else {
      alert('Password does not match. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirm your Password</Text>
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
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
  },
});

export default ConfirmPasswordScreen;
