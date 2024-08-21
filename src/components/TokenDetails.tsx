import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
// import { TokenData } from '../data/mockData';
import {useAuth} from '../screens/auth/AuthContext';
import {RootStackParamList} from '../types/types'; // Import the type
import BackButton from './ui/BackButton';
import {useTheme} from '../utils/ThemeContext';

type TokenDetailsRouteProp = RouteProp<RootStackParamList, 'TokenDetails'>;

const TokenDetails: React.FC = () => {
  const route = useRoute<TokenDetailsRouteProp>();
  const {token} = route.params;
  const {balance} = useAuth();
  const {isDarkMode, toggleTheme, theme} = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primaryBGColor,
        },
      ]}>
      {/* <BackButton /> */}
      <View
        style={[
          styles.assetContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}>
        <Image
          source={
            typeof token.image === 'string' ? {uri: token.image} : token.image
          }
          style={styles.image}
        />
        <Text style={[styles.coinName, {color: theme.textColor}]}>
          {token.coinName}
        </Text>

        <View style={styles.row}>
          <Text style={[styles.crypto, {color: theme.textColor}]}>
            {token.crypto}
          </Text>
          <Text style={[styles.coin, {color: theme.textColor}]}>
            {token.coin}
          </Text>
        </View>
        {/* <Text style={styles.fiat}>${token.fiat}</Text> */}
        <Text style={styles.fiat}>${balance.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBGColor,
    padding: 20,
    marginTop:50
  },

  assetContainer: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    alignItems: 'center',
  },
  image: {
    width: 80,
    height: 80,
  },
  row: {
    flexDirection: 'row',
  },
  coin: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    margin: 10,
  },
  coinName: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  crypto: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    marginVertical: 10,
  },
  fiat: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
});

export default TokenDetails;
