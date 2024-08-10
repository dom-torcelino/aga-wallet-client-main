/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../constants/types'; // Import the type
import BackButtonIcon from '../../../assets/SVG/BackButtonIcon';
import TextInput from '../../components/ui/TextInput';

const { width, height } = Dimensions.get('window');

const ForgotPassword: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };


  const handleSend = async () => {
    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    setLoading(true);
    setError('');
    try{
      const response = await fetch(`${process.env.API_URL}/v1/auth/login`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Verification code has been sent to your email address');
        navigation.navigate('ResetPassword');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to send verification code');
      }

    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occured. Please try again.');
      console.error(error)
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
        <BackButtonIcon size={30} style={styles.backButton}/>
      </TouchableOpacity>
      <View style={styles.container}>
        <View style={styles.wFull}>
          <View />
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={require('../../../assets/images/aga-logo.png')} style={styles.imageStyle} />
            </View>
          </View>
          <Text style={styles.ForgotPasswordTxt}>Please Enter Your Email Address To Recieve a Verification Code.</Text>
          <TextInput
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              secureTextEntry={false}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
          <View style={styles.loginBtnWrapper}>
            <TouchableOpacity
              onPress={handleSend}
              activeOpacity={0.7}
              style={styles.loginBtn}
            >
              {loading ? <ActivityIndicator color={COLORS.primaryBGColor} /> : <Text style={styles.loginText}>Send</Text>}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUp}>
            <Text style={styles.signUpText}>Don't have an account? {' '}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.boldText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primaryBGColor,
  },
  container: {
    padding: 15,
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
  },
  imageStyle: {
    width: width * 0.46,
    height: height * 0.14,
    resizeMode: 'contain',
    // Adding responsiveness for smaller screens
    maxWidth: '80%',
    maxHeight: 120,
  },
  ForgotPasswordTxt: {
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
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
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
  },
  signUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
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
    color: COLORS.primaryGoldHex,
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
