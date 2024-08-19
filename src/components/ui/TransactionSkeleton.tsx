import React from 'react';
import ContentLoader, {Circle, Rect} from 'react-content-loader/native';
import {View, StyleSheet, Dimensions} from 'react-native';
import {COLORS, SPACING} from '../../constants/theme';
import {useTheme} from '../../utils/ThemeContext';

const {width} = Dimensions.get('window');

const TransactionSkeleton = () => {
  const {theme} = useTheme();
  return (
    <ContentLoader
      speed={1.5}
      width={width - SPACING.space_16 * 2}
      height={90}
      viewBox={`0 0 ${width - SPACING.space_20 * 2} 90`}
      backgroundColor={theme.secondaryBGColor}
      foregroundColor={theme.layeBGColor}
      style={styles.skeleton}>
      <View style={styles.skeletonContainer}>
        {/* <Circle cx="30" cy="35" r="30" /> */}
        <Rect x="0" y="0" rx="14" ry="14" width="97%" height="80" />
      </View>
    </ContentLoader>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  skeleton: {
    marginTop: SPACING.space_4,
  },
});

export default TransactionSkeleton;
