import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios'; // Example if you are using axios for API calls
import { API_URL } from '@env'; // Assuming you're using dotenv for environment variables

interface AuthContextProps {
  token: {accessToken: string} | null;
  userId: number | null;
  loggedIn: boolean;
  loading: boolean;
  balance: number;
  accountAddress: string | null;
  login: (token: {accessToken: string}, userId: number) => Promise<void>;
  logout: () => void;
  setAccountAddress: (address: string) => void;
  setBalance: (balance: number) => void;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps>({
  token: null,
  userId: null,
  loggedIn: false,
  loading: true,
  balance: 0,
  accountAddress: null,
  login: async () => {},
  logout: () => {},
  setAccountAddress: () => {},
  setBalance: () => {},
});

export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
  const [token, setToken] = useState<{accessToken: string} | null>(null);
  const [userId, setUserId] = useState<number | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [accountAddress, setAccountAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem('userToken');
        if (userToken) {
          const parsedToken = JSON.parse(userToken);
          const {token, userId} = parsedToken;

          // Example of token validation
          const isValid = await validateToken(token.accessToken);

          if (isValid) {
            setToken(token);
            setUserId(userId);
            setLoggedIn(true);
          } else {
            await logout(); // Log out if the token is invalid
          }
        } else {
          setLoggedIn(false);
        }
      } catch (error) {
        console.error('Failed to load token', error);
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const validateToken = async (accessToken: string) => {
    try {
      const response = await axios.post(`${API_URL}/validate-token`, {
        token: accessToken,
      });
      return response.data.isValid;
    } catch (error) {
      // console.error('Token validation failed', error);
      console.log('Token validation failed');
      return false;
    }
  };

  const login = async (token: {accessToken: string}, userId: number) => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify({token, userId}));
      setToken(token);
      setUserId(userId);
      setLoggedIn(true);
      setAccountAddress(null); // Optionally reset account address
    } catch (error) {
      console.error('Failed to login', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      setToken(null);
      setUserId(null);
      setLoggedIn(false);
      setAccountAddress(null); // Clear account address on logout
      setBalance(0); // Clear balance on logout
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        userId,
        loggedIn,
        loading,
        balance,
        accountAddress,
        login,
        logout,
        setAccountAddress,
        setBalance,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
