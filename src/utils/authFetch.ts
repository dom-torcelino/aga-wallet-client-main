
import AsyncStorage from '@react-native-async-storage/async-storage';

const authFetch = async (url: string, options: RequestInit = {}) => {
  const token = await AsyncStorage.getItem('userToken');

  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
    ...(token ? {Authorization: `Bearer ${token}`} : {}),
  };

  const response = await fetch(url, {
    ...options,
    headers,
  });

  return response;
};

export default authFetch;
