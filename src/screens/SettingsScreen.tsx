import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import { useAuth } from './auth/AuthContext'; 
import HeaderBar from '../components/HeaderBar';
import { useTheme } from '../utils/ThemeContext';
import { Picker } from '../components/Picker';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';
import { useAppContext } from '../state';

const { width } = Dimensions.get('window');

const languageOptions = [
  { label: "🇬🇧 English", value: "en" },
  { label: "🇯🇵 Japanese", value: "jp" },
  { label: "🇨🇳 Chinese", value: "cn" },
  { label: "🇰🇷 Korean", value: "ko" }
];

const currencyOptions = [
  { label: "USD(Default)", value: "USD" },
  { label: "YEN(¥)", value: "YEN" },
  { label: "CNY(¥)", value: "CNY" },
  { label: "KRW(₩)", value: "KRW" }
];

export const LANGUAGE_KEY = "selectedLanguage";  // Key for AsyncStorage

const SettingsScreen: React.FC = () => {
  const { state, dispatch } = useAppContext();
  const { t } = useTranslation(['settings']);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { logout } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [selectedLanguage, setSelectedLanguage] = useState<string>("en");
  const [selectedCurrency, setSelectedCurrency] = useState<string>("USD");

  const onChangeLanguage = async (lang: string) => {
		void i18next.changeLanguage(lang);
    setSelectedLanguage(lang)
    await AsyncStorage.setItem(LANGUAGE_KEY, lang);  // Persist the selected language
	};

  const handleLogout = async () => {
    try {
      await logout();  // Use the logout function from AuthContext
      navigation.navigate('Login');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Initialize translations and wait for i18next to be ready
  useEffect(() => {
    const getLanguage = async () => {
      try {
        const savedLanguage = await AsyncStorage.getItem(LANGUAGE_KEY);
        const initialLanguage = savedLanguage || 'en';
        setSelectedLanguage(initialLanguage)
      } catch (error) {
        console.error('Failed to load translations:', error);
      }
    };
    getLanguage();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: theme.primaryBGColor }]}>
      <HeaderBar title={t("settings:settings")} />
      <View
        style={[
          styles.settingsContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}
      >
        <View style={styles.buttonContainer}>
          <View style={styles.pickerButton}>
            <Text style={[styles.textColor, { flex: 1 }, { color: theme.textColor }]}>
              {t("settings:currency")}
            </Text>
            <Picker
              disabled
              options={currencyOptions}
              selectedValue={selectedCurrency}
              onValueChange={setSelectedCurrency}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.pickerButton}>
            <Text style={[styles.textColor, { flex: 1 }, { color: theme.textColor }]}>
              {t("settings:language")}
            </Text>
            <Picker
              options={languageOptions}
              selectedValue={selectedLanguage}
              onValueChange={onChangeLanguage}
            />
          </View>
        </View>
      </View>
      <View
        style={[
          styles.settingsContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}
      >
        <TouchableOpacity style={styles.buttonContainer} onPress={toggleTheme}>
          <Text style={[styles.textColor, { color: theme.textColor }]}>
            {t("settings:theme")}
          </Text>
          <Text style={[styles.textColor, { color: theme.textColor }]}>
            {isDarkMode ? 'Dark' : 'Light'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.textColor, { color: theme.textColor }]}>
            {t("settings:lockWallet")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer}>
          <Text style={[styles.textColor, { color: theme.textColor }]}>
            {t("settings:currentVersion")}
          </Text>
          <Text style={[styles.textColor, { color: theme.textColor }]}>
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
        ]}
      >
        <TouchableOpacity
          style={[
            styles.logoutButton,
            { backgroundColor: theme.secondaryBGColor },
          ]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutText, { color: theme.textColor }]}>
            {t("settings:logout")}
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
  pickerButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingsContainer: {
    flexDirection: 'column',
    marginTop: SPACING.space_15,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: 12,
    justifyContent: 'space-between',
  },
  textColor: {
    fontSize: FONTSIZE.size_18,
    color: COLORS.textColor,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  logoutButton: {
    backgroundColor: COLORS.layeBGColor,
    padding: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
  },
  logoutText: {
    fontSize: FONTSIZE.size_16,
    color: COLORS.textColor,
    textAlign: 'center',
    fontFamily: FONTFAMILY.poppins_semibold,
  },
});

export default SettingsScreen;
