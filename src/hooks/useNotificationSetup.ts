// src/hooks/useNotificationSetup.ts
import { useEffect } from 'react';
import messaging from '@react-native-firebase/messaging';
import { PermissionsAndroid, Platform } from 'react-native';
// @ts-ignore;
import { API_URL } from '@env';

const requestUserPermission = async () => {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission denied');
      return false;
    }
  }

  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  return enabled;
};

const registerFCMToken = async (authToken: string) => {
  try {
    await messaging().registerDeviceForRemoteMessages();
    const fcmToken = await messaging().getToken();
    console.log(fcmToken);
    await fetch(`${API_URL}/v1/messagings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },
      body: JSON.stringify({ messaging_token: fcmToken }),
    });

    // console.log('FCM Token Registered');
  } catch (error) {
    console.error('Failed to register FCM token:', error);
  }
};

const useNotificationSetup = (authToken: string) => {
  useEffect(() => {
    const setupNotifications = async () => {
      const enabled = await requestUserPermission();
      if (enabled) {
        await registerFCMToken(authToken);
      } else {
        console.log('User has not enabled notifications.');
      }
    };

    setupNotifications();

    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });
  }, [authToken]);
};

export default useNotificationSetup;