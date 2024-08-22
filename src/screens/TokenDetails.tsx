import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
// import { TokenData } from '../data/mockData';
import { useAuth } from './auth/AuthContext';
import { RootStackParamList } from '../types/types'; // Import the type
import BackButton from '../components/ui/BackButton';
import { useTheme } from '../utils/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TokenDetailsRouteProp = RouteProp<RootStackParamList, 'TokenDetails'>;

const TokenDetails: React.FC = () => {
  const route = useRoute<TokenDetailsRouteProp>();
  const { token } = route.params;
  const { balance } = useAuth();
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.primaryBGColor,
        },
      ]}>
      {/* <BackButton /> */}
      <View>
        <Text style={[styles.coinName, { color: theme.textColor }]}>
          {token.coinName}
        </Text>
      </View>
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
            typeof token.image === 'string' ? { uri: token.image } : token.image
          }
          style={styles.image}
        />

        <Text style={styles.fiat}>${balance.toFixed(2)}</Text>

        <View style={styles.row}>
          <Text style={[styles.crypto, { color: theme.textColor }]}>
            {token.crypto}
          </Text>
          <Text style={[styles.coin, { color: theme.textColor }]}>
            {token.coin}
          </Text>
        </View>
        {/* <Text style={styles.fiat}>${token.fiat}</Text> */}

      </View>
      <View>
        <TouchableOpacity style={[styles.button]}>
          <Text style={[styles.buttonText, { color: theme.textColor }]}>
            Go Back
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
    padding: 20,
  },

  assetContainer: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30
  },
  image: {
    width: 80,
    height: 80,
    position: 'absolute',
    top: -40
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
    fontSize: FONTSIZE.size_30,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center'
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
    marginTop: 25
  },
  button: {
    position: 'absolute',
    width: '100%',
    top: 0,
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    marginTop: 25,
    backgroundColor: COLORS.primaryLightGreyHex
  },
  buttonText: {
    fontSize: FONTSIZE.size_24,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    margin: 10,
    textAlign: 'center'
  },
});

export default TokenDetails;
