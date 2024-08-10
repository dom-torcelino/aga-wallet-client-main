
import { StyleSheet, Dimensions, TextInput as RNTextInput } from 'react-native';
import React from 'react';
import { BORDERRADIUS, COLORS, FONTFAMILY } from '../../constants/theme';
const { height } = Dimensions.get('window');

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
  return (
    <RNTextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      placeholderTextColor={COLORS.placeHolderTextColor}
      secureTextEntry={secureTextEntry}
    />
  );
};

export default TextInput;

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    color: COLORS.primaryWhite,
    borderColor: COLORS.strokeColor,
    fontFamily: FONTFAMILY.poppins_regular,
    paddingHorizontal: 15,
    marginVertical: 10,
    height: height * 0.07,
    borderRadius: BORDERRADIUS.radius_15,
    width: '100%',
    backgroundColor: COLORS.secondaryBGColor,
  },
});
