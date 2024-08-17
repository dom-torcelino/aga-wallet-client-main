import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../types/types';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';

const { height, width } = Dimensions.get('window');

const TransactionFailureScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.container}>
      <View style={styles.transferHeader}>
        <Image
          source={require('../../assets/images/emptyState/TransferFailed.png')}
          style={styles.TransferFailedImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>Transaction Failed!</Text>
        <Text style={styles.bodyText}>
          Your transfer has been declined due {'\n'}to a technical issue
        </Text>
      </View>

      <View style={styles.nextButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Home')}
          style={styles.button}>
          <Text style={styles.buttonText}>Back to Wallet</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: COLORS.primaryBGColor,
  },
  title: {
    fontSize: FONTSIZE.size_20,
    marginBottom: 10,
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.primaryWhite,
  },
  bodyText: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'center',
    marginBottom: 10,
  },
  transferHeader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: SPACING.space_16,
  },
  nextButtonContainer: {
    height: height * 0.07,
    width: '100%',
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  button: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: COLORS.primaryGoldHex,
    borderRadius: BORDERRADIUS.radius_15,
  },
  buttonText: {
    fontSize: 16,
    color: COLORS.primaryBGColor,
    fontFamily: FONTFAMILY.poppins_semibold,
  },
  TransferFailedImage: {
    width: 150,
    height: 120,
    marginVertical: SPACING.space_24,
  },
});

export default TransactionFailureScreen;
