
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useAuth = () => {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const getTokenAndUserId = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('userToken');
        const storedUserId = await AsyncStorage.getItem('userId');
        const storedAccountAddress = await AsyncStorage.getItem(
          'accountAddress',
        );

        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUserId) {
          setUserId(storedUserId);
        }
        if (storedAccountAddress) {
          setAccountAddress(storedAccountAddress);
        }
        if (storedToken && storedUserId) {
          setLoggedIn(true);
        }
      } catch (error) {
        console.error('Failed to retrieve data from AsyncStorage', error);
      }
    };

    getTokenAndUserId();
  }, []);

  return {
    token,
    userId,
    accountAddress,
    loggedIn,
    setToken: async (newToken: string) => {
      setToken(newToken);
      await AsyncStorage.setItem('userToken', newToken);
      if (newToken && userId) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    },
    setUserId: async (newUserId: string) => {
      setUserId(newUserId);
      await AsyncStorage.setItem('userId', newUserId);
      if (newUserId && token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    },
    setAccountAddress: async (newAccountAddress: string) => {
      setAccountAddress(newAccountAddress);
      await AsyncStorage.setItem('accountAddress', newAccountAddress);
    },
  };
};

export default useAuth;
