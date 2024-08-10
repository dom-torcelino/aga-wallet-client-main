
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthContextProps {
  token: { accessToken: string } | null;
  userId: number | null;
  loggedIn: boolean;
  loading: boolean;
  balance: number;
  accountAddress: string | null;
  login: (token: { accessToken: string }, userId: number) => Promise<void>;
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
  login: async () => { },
  logout: () => { },
  setAccountAddress: () => { },
  setBalance: () => { },
});

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setToken] = useState<{ accessToken: string } | null>(null);
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
          const { token, userId } = parsedToken;
          // Assuming backend manages token validation
          setToken(token);
          setUserId(userId);
          setLoggedIn(true);
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

  const login = async (token: { accessToken: string }, userId: number) => {
    try {
      await AsyncStorage.setItem('userToken', JSON.stringify({ token, userId }));
      setToken(token);
      setUserId(userId);
      setLoggedIn(true);
      setAccountAddress(null);
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
