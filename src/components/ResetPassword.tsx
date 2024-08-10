/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE } from '../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types'; // Import the type
import BackButtonIcon from '../../assets/SVG/BackButtonIcon';

const { width, height } = Dimensions.get('window');

const ResetPassword: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [email, setEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleResetPassword = async () => {
    if (!email || !resetToken || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.API_URL}/auth/reset-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword, resetToken }),
      });

      setLoading(false);

      if (response.ok) {
        Alert.alert('Success', 'Password has been reset successfully');
        navigation.navigate('Login');
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Failed to reset password');
      }
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'An error occurred. Please try again.');
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
          <BackButtonIcon size={30} style={styles.backButton} />
        </TouchableOpacity>
        <View style={styles.wFull}>
          <View />
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={require('../../assets/images/aga-logo.png')} style={styles.imageStyle} />
            </View>
          </View>
          <Text style={styles.resetPasswordTxt}>Reset your password</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#888"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Reset Token"
            placeholderTextColor="#888"
            value={resetToken}
            onChangeText={setResetToken}
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#888"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <View style={styles.resetBtnWrapper}>
            <TouchableOpacity
              onPress={handleResetPassword}
              activeOpacity={0.7}
              style={styles.resetBtn}
              disabled={loading}
            >
              {loading ? <ActivityIndicator color={COLORS.primaryBGColor} /> : <Text style={styles.resetText}>Reset Password</Text>}
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

export default ResetPassword;

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
    maxWidth: '80%',
    maxHeight: 120,
  },
  resetPasswordTxt: {
    fontSize: FONTSIZE.size_18,
    textAlign: 'center',
    color: COLORS.primaryWhite,
    fontFamily: FONTFAMILY.poppins_regular,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    color: COLORS.primaryWhite,
    borderColor: COLORS.strokeColor,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingHorizontal: 15,
    marginVertical: 10,
    borderRadius: BORDERRADIUS.radius_15,
    height: height * 0.07,
    width: '100%',
    backgroundColor: COLORS.secondaryBGColor,
  },
  resetBtnWrapper: {
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
  resetBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryGoldHex,
    borderRadius: BORDERRADIUS.radius_15,
  },
  resetText: {
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
});