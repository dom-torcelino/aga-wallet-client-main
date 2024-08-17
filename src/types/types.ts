import {NotificationData, TokenData} from '../data/mockData';
import {TransactionData} from '../types/TransactionTypes';
// import { NavigationProp } from '@react-navigation/native'; // Ensure you have the correct import for navigation

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  WalletCreation: undefined;
  CreatePassword: undefined;
  ConfirmPassword: {password: string};
  EnterPassword: {
    token: TokenData;
    walletAddress: string;
    amount: number;
    recipient_address: string;
  };
  Home: undefined;
  'Home Tab': undefined;
  'Home Drawer': undefined;
  Wallet: undefined;
  'Wallet Drawer': undefined;
  Notifications: undefined;
  'Notifications Drawer': undefined;
  Settings: undefined;
  'Account Settings': undefined;
  'Settings Navigator': undefined;
  'Settings Detail': undefined;
  'My Profile': undefined;
  GameView: {game: any};

  SendToken: {token: TokenData};
  SendAmount: {
    token: TokenData;
    setRecipient_address: (address: string) => void;
  };
  TokenDetails: {token: TokenData};
  QrScanner: {setRecipient_address: (address: string) => void};
  Transaction: undefined;
  TransactionDetails: {transaction: TransactionData};
  TransactionSuccessScreen: {transactionId: number};
  TransactionFailure: undefined;
  NotificationView: {notification: NotificationData};
};

export interface User {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  hasWallet: boolean;
  hasPassword: boolean;
  user: any;
}
