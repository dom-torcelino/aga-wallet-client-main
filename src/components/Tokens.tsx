import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../constants/theme';
import { useAuth } from '../screens/auth/AuthContext';
import TransactionSkeleton from './ui/TransactionSkeleton'; // Import the skeleton loader component
// @ts-ignore
import { API_URL } from '@env';
import { useTheme } from '../utils/ThemeContext';
import EmptyAssetLight from '../../assets/images/emptyState/NoAssetLight.png';
import EmptyAssetDark from '../../assets/images/emptyState/NoAssetDark.png';
import EmptyState from './ui/EmptyState';
import { useTranslation } from 'react-i18next';
import DefaultCoin from '../../assets/images/aga_coin.png'


export interface TokenData {
  id: string | null;
  coin: string;
  coinName: string;
  crypto: string;
  fiat: string;
}

interface TokensProps {
  onPressToken: (item: TokenData) => void;
}

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.11;
const skeletonCount = 5;

const Tokens: React.FC<TokensProps> = ({ onPressToken }) => {
  const { t } = useTranslation(['wallet']);
  const { token, loggedIn, balance, accountAddress } = useAuth();
  const [tokenData, setTokenData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const { theme, isDarkMode } = useTheme();

  useEffect(() => {
    let isMounted = true;

    const fetchTokenData = async () => {
      if (loggedIn) {
        try {
          const response = await fetch(`${API_URL}/v1/aga/accounts/${accountAddress}/assets`, {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token?.accessToken}`,
            },
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            console.error('Error in API response:', errorData.message);
            return;
          }

          const result = await response.json();
          console.log('result: ', result.assets);

          if (isMounted) {
            if (result.assets) {
              const transformedData = result.assets
                .map((asset: any) => {
                  const balanceWithDecimals = parseFloat(
                    asset.balance.replace(/,/g, '')
                  ) / Math.pow(10, asset.decimals || 1);
                  return {
                    id: asset.id || null,
                    coin: asset.symbol || '',
                    coinName: asset.symbol, // Default coinName to symbol if name is missing
                    crypto: balanceWithDecimals.toFixed(2),
                    fiat: '0', // Placeholder for fiat conversion
                  };
                })
                .filter((item: TokenData) => item.coin && item.crypto !== '0.00'); // Filter out tokens with no symbol or zero balance

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
  }, [accountAddress, loggedIn, token]);

  const renderItem = ({ item, index }: { item: TokenData; index: number }) => {
    return (
      <TouchableOpacity
        style={[
          styles.tokenContainer,
          {
            backgroundColor: theme.secondaryBGColor,
            borderColor: theme.borderStroke,
          },
        ]}
        onPress={() => onPressToken(item)}
      >
        <View style={styles.leftSideContainer}>
          <View style={styles.coinContainer}>
            {/* Image could be added here if available */}
            {/* <Image source={{ uri: item.image }} style={styles.tokenImage} /> */}
            <Image source={DefaultCoin} style={styles.tokenImage} />
          </View>
          <View>
            <Text style={[styles.coin, { color: theme.textColor }]}>
              {item.coin}
            </Text>
            <Text style={styles.coinName}>{item.coinName}</Text>
          </View>
        </View>
        <View style={styles.rightSideContainer}>
          <Text style={[styles.crypto, { color: theme.textColor }]}>
            {index === 0 ? balance.toFixed(2) : item.crypto}
          </Text>
          <Text style={styles.fiat}>
            ${index === 0 ? balance.toFixed(2) : item.crypto}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderEmptyState = () => {
    return (
      <View style={styles.emptyContainer}>
        <EmptyState
          image={isDarkMode ? EmptyAssetDark : EmptyAssetLight}
          headerText={t('wallet:emptyAssets')}
          bodyText={t('wallet:emptyAssetsDescription')}
          theme={theme}
        />
      </View>
    );
  };

  return (
    <View style={styles.assetsStyles}>
      <FlatList
        data={loading ? Array(skeletonCount).fill({}) : tokenData}
        renderItem={loading ? () => <TransactionSkeleton /> : renderItem}
        keyExtractor={(item, index) => (item.id ? item.id.toString() : index.toString())}
        scrollEnabled={false}
        ListEmptyComponent={!loading && tokenData.length === 0 ? renderEmptyState : null}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  assetsStyles: {
    marginBottom: 20,
    flex: 1,
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
  tokenImage: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
  },
  coinContainer: {
    marginRight: 10,
    borderRadius: 20,
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
});

export default Tokens;
