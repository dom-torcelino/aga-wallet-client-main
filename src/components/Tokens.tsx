import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useEffect, useMemo, useState} from 'react';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../constants/theme';
import {useAuth} from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton'; // Import the skeleton loader component
// @ts-ignore
import {API_URL} from '@env';
import {useTheme} from '../utils/ThemeContext';

export interface TokenData {
  id: number;
  coin: string;
  coinName: string;
  image: string;
  crypto: string;
  fiat: string;
}


export interface Asset {
  tokenSymbol: string,
  walletAddress: string,
  balance: number
}

interface TokensProps {
  onPressToken: (item: TokenData) => void;
}

const {width} = Dimensions.get('window');
const IMAGE_SIZE = width * 0.11;
const skeletonCount = 5;

const Tokens: React.FC<TokensProps> = ({onPressToken }) => {
  const {userId, token, loggedIn, balance} = useAuth();
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const {theme} = useTheme();

  useEffect(() => { 
    let isMounted = true;

    const fetchTokenData = async () => {
      if (loggedIn) {
        try {
          const response = await fetch(`${API_URL}/v1/assets`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token?.accessToken}`,
            },
          });
          const result = await response.json();

          if (isMounted) {
            if (result && result.assets) {
              const transformedData = result.assets
                .map((asset: any) => ({
                  id: asset.asset_id,
                  coin: asset.asset_symbol,
                  coinName: asset.asset_name,
                  image: asset.asset_icon,
                  crypto: '0',
                  fiat: '0',
                }))
                .filter((item: any) => item.id !== undefined); // Filter out items without an id

              setTokenData(transformedData);
            } else {
              console.error(
                'Error: assets property is missing in the response',
                result,
              );
            }
            setLoading(false);
          }
        } catch (error) {
          if (isMounted) {
            console.error('Error fetching token data:', error);
            setLoading(false);
          }
        }
      }
    };

    fetchTokenData();

    return () => {
      isMounted = false;
    };
  }, [userId, token, loggedIn]);

  const renderItem = ({item}: {item: TokenData}) => {
    if (!item.id) {
      return null;
    }

    return (
      <TouchableOpacity
        style={[
          styles.tokenContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}
        onPress={() => onPressToken(item)}>
        <View style={styles.leftSideContainer}>
          <View style={styles.coinContainer}>
            <Image source={{uri: item.image}} style={styles.TokenImage} />
          </View>
          <View>
            <Text style={[styles.coin, {color: theme.textColor}]}>
              {item.coin}
            </Text>
            <Text style={styles.coinName}>{item.coinName}</Text>
          </View>
        </View>
        <View style={styles.rightSideContainer}>
          <Text style={[styles.crypto, {color: theme.textColor}]}>
            {item.crypto}
          </Text>
          <Text style={styles.fiat}>${balance.toLocaleString()}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.tokenStyles}>
      <FlatList
        data={loading ? Array(skeletonCount).fill({}) : tokenData}
        renderItem={loading ? () => <TransactionSkeleton /> : renderItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        scrollEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  tokenStyles: {
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.secondaryBGColor,
    marginTop: SPACING.space_10,
    borderWidth: 1,
    borderColor: COLORS.borderStroke,
    borderRadius: 12,
    padding: width * 0.026,
    justifyContent: 'space-between',
  },
  leftSideContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinContainer: {
    marginRight: 10,
    borderRadius: 20,
  },
  TokenImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  coin: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    lineHeight: 34,
  },
  coinName: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
  },
  crypto: {
    fontSize: FONTSIZE.size_18,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.primaryWhite,
    textAlign: 'right',
  },
  fiat: {
    fontSize: FONTSIZE.size_16,
    fontFamily: FONTFAMILY.poppins_regular,
    color: COLORS.secondaryTextColor,
    textAlign: 'right',
  },
  rightSideContainer: {
    justifyContent: 'flex-end',
  },
});

export default Tokens;
