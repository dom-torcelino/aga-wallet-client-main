import {StyleSheet, Text, View, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../constants/theme';
import MoneySendIcon from '../../assets/SVG/MoneySendIcon';
import MoneyReceivedIcon from '../../assets/SVG/MoneyReceivedIcon';
// import SwapIcon from '../assets/SVG/SwapIcon';
import EyeOpenIcon from '../../assets/SVG/EyeOpenIcon';
import EyeCloseIcon from '../../assets/SVG/EyeCloseIcon';
import type {TouchableOpacityProps} from 'react-native';
import {useBottomSheet} from './BottomSheetContext';

type CustomButtonProps = {
  title: string;
  onPress: TouchableOpacityProps['onPress'];
  Icon: React.ComponentType<{size: number}>;
};

const CustomButton: React.FC<CustomButtonProps> = ({title, onPress, Icon}) => {
  return (
    <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
      <Icon size={25} />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
};

interface CardBalanceProps {
  balance: number;
}

const CardBalance: React.FC<CardBalanceProps> = ({balance}) => {
  const {pressHandler, pressHandler2} = useBottomSheet();
  const [balanceVisible, setBalanceVisible] = useState(true);
  // const [balance, setBalance] = useState(13827.80);

  const toggleBalanceVisibility = () => {
    setBalanceVisible(!balanceVisible);
  };

  return (
    <View style={styles.CardContainer}>
      <View>
        <TouchableWithoutFeedback onPress={toggleBalanceVisibility}>
          <View>
            <View style={styles.balanceTitleContainer}>
              <Text style={styles.balanceTitle}>Total balance</Text>
              {balanceVisible ? (
                <EyeOpenIcon size={25} fillColor={COLORS.primaryWhite} />
              ) : (
                <EyeCloseIcon size={25} fillColor={COLORS.primaryWhite} />
              )}
            </View>
            <Text style={styles.balanceStyle}>
              $ {balanceVisible ? balance.toLocaleString() : '*****'}
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.ButtonContainer}>
        <CustomButton
          title="Transfer"
          onPress={pressHandler}
          Icon={MoneySendIcon}
        />
        <CustomButton
          title="Receive"
          onPress={pressHandler2}
          Icon={MoneyReceivedIcon}
        />
        {/* <CustomButton title="Swap" onPress={() => {}} Icon={SwapIcon} /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    marginVertical: SPACING.space_10,
    padding: SPACING.space_24,
    backgroundColor: COLORS.secondaryBGColor,
    borderRadius: BORDERRADIUS.radius_15,
  },
  ButtonContainer: {
    flexDirection: 'row',
    marginTop: SPACING.space_10,
  },
  buttonWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    paddingVertical: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: COLORS.layeBGColor,
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: FONTSIZE.size_14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginLeft: 10,
    fontFamily: FONTFAMILY.poppins_medium,
  },
  balanceTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  balanceTitle: {
    fontSize: FONTSIZE.size_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
    marginRight: SPACING.space_10,
  },
  balanceStyle: {
    fontSize: 45,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryWhite,
  },
});

export default CardBalance;
