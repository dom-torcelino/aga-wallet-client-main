interface Spacing {
  space_2: number;
  space_4: number;
  space_8: number;
  space_10: number;
  space_12: number;
  space_15: number;
  space_16: number;
  space_18: number;
  space_20: number;
  space_24: number;
  space_28: number;
  space_30: number;
  space_32: number;
  space_36: number;
}

export const SPACING: Spacing = {
  space_2: 2,
  space_4: 4,
  space_8: 8,
  space_10: 10,
  space_12: 12,
  space_15: 15,
  space_16: 16,
  space_18: 18,
  space_20: 20,
  space_24: 24,
  space_28: 28,
  space_30: 30,
  space_32: 32,
  space_36: 36,
};

interface Color {
  primaryColor: string;
  primaryBGColor: string;
  secondaryBGColor: string;
  layeBGColor: string;
  strokeColor: string;
  primaryWhite: string;
  secondaryWhite: string;
  borderStroke: string;
  secondaryTextColor: string;
  greenTextColor: string;
  redTextColor: string;
  primaryGoldHex: string;
  placeHolderTextColor: string;
  textColor: string;
  unreadNotificationBG: string;
  unreadNotificationBorder: string;

  primaryRedHex: string;
  primaryOrangeHex: string;
  primaryBlackHex: string;
  primaryDarkGreyHex: string;
  secondaryDarkGreyHex: string;
  primaryGreyHex: string;
  secondaryGreyHex: string;
  primaryLightGreyHex: string;
  secondaryLightGreyHex: string;
  primaryWhiteHex: string;
  primaryBlackRGBA: string;
  secondaryBlackRGBA: string;
}

export const COLORS: Color = {
  primaryColor: '#D5A952',
  primaryBGColor: '#000000',
  secondaryBGColor: '#141414',
  layeBGColor: '#272727',
  strokeColor: '#3C403F',
  primaryWhite: '#FFFFFF',
  secondaryWhite: '#949292',
  borderStroke: '#3C403F',
  secondaryTextColor: '#888686',
  greenTextColor: '#48B22E',
  redTextColor: '#C12727',
  primaryGoldHex: '#D5A952',
  primaryWhiteHex: '#FFFFFF',
  placeHolderTextColor: '#888',
  textColor: '#D4D4D4',
  unreadNotificationBG: '#3C3C3C',
  unreadNotificationBorder: '#FF6347',

  primaryRedHex: '#DC3535',
  primaryOrangeHex: '#D17842',
  primaryBlackHex: '#0C0F14',
  primaryDarkGreyHex: '#141921',
  secondaryDarkGreyHex: '#21262E',
  primaryGreyHex: '#252A32',
  secondaryGreyHex: '#252A32',
  primaryLightGreyHex: '#52555A',
  secondaryLightGreyHex: '#AEAEAE',
  primaryBlackRGBA: 'rgba(12,15,20,0.5)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

export const LIGHT_COLORS: Color = {
  primaryColor: '#D5A952',
  primaryBGColor: '#FFFFFF',
  secondaryBGColor: '#F0F0F0',
  layeBGColor: '#E5E5E5',
  strokeColor: '#C0C0C0',
  primaryWhite: '#FFFFFF',
  secondaryWhite: '#949292',
  borderStroke: '#C0C0C0',
  secondaryTextColor: '#444444',
  greenTextColor: '#48B22E',
  redTextColor: '#C12727',
  primaryGoldHex: '#D5A952',
  primaryWhiteHex: '#FFFFFF',
  placeHolderTextColor: '#888',
  textColor: '#222222',
  unreadNotificationBG: '#E0E0E0',
  unreadNotificationBorder: '#FF6347',
  primaryRedHex: '#DC3535',
  primaryOrangeHex: '#D17842',
  primaryBlackHex: '#0C0F14',
  primaryDarkGreyHex: '#141921',
  secondaryDarkGreyHex: '#21262E',
  primaryGreyHex: '#D3D3D3',
  secondaryGreyHex: '#D3D3D3',
  primaryLightGreyHex: '#F0F0F0',
  secondaryLightGreyHex: '#AEAEAE',
  primaryBlackRGBA: 'rgba(0,0,0,0.5)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

export const DARK_COLORS: Color = {
  primaryColor: '#D5A952',
  primaryBGColor: '#000000',
  secondaryBGColor: '#141414',
  layeBGColor: '#272727',
  strokeColor: '#3C403F',
  primaryWhite: '#FFFFFF',
  secondaryWhite: '#949292',
  borderStroke: '#3C403F',
  secondaryTextColor: '#888686',
  greenTextColor: '#48B22E',
  redTextColor: '#C12727',
  primaryGoldHex: '#D5A952',
  primaryWhiteHex: '#FFFFFF',
  placeHolderTextColor: '#888',
  textColor: '#D4D4D4',
  unreadNotificationBG: '#3C3C3C',
  unreadNotificationBorder: '#FF6347',
  primaryRedHex: '#DC3535',
  primaryOrangeHex: '#D17842',
  primaryBlackHex: '#0C0F14',
  primaryDarkGreyHex: '#141921',
  secondaryDarkGreyHex: '#21262E',
  primaryGreyHex: '#252A32',
  secondaryGreyHex: '#252A32',
  primaryLightGreyHex: '#52555A',
  secondaryLightGreyHex: '#AEAEAE',
  primaryBlackRGBA: 'rgba(12,15,20,0.5)',
  secondaryBlackRGBA: 'rgba(0,0,0,0.7)',
};

interface FontFamily {
  poppins_black: string;
  poppins_bold: string;
  poppins_extrabold: string;
  poppins_extralight: string;
  poppins_light: string;
  poppins_medium: string;
  poppins_regular: string;
  poppins_semibold: string;
  poppins_thin: string;
}

export const FONTFAMILY: FontFamily = {
  poppins_black: 'Poppins-Black',
  poppins_bold: 'Poppins-Bold',
  poppins_extrabold: 'Poppins-ExtraBold',
  poppins_extralight: 'Poppins-ExtraLight',
  poppins_light: 'Poppins-Light',
  poppins_medium: 'Poppins-Medium',
  poppins_regular: 'Poppins-Regular',
  poppins_semibold: 'Poppins-SemiBold',
  poppins_thin: 'Poppins-Thin',
};

interface FontSize {
  size_8: number;
  size_10: number;
  size_12: number;
  size_14: number;
  size_16: number;
  size_18: number;
  size_20: number;
  size_24: number;
  size_28: number;
  size_30: number;
}

export const FONTSIZE: FontSize = {
  size_8: 8,
  size_10: 10,
  size_12: 12,
  size_14: 14,
  size_16: 16,
  size_18: 18,
  size_20: 20,
  size_24: 24,
  size_28: 28,
  size_30: 30,
};

interface BorderRadius {
  radius_4: number;
  radius_8: number;
  radius_10: number;
  radius_15: number;
  radius_20: number;
  radius_25: number;
}

export const BORDERRADIUS: BorderRadius = {
  radius_4: 4,
  radius_8: 8,
  radius_10: 10,
  radius_15: 15,
  radius_20: 20,
  radius_25: 25,
};
