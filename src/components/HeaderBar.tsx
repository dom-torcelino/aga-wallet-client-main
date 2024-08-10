/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import NotificationIcon from '../../assets/SVG/NotificationIcon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types';
// import ScanIcon from '../assets/SVG/ScanIcon';


interface HeaderBarProps {
    title?: string;
}

const HeaderBar:React.FC<HeaderBarProps> = ({title}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.HeaderContainer}>
      <Text style={styles.HeaderText}>{title}</Text>
      {/* <ScanIcon
      fillColor={COLORS.primaryWhite}
      size={30} /> */}
      <TouchableOpacity onPress={() => navigation.navigate('NotificationView')}>
        < NotificationIcon
        fillColor={COLORS.primaryWhite}
        size={33} />
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
    HeaderText:{
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_24,
        color: COLORS.primaryWhiteHex,
    },
});


export default HeaderBar;
