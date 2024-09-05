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
  StatusBar,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../../constants/theme';
import { RootStackParamList, AuthResponse } from '../../types/types';
import TextInput from '../../components/ui/TextInput';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken, Settings } from 'react-native-fbsdk-next';
import { useAuth } from './AuthContext';
import { useTheme } from '../../utils/ThemeContext';


// @ts-ignore
import { API_URL } from '@env';
import { useTranslation } from 'react-i18next';

const { width, height } = Dimensions.get('window');

const Login: React.FC = () => {

  const { t } = useTranslation(['login']);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const { login } = useAuth();
  const {isDarkMode, theme} = useTheme();

  useEffect(() => {
    Settings.initializeSDK();
    GoogleSignin.configure({
      webClientId:
        '68753555206-9abvln0g5a4bmqjf4ed2s3eb1nb07lro.apps.googleusercontent.com',
    });
  }, []);

  

 
  //Email Input Validation 
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    if (!validateEmail(email)) {
      setError(t("login:errorInvalidEmail"));
      return;
    }

    if (!password) {
      setError(t("login:errorEnterPassword"));
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
        // await registerFCMToken(token);
        navigation.navigate('Home');
        console.log('Log In Sucess');
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

  // Google Login
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.signOut();
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { user } = await GoogleSignin.signIn();
      // console.log(user);
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
        // await registerFCMToken(token);
        navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
    } catch (error) {
      console.log(error);
    }
  }

  // Facebook Login
  async function onFacebookButtonPress() {
    try {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
      // Sign-in the user with the credential
      auth().signInWithCredential(facebookCredential);

      const accessToken = facebookCredential.token;

      const response = await fetch(`${API_URL}/v1/auth/facebook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: accessToken }),
      });

      if (response.ok) {
         const data: AuthResponse = await response.json();
         const { token, user } = data;
         const { user_id } = user;
         await login(token, user_id);
        //  await registerFCMToken(token);
         navigation.navigate('Home');
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
      }
      console.log('User sign in successfully using facebook');
    } catch (error) {
      console.log('login error', error);
    }
  }

  return (
    <SafeAreaView style={[styles.main, {backgroundColor: theme.primaryBGColor}]}>
      <StatusBar
        backgroundColor={theme.primaryBGColor}
        barStyle={isDarkMode ? "light-content" : "dark-content"} 
        translucent={false}
      />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled">
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/aga-logo.png')}
            style={styles.imageStyle}
          />
        </View>
        <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
          <View style={styles.wFull}>
            <Text style={[styles.loginContinueTxt, {color: theme.textColor}]}>{t('login:login')}</Text>
            <TextInput
              placeholder={t("login:login")}
              value={email}
              onChangeText={setEmail}
              secureTextEntry={false}
            />
            <TextInput
              placeholder={t("login:password")}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
              showVisibilityToggle={true}
              
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <View style={styles.loginBtnWrapper}>
              <TouchableOpacity
                onPress={handleLogin}
                activeOpacity={0.9}
                style={styles.loginBtn}>
                {loading ? (
                  <ActivityIndicator color={COLORS.primaryBGColor} />
                ) : (
                  <Text style={[styles.loginText, {color: theme.primaryBGColor}]}>{t("login:login")}</Text>
                )}
              </TouchableOpacity>
            </View>

            <View style={styles.signUp}>
              <Text style={[styles.signUpText, {color: theme.textColor}]}>{t("login:dontHaveAnAccount")}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.signupBtn}>{t("login:signUp")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.signInOptions}>
            <View style={[styles.lineStyles, {backgroundColor: theme.strokeColor}]} />
            <Text style={[styles.signUpText, {color: theme.textColor}]}>{t("login:orSignInWith")}</Text>
            <View style={[styles.lineStyles, {backgroundColor: theme.strokeColor}]} />
          </View>

          <View style={styles.socialSignIn}>
            <TouchableOpacity
              style={[styles.socialSignInBtn, {
                backgroundColor: theme.secondaryBGColor,
                borderColor: theme.borderStroke,
              }]}
              onPress={onFacebookButtonPress}>
              <Image
                source={require('../../../assets/images/facebook_icon.png')}
                style={styles.socialImage}
              />
              <Text style={[styles.socialSignInText, {color: theme.textColor}]}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.socialSignInBtn, {
                backgroundColor: theme.secondaryBGColor,
                borderColor: theme.borderStroke,
              }]}
              onPress={onGoogleButtonPress}>
              <Image
                source={require('../../../assets/images/google_icon.png')}
                style={styles.socialImage}
              />
              <Text style={[styles.socialSignInText, {color: theme.textColor}]}>Google</Text>
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
    padding: 10,
    width: '100%',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
  imageStyle: {
    width: width * 0.46,
    height: height * 0.1,
    resizeMode: 'contain',
    maxWidth: '80%',
    maxHeight: 120,
  },
  wFull: {
    width: '100%',
  },
  loginContinueTxt: {
    fontSize: width < 350 ? FONTSIZE.size_24 : FONTSIZE.size_28,
    textAlign: 'left',
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: 10,
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
    width: width * 0.42,
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
    resizeMode: 'contain',
    marginRight: 16,
    maxWidth: 30,
    maxHeight: 30,
  },
  socialSignInText: {
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_medium,
    textAlign: 'center',
  },
  
  errorText: {
    color: 'red',
    marginTop: 10,
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
