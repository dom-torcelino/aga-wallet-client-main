
import React from 'react';
import ContentLoader, { Circle, Rect } from 'react-content-loader/native';
import { View, StyleSheet, Dimensions } from 'react-native';
import { COLORS, SPACING } from '../../../constants/theme';
const { width } = Dimensions.get('window');

const NotificationSkeleton = () => {
  return (
    <ContentLoader
      speed={1.5}
      width={width - SPACING.space_10 * 2}
      height={90}
      viewBox={`0 0 ${width - SPACING.space_10 * 2} 90`}
      backgroundColor={COLORS.secondaryBGColor}
      foregroundColor={COLORS.layeBGColor}
      style={styles.skeleton}>
      <View style={styles.skeletonContainer}>
        <Rect x="0" y="0" rx="14" ry="14" width="100%" height="80" />
      </View>
    </ContentLoader>
  );
};

const styles = StyleSheet.create({
  skeletonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  skeleton: {
    marginTop: SPACING.space_4,
    marginLeft: SPACING.space_10,
    marginRight: SPACING.space_10
  },
});

export default NotificationSkeleton;
