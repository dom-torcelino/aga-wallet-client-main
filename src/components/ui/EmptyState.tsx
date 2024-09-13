import { View, Text, Image, StyleSheet, ImageSourcePropType, Button,   Dimensions, } from 'react-native';
import React from 'react';
import { useTheme } from '../../utils/ThemeContext';
import { COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../../constants/theme';
import { TouchableOpacity } from 'react-native-gesture-handler';

const {height} = Dimensions.get('window');

interface EmptyStateProps {
    image: ImageSourcePropType;
    headerText: string;
    bodyText: string;
    theme: {
        primaryBGColor: string;
        textColor: string;
        secondaryTextColor: string;
    };
    showButton?: boolean;
    buttonText?: string;
    onPressButton?: () => void;
}

const EmptyState:React.FC<EmptyStateProps> = ({image, headerText, bodyText, theme, showButton = false, buttonText, onPressButton}) => {
    
    return (
    <View style={[styles.emptyStateContainer, {backgroundColor: theme.primaryBGColor}]}>
        <View style={styles.ImageContainer}>
            <Image 
                source={image}
                style={styles.emptyStateImageContainer}
                resizeMode='contain'
            />
        </View>
      <Text style={[styles.emptyStateHeaderText, {color: theme.textColor}]}>{headerText}</Text>
      <Text style={[styles.bodyText, {color: theme.secondaryTextColor}]}>{bodyText}</Text>

      { showButton && (
            <TouchableOpacity  
                onPress={onPressButton}
                activeOpacity={0.7}
                style={styles.buttonContainer}>
                <Text style={[styles.buttonText, {color: theme.primaryBGColor}]}>
                    {buttonText}
                </Text>
            </TouchableOpacity>

      )}
    </View>
  );
};

const styles = StyleSheet.create({
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: SPACING.space_16,
        // backgroundColor: COLORS.primaryBGColor,
        // backgroundColor: 'red',
        
    },
    emptyStateImageContainer : {
        width: 150,
        height: 150,
        marginVertical: 10,
        
    },
    ImageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
      },
    emptyStateHeaderText: {
        fontSize: 24,
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    bodyText: {
        fontSize: FONTSIZE.size_16,
        fontFamily: FONTFAMILY.poppins_regular,
        color: COLORS.secondaryTextColor,
        textAlign: 'center',
        marginBottom: SPACING.space_24,
    },
    buttonContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '100%',
        height: height * 0.06,
        backgroundColor: COLORS.primaryGoldHex,
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: COLORS.primaryBGColor,
        fontFamily: FONTFAMILY.poppins_semibold,
    },

});

export default EmptyState