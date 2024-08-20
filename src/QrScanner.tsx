'use strict';

import React, { useEffect } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from '@react-navigation/native';
import BackButtonIcon from '../assets/SVG/BackButtonIcon';
import { BORDERRADIUS } from './constants/theme';
import { RootStackParamList } from './types/types';
import { Vibration } from 'react-native';

const CustomMarker: React.FC = React.memo(() => {
  return (
    <View style={styles.markerContainer}>
      <View style={[styles.corner, styles.topLeft]} />
      <View style={[styles.corner, styles.topRight]} />
      <View style={[styles.corner, styles.bottomLeft]} />
      <View style={[styles.corner, styles.bottomRight]} />
    </View>
  );
});

type setRecipientAddressProp = RouteProp<RootStackParamList, 'QrScanner'>;

const QrScanner: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const route = useRoute<setRecipientAddressProp>();
  const { setRecipient_address } = route.params;
  const [error, setError] = React.useState<string | null>(null);

  useEffect(() => {
    navigation.setOptions({
      setRecipient_address,
    });
  }, [navigation, setRecipient_address]);

  const onSuccess = ({ data }: { data: string }) => {
    try {
      Vibration.vibrate();
      setRecipient_address(data);
      navigation.goBack();
    } catch (err) {
      setError('Failed to process the QR code.');
    }
  };

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onSuccess}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        showMarker={false}
        // customMarker={}
        containerStyle={styles.qrContainer}
        cameraStyle={styles.camera}
        topViewStyle={styles.zeroContainer}
        bottomViewStyle={styles.zeroContainer}
      />
      {error && <Text style={styles.errorText}>{error}</Text>}
      {/* Overlay and other components */}
      <View style={styles.overlayTop} />
      <View style={styles.overlayBottom} />
      <View style={styles.overlayLeft} />
      <View style={styles.overlayRight} />
      <View style={styles.topContentContainer}>
        <TouchableOpacity
          style={styles.backButtonContainer}
          onPress={() => navigation.goBack()}>
          <BackButtonIcon size={30} style={styles.backButton} />
        </TouchableOpacity>
        <Text style={styles.textBold}>Scan a wallet QR code</Text>
      </View>
      <CustomMarker />
      {/* <TouchableOpacity style={styles.buttonTouchable}>
        <Text style={styles.buttonText}>OK. Got it!</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const overlayColor = 'rgba(0, 0, 0, 0.4)';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  } as ViewStyle,
  qrContainer: {
    flex: 1,
    padding: 0,
  } as ViewStyle,
  camera: {
    height: '100%',
    width: '100%',
  } as ViewStyle,
  zeroContainer: {
    height: 0,
    flex: 0,
  } as ViewStyle,
  topContentContainer: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 20,
    zIndex: 4,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center',
  } as ViewStyle,
  textBold: {
    fontWeight: '500',
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    marginLeft: 10,
  } as TextStyle,
  textDescription: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
  } as TextStyle,
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)',
    zIndex: 4,
  } as TextStyle,
  buttonTouchable: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    padding: 16,
    zIndex: 4,
  } as ViewStyle,
  backButtonContainer: {
    borderRadius: BORDERRADIUS.radius_25,
    overflow: 'hidden',
    padding: 6,
    zIndex: 4,
  } as ViewStyle,
  backButton: {
    marginRight: 2,
  },
  overlayTop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '33.8%',
    backgroundColor: overlayColor,
    zIndex: 1,
  } as ViewStyle,
  overlayBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '34.0%',
    backgroundColor: overlayColor,
    zIndex: 1,
  } as ViewStyle,
  overlayLeft: {
    position: 'absolute',
    top: '33.8%',
    bottom: '34%',
    left: 0,
    width: '17%',
    backgroundColor: overlayColor,
    zIndex: 1,
  } as ViewStyle,
  overlayRight: {
    position: 'absolute',
    top: '33.8%',
    bottom: '34%',
    right: 0,
    width: '17%',
    backgroundColor: overlayColor,
    zIndex: 1,
  } as ViewStyle,
  markerContainer: {
    position: 'absolute',
    top: '33.6%',
    left: '16.5%',
    width: '67%',
    height: '32.5%',
    zIndex: 2,
  } as ViewStyle,
  corner: {
    position: 'absolute',
    width: 80,
    height: 80,
    borderColor: 'white',
  } as ViewStyle,
  topLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 3,
    borderLeftWidth: 3,
  } as ViewStyle,
  topRight: {
    top: 0,
    right: 0,
    borderTopWidth: 3,
    borderRightWidth: 3,
  } as ViewStyle,
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 3,
    borderLeftWidth: 3,
  } as ViewStyle,
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 3,
    borderRightWidth: 3,
  } as ViewStyle,
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  } as TextStyle,
});

AppRegistry.registerComponent('default', () => QrScanner);

export default QrScanner;
