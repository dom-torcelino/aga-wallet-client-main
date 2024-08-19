import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {useAuth} from './auth/AuthContext'; // Import the useAuth hook
import HeaderBar from '../components/HeaderBar';
import {useTheme} from '../utils/ThemeContext';

const {width} = Dimensions.get('window');

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {logout} = useAuth(); // Destructure the logout function from useAuth
  const {isDarkMode, toggleTheme, theme} = useTheme();

  const handleLogout = async () => {
    try {
      await logout(); // Use the logout function from AuthContext
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  return (
    <View style={[styles.container, {backgroundColor: theme.primaryBGColor}]}>
      <StatusBar
        backgroundColor={theme.primaryBGColor}
        barStyle={theme.isDarkMode ? 'light-content' : 'dark-content'}
        translucent={false} // Make sure it's not translucent
      />
      <HeaderBar title={'Settings'} />
      <View
        style={[
          styles.settingsContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            Currency
          </Text>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            USD (Default)
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.settingsContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}>
        <TouchableOpacity style={styles.buttonContainer} onPress={toggleTheme}>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            Theme
          </Text>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            Lock Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            Current Version
          </Text>
          <Text style={[styles.textColor, {color: theme.textColor}]}>
            1.0.0
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.settingsContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}>
        <TouchableOpacity
          style={[
            styles.logoutButton,
            {backgroundColor: theme.secondaryBGColor},
          ]}
          onPress={handleLogout}>
          <Text style={[styles.logoutText, {color: theme.textColor}]}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
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
    // backgroundColor: COLORS.secondaryBGColor,
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
