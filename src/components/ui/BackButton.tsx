import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import BackButtonIcon from '../../../assets/SVG/BackButtonIcon';
import { RootStackParamList } from '../../constants/types';
import { BORDERRADIUS, COLORS } from '../../constants/theme';

const BackButton: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={() => navigation.goBack()}>
        <BackButtonIcon size={30} style={styles.backButton} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButtonContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    backgroundColor: COLORS.secondaryBGColor,
    padding: 6,
  },
  backButton: {
    marginRight: 2,
  },
});

export default BackButton;
