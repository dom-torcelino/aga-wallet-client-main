import {StyleSheet, View} from 'react-native';
import React from 'react';
import Tokens, { TokenData } from './Tokens';
import {COLORS, SPACING} from '../constants/theme';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {RootStackParamList} from '../types/types';

interface TransferProps {
  closeBottomSheet: () => void;
}

const Transfer: React.FC<TransferProps> = ({closeBottomSheet}) => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressToken = (item: TokenData) => {
    closeBottomSheet();
    navigation.navigate('SendAsset', {token: item});
  };

  return (
    <View style={styles.TransferContainer}>
      <Tokens onPressToken={onPressToken} />
    </View>
  );
};

const styles = StyleSheet.create({
  TransferContainer: {
    paddingHorizontal: SPACING.space_20,
  },
  textStyle: {
    color: COLORS.primaryWhite,
  },
});

export default Transfer;
