import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import NotificationIcon from '../../assets/SVG/NotificationIcon';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {useTheme} from '../utils/ThemeContext';
import { useAuth } from '../screens/auth/AuthContext';
// import ScanIcon from '../assets/SVG/ScanIcon';

interface HeaderBarProps {
  title?: string;
  showNotificationIcon?: boolean;
  balanceComponent?: React.ReactNode;
  // balance: number;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title, showNotificationIcon, balanceComponent}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isDarkMode, toggleTheme, theme} = useTheme();
  const {balance} = useAuth();

  return (
    <View style={styles.HeaderContainer}>
      <Text style={[styles.HeaderText, {color: theme.textColor}]}>{title}</Text>
      {/* <ScanIcon
      fillColor={COLORS.primaryWhite}
      size={30} /> */}
      { showNotificationIcon && (
      <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")}>
        <NotificationIcon fillColor={theme.textColor} size={28} />
      </TouchableOpacity>
      )}
      {balanceComponent && <View style={styles.balanceContainer}>
        <Text style={[styles.balanceText, {color: theme.textColor} ]}>{balance.toLocaleString()}</Text></View>}
    </View>
  );
};
const styles = StyleSheet.create({

  HeaderContainer: {
    marginVertical: SPACING.space_10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  HeaderText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_24,
    color: COLORS.primaryWhiteHex,
  },
  balanceContainer: {
    backgroundColor: COLORS.secondaryBGColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  balanceText: {
    color: COLORS.textColor,
    fontSize: 18,
    fontWeight:  '500',
  },
});

export default HeaderBar;
