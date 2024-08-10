/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
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
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../../constants/theme';
import { RootStackParamList, AuthResponse } from '../../constants/types';
import TextInput from '../../components/ui/TextInput';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';
import { useAuth } from './AuthContext';

// @ts-ignore
import { API_URL } from '@env';

const { width, height } = Dimensions.get('window');

const Login: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();

  useEffect(() => {
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId: '68753555206-9abvln0g5a4bmqjf4ed2s3eb1nb07lro.apps.googleusercontent.com',
    });
  }, []);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      setLoading(false);
      if (response.ok) {
        const loginData: AuthResponse = await response.json();
        const { token, user } = loginData;
        const { user_id } = user;
        await login(token, user_id);
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      setLoading(false);
      setError('An error occurred. Please try again.');
      console.error(error);
    }
  };

  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { user } = await GoogleSignin.signIn();
      console.log(user);
      const accessToken = (await GoogleSignin.getTokens()).accessToken;
      const response = await fetch(`${API_URL}/v1/auth/google`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });
      setLoading(false);
      if (response.ok) {
        const data: AuthResponse = await response.json();
        const { token, user } = data;
        const { user_id } = user;
        await login(token, user_id);
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function onFacebookButtonPress() {
    try {
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
      const accessTokenData = await AccessToken.getCurrentAccessToken();

      if (!accessTokenData) {
        throw 'Something went wrong obtaining access token';
      }
      const accessToken = accessTokenData.accessToken;

      const response = await fetch(`${API_URL}/v1/auth/facebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });
      setLoading(false);
      if (response.ok) {
        const data: AuthResponse = await response.json();
        const { token, user } = data;
        const { user_id } = user;
        await login(token, user_id);
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.main}>
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image source={require('../../../assets/images/aga-logo.png')} style={styles.imageStyle} />
        </View>
        <View style={styles.container}>
          <View style={styles.wFull}>
            <Text style={styles.loginContinueTxt}>Login to your account</Text>
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
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
              <Text style={styles.forgotPassText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity onPress={handleLogin} activeOpacity={0.7} style={styles.loginBtn}>
                {loading ? <ActivityIndicator color={COLORS.primaryBGColor} /> : <Text style={styles.loginText}>Log In</Text>}
              </TouchableOpacity>
            </View>

            <View style={styles.signUp}>
              <Text style={styles.signUpText}>Don't have an account? {' '}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupBtn}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signInOptions}>
            <View style={styles.lineStyles} />
            <Text style={styles.signUpText}>or sign in with</Text>
            <View style={styles.lineStyles} />
          </View>

          <View style={styles.socialSignIn}>
            <TouchableOpacity style={styles.socialSignInBtn} onPress={onFacebookButtonPress}>
              <Image source={require('../../../assets/images/facebook_icon.png')} style={styles.socialImage} />
              <Text style={styles.socialSignInText}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.socialSignInBtn} onPress={onGoogleButtonPress}>
              <Image source={require('../../../assets/images/google_icon.png')} style={styles.socialImage} />
              <Text style={styles.socialSignInText}>Google</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 8,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10,
  },
  imageStyle: {
    width: width * 0.46,
    height: height * 0.1,
    resizeMode: 'contain',
    maxWidth: '80%',
    maxHeight: 120,
  },
  loginContinueTxt: {
    fontSize: width < 350 ? FONTSIZE.size_16 : FONTSIZE.size_18,
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
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  signInOptions: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  lineStyles: {
    width: '30%',
    height: 1,
    backgroundColor: COLORS.strokeColor,
  },
  signUpText: {
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  forgotPassText: {
    color: COLORS.primaryWhite,
    textAlign: 'right',
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: 10,
    marginTop: 5,
  },
  signupBtn: {
    color: COLORS.primaryGoldHex,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  socialSignIn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  socialSignInBtn: {
    width: width * 0.4,
    borderRadius: BORDERRADIUS.radius_15,
    flexDirection: 'row',
    height: height * 0.07,
    fontFamily: FONTFAMILY.poppins_regular,
    borderWidth: 1,
    backgroundColor: COLORS.secondaryBGColor,
    borderColor: COLORS.borderStroke,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialImage: {
    width: width * 0.07,
    height: height * 0.04,
    marginRight: 16,
    maxWidth: 30,
    maxHeight: 30,
  },
  socialSignInText: {
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
  },
  wFull: {
    width: '100%',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
