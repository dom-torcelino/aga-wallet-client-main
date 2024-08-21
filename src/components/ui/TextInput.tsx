import {
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  View,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../../constants/theme';
import { useTheme } from '../../utils/ThemeContext';
import EyeOpenIcon from '../../../assets/SVG/EyeOpenIcon';  // Import your EyeOpenIcon
import EyeCloseIcon from '../../../assets/SVG/EyeCloseIcon'; // Import your EyeCloseIcon

const { height } = Dimensions.get('window');

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;  // Optional since it might not always be needed
  showVisibilityToggle?: boolean; // New prop to control eye visibility toggle
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,
  showVisibilityToggle = false,  // Default to false if not provided
}) => {
  const { isDarkMode, theme } = useTheme();
  const [isPasswordVisible, setPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.secondaryBGColor,
          borderColor: theme.borderStroke,
        },
      ]}>
      <RNTextInput
        style={[styles.input, { color: theme.textColor }]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.placeHolderTextColor}
        secureTextEntry={!isPasswordVisible && secureTextEntry}
      />
      {showVisibilityToggle && secureTextEntry && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          {isPasswordVisible ? (
            <EyeOpenIcon size={20} fillColor={theme.textColor} />
          ) : (
            <EyeCloseIcon size={20} fillColor={theme.textColor} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderRadius: BORDERRADIUS.radius_15,
    marginVertical: 10,
    height: height * 0.07,
    backgroundColor: COLORS.secondaryBGColor,
    borderWidth: 1,
    color: COLORS.primaryWhite,
    borderColor: COLORS.strokeColor,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
    color: COLORS.textColor,
  },
  iconContainer: {
    paddingHorizontal: 14,
  },
});
