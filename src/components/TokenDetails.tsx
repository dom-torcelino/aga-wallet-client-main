/* eslint-disable prettier/prettier */
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { RouteProp, useRoute } from '@react-navigation/native';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
// import { TokenData } from '../data/mockData';
import BackButtonIcon from '../../assets/SVG/BackButtonIcon';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../constants/types'; // Import the type

type TokenDetailsRouteProp = RouteProp<RootStackParamList, 'TokenDetails'>;

const TokenDetails: React.FC = () => {
  const route = useRoute<TokenDetailsRouteProp>();
  const { token } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButtonContainer} onPress={() => navigation.goBack()}>
            <BackButtonIcon size={30} style={styles.backButton} />
          </TouchableOpacity>
      </View>
      <View style={styles.assetContainer}>
        <Text style={styles.coinName}>{token.coinName}</Text>
        <Image source={typeof token.image === 'string' ? { uri: token.image } : token.image} style={styles.image} />
        <View style={styles.row}>
          <Text style={styles.crypto}>{token.crypto}</Text>
          <Text style={styles.coin}>{token.coin}</Text>
        </View>
        <Text style={styles.fiat}>(${token.fiat})</Text>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    margin: 10,
  },
  fiat: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  backButtonContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    backgroundColor: COLORS.secondaryBGColor,
    padding: 6,
  },
  backButton: {
    marginRight: 2,
  },
});

export default TokenDetails;
