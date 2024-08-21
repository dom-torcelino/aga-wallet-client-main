import {
  StyleSheet,
  Dimensions,
  TextInput as RNTextInput,
  View,
} from 'react-native';
import React from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
} from '../../constants/theme';
import { useTheme } from '../../utils/ThemeContext';
const {height} = Dimensions.get('window');

interface TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
}) => {
  const {isDarkMode, toggleTheme, theme} = useTheme();

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
        style={[styles.input, {color: theme.textColor}]}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={COLORS.placeHolderTextColor}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

export default TextInput;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: BORDERRADIUS.radius_15,
    marginVertical: 10,
    height: height * 0.07,
    backgroundColor: COLORS.secondaryBGColor,
    borderWidth: 1,
    color: COLORS.primaryWhite,
    borderColor: COLORS.strokeColor,
  },
  input: {
    fontSize: FONTSIZE.size_14,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingHorizontal: 15,
    width: '100%',
    height: '100%',
    color: COLORS.textColor,
  },
});
