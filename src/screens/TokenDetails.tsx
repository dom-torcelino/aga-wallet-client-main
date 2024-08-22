import { StyleSheet, Text, View, Image, Dimensions } from 'react-native';
import React from 'react';
import {RouteProp, useRoute} from '@react-navigation/native';
import {BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';

// import { TokenData } from '../data/mockData';
import { useAuth } from './auth/AuthContext';
import { RootStackParamList } from '../types/types'; // Import the type
import BackButton from '../components/ui/BackButton';
import { useTheme } from '../utils/ThemeContext';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation, NavigationProp} from '@react-navigation/native';

type TokenDetailsRouteProp = RouteProp<RootStackParamList, 'TokenDetails'>;

const {height, width} = Dimensions.get('window');

const TokenDetails: React.FC = () => {
  const route = useRoute<TokenDetailsRouteProp>();
  const { token } = route.params;
  const { balance } = useAuth();
  const { theme } = useTheme();
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

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
            typeof token.image === 'string' ? { uri: token.image } : token.image
          }
          style={styles.image}
        />

        <Text style={[styles.fiat, {color: theme.textColor}]}>${balance.toFixed(2)}</Text>

        <View style={styles.row}>
          <Text style={[styles.crypto, { color: theme.textColor }]}>
            {token.crypto}
          </Text>
          <Text style={[styles.coin, { color: theme.textColor }]}>
            {token.coin}
          </Text>
        </View>
        <View style={styles.rowAsset}>
        <Text style={[styles.crypto, {color: theme.textColor}]}>
            Assets
          </Text>
          <Text style={[styles.coin, {color: theme.textColor}]}>
              {token.crypto}
          </Text>
        </View>
        {/* <Text style={styles.fiat}>${token.fiat}</Text> */}
      </View>
      <View style={[styles.bottomRow ]}>
          <TouchableOpacity style={[styles.button, {backgroundColor: theme.primaryGoldHex} ]}>
            <Text style={[styles.buttonText, {color: theme.textColor}]}
            onPress={() => navigation.navigate('Home')}>
              Back to wallet
            </Text>
          </TouchableOpacity>
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent:'space-between'
  },
  assetContainer: {
    padding: SPACING.space_15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
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
  rowAsset: {
    borderTopColor:'#272727',
    borderTopWidth:1,
    flexDirection: 'row',
    justifyContent:'space-between',
    width: '100%',
    padding: 15
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
    marginTop: 25
  },
  button: {
    height: height * 0.07,
    width: '100%',
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_regular,
    marginTop: 25,
    borderRadius:10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhite,
    margin: 10,
    textAlign: 'center'
  },
  bottomRow:{
    marginBottom:20
  }
});

export default TokenDetails;
