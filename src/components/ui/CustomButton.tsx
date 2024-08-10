/* eslint-disable prettier/prettier */
import { Text, TouchableOpacityProps, TouchableOpacity, StyleSheet } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../constants/theme';

interface CustomButtonProps {
    title: string;
    onPress: TouchableOpacityProps['onPress'];
    Icon?: React.ComponentType<{ size: number }> | null;
  }

  const CustomButton: React.FC<CustomButtonProps> = ({ title, onPress, Icon }) => {
    return(
        <TouchableOpacity style={styles.buttonWrapper} onPress={onPress}>
            {Icon && <Icon size={25} />}
            <Text style={styles.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    buttonWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        paddingVertical: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
        backgroundColor: COLORS.layeBGColor,
    },
    buttonText: {
        fontSize: FONTSIZE.size_14,
        color: '#FFFFFF',
        textAlign: 'center',
        marginLeft: 10,
        fontFamily: FONTFAMILY.poppins_medium,
      },

})

export default CustomButton;