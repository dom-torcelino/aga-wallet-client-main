import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../../constants/theme';
import { RootStackParamList } from '../../types/types'; // Import the type
import BackButtonIcon from '../../../assets/SVG/BackButtonIcon';
import TextInput from '../../components/ui/TextInput';
import { useAuth } from './AuthContext'; // Import the useAuth hook
// @ts-ignore
import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');

const Register: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login, setAccountAddress } = useAuth(); // Destructure the login and setAccountAddress functions from useAuth

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Password do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name }),
      });
      setLoading(false);
      if (response.ok) {
        const registerData = await response.json();
        const { token, user, accountAddress } = registerData;
        const { user_id } = user;
        await login(token, user_id); // Use the login function from AuthContext
        setAccountAddress(accountAddress); // Use the setAccountAddress function from AuthContext
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Registration failed');
      }
      // eslint-disable-next-line no-catch-shadow
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.backButtonContainer}
            onPress={() => navigation.navigate('Login')}>
            <BackButtonIcon size={30} style={styles.backButton} />
          </TouchableOpacity>
          <View style={styles.wFull}>
            <View style={styles.imageContainer}>
              <Image
                source={require('../../../assets/images/aga-logo.png')}
                style={styles.imageStyle}
              />
            </View>
            <Text style={styles.signupTxt}>Sign up</Text>
            <TextInput
              placeholder="Name"
              value={name}
              onChangeText={setName}
              secureTextEntry={false}
            />
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              secureTextEntry={false}
            />
            <TextInput
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <TextInput
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={true}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                onPress={handleRegister}
                activeOpacity={0.7}
                style={styles.loginBtn}
                disabled={loading}>
                {loading ? (
                  <ActivityIndicator color={COLORS.primaryBGColor} />
                ) : (
                  <Text style={styles.loginText}>Register</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.signUpText}>
              By signing up you agree to AGA's{' '}
              <Text style={styles.boldText}>Terms of Service</Text> and{' '}
              <Text style={styles.boldText}>Privacy Policy</Text>.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
    padding: 8,
  },
  container: {
    padding: 10,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 1,
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    backgroundColor: COLORS.secondaryBGColor,
    padding: 6,
  },
  backButton: {
    marginRight: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    // marginBottom: 10,
  },
  imageStyle: {
    width: width * 0.46,
    height: height * 0.14,
    resizeMode: 'contain',
    maxWidth: '80%',
    maxHeight: 120,
  },
  signupTxt: {
    fontSize: FONTSIZE.size_28,
    textAlign: 'left',
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: 16,
  },
  loginBtnWrapper: {
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
  textContainer: {
    padding: 16,
  },
  signUpText: {
    fontSize: 14,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    lineHeight: 28,
    textAlign: 'center',
  },
  boldText: {
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 40,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
