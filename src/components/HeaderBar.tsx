import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import NotificationIcon from '../../assets/SVG/NotificationIcon';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';
import {useTheme} from '../utils/ThemeContext';
// import ScanIcon from '../assets/SVG/ScanIcon';

interface HeaderBarProps {
  title?: string;
}

const HeaderBar: React.FC<HeaderBarProps> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const {isDarkMode, toggleTheme, theme} = useTheme();

  return (
    <View style={styles.HeaderContainer}>
      <Text style={[styles.HeaderText, {color: theme.textColor}]}>{title}</Text>
      {/* <ScanIcon
      fillColor={COLORS.primaryWhite}
      size={30} /> */}
      <TouchableOpacity onPress={() => navigation.navigate("NotificationsScreen")}>
        <NotificationIcon fillColor={theme.textColor} size={28} />
      </TouchableOpacity>
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
});

export default HeaderBar;
