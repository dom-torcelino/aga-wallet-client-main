import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {COLORS} from '../constants/theme';
import {useTheme} from '../utils/ThemeContext';

const CreatePasswordScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [password, setPassword] = useState('');
  const {theme} = useTheme();

  const handleNext = () => {
    if (password.length >= 6) {
      navigation.navigate('ConfirmPassword', {password});
    } else {
      Alert.alert('Error', 'Password must be at least 6 characters');
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      <Text style={[styles.title, {color: theme.secondaryTextColor}]}>
        Create a Password
      </Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
        style={[styles.input, {color: theme.textColor}]}
      />
      <TouchableOpacity
        onPress={handleNext}
        style={[styles.button, {backgroundColor: theme.primaryGoldHex}]}>
        <Text style={[styles.buttonText, {color: theme.textColor}]}>Next</Text>
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

export default CreatePasswordScreen;
