// services/api.ts
// @ts-ignore
import { API_URL } from '@env';
import messaging from '@react-native-firebase/messaging';

export const loginUser = async (email: string, password: string) => {
    const response = await fetch(`${API_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Login failed');
    return await response.json(); // Return the token and user data
  };
  
  export const fetchWalletData = async (userId: string, accessToken: string) => {
    const response = await fetch(`${API_URL}/v1/users/${userId}/wallet`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) throw new Error('Failed to fetch wallet data');
    return await response.json(); // Return the wallet balance, address, etc.
  };
  

  export const checkFCMToken = async (authToken: string): Promise<void> => {
    try {
  
      await messaging().registerDeviceForRemoteMessages();

      const fcmToken = await messaging().getToken();
      
      if (fcmToken) {
        const response = await fetch(`${API_URL}/v1/messagings`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ messaging_token: fcmToken }),
        });
        
        if (!response.ok) {
          throw new Error('Failed to send FCM token to server');
        }
      }
    } catch (error) {
      console.error('Failed to register FCM token:', error);
    }
  };

  export const checkIfHasWallet = async (userId: number, accessToken: string) => {
    try {
      const response = await fetch(`${API_URL}/v1/users/${userId}/accounts`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      console.log("Response:", response);
  
      if (!response.ok) {
        // If the response is not OK, it means there was an issue fetching the wallet data
        throw new Error('No Wallet Data found.');
      }
  
      const accountData = await response.json();
      const accountAddress = accountData?.accounts?.[0]?.account_address;
  
      if (!accountAddress) {
        // If no account address is found, it means the user does not have a wallet
        throw new Error('No account address found.');
      }
  
      // If account address exists, return the account data to indicate the wallet exists
      return accountData;
    } catch (error) {
      console.error("Error checking wallet:", error);
      throw error; // Re-throw the error to handle it in the calling function
    }
  };