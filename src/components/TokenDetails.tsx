import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
// import { TokenData } from '../data/mockData';
import {useAuth} from '../screens/auth/AuthContext';
import {RootStackParamList} from '../constants/types'; // Import the type
import BackButton from './ui/BackButton';


type TokenDetailsRouteProp = RouteProp<RootStackParamList, 'TokenDetails'>;

const TokenDetails: React.FC = () => {
  const route = useRoute<TokenDetailsRouteProp>();
  const {token} = route.params;
  const {balance} = useAuth();

  return (
    <View style={styles.container}>
      <BackButton />
      <View style={styles.assetContainer}>
        <Text style={styles.coinName}>{token.coinName}</Text>
        <Image
          source={
            typeof token.image === 'string' ? {uri: token.image} : token.image
          }
          style={styles.image}
        />
        <View style={styles.row}>
          <Text style={styles.crypto}>{token.crypto}</Text>
          <Text style={styles.coin}>{token.coin}</Text>
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
  },

  assetContainer: {
    backgroundColor: COLORS.secondaryBGColor,
    padding: SPACING.space_15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
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
