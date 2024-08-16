import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../constants/types';
import {useAuth} from './auth/AuthContext'; // Import the useAuth hook
import HeaderBar from '../components/HeaderBar';

const {width} = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {logout} = useAuth(); // Destructure the logout function from useAuth

  const handleLogout = async () => {
    try {
      await logout(); // Use the logout function from AuthContext
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primaryBGColor} />
      <HeaderBar title={'Settings'} />
      {/* <Text style={styles.headerText}>Settings</Text> */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Currency</Text>
          <Text style={styles.textColor}>USD(Default)</Text>
          {/* <Text style={styles.textColor}>0x2B5B...3C71</Text>
          <Text style={styles.secondaryText}>joh*************@gmail.com</Text> */}
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        {/* <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Personal Information</Text>
        </TouchableOpacity>
       <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Change password</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Theme</Text>
          <Text style={styles.textColor}>Dark</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Lock Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={styles.textColor}>Current Version</Text>
          <Text style={styles.textColor}>1.0.0</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    // justifyContent: 'center',
    // alignItems: 'center',\
    paddingHorizontal: 20,
  },
  buttonContainer: {
    padding: width * 0.026,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  settingsContainer: {
    flexDirection: 'column',
    // alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    marginTop: SPACING.space_15,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: 12,

    justifyContent: 'space-between',
  },

  textColor: {
    fontSize: FONTSIZE.size_18,
    // color: COLORS.secondaryTextColor,
    color: COLORS.textColor,
    fontFamily: FONTFAMILY.poppins_regular,
  },

  secondaryText: {
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryTextColor,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  logoutButton: {
    backgroundColor: COLORS.layeBGColor,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
  },
  logoutText: {
    fontSize: FONTSIZE.size_16,
    // color: COLORS.secondaryTextColor,
    color: COLORS.textColor,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default SettingsScreen;
