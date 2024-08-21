import { TokenData } from '../components/Tokens';
import { TransactionData } from '../types/TransactionTypes';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: undefined;
  WalletCreation: undefined;
  CreatePassword: undefined;
  ConfirmPassword: { password: string};
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
  SendAsset: { token: TokenData};
  SendAssetAmount: {
    token: TokenData;
    recipientAddress: string;
  };
  SendAssetPassword: {
    token: TokenData;
    walletAddress: string | null;
    amount: number;
    recipientAddress: string;
  };
  TokenDetails: { token: TokenData};
  QrScanner: { setRecipient_address: (address: string) => void };
  Transaction: undefined;
  TransactionDetails: {transaction: TransactionData};
  TransactionSuccessScreen: {transactionId: number};
  TransactionFailure: undefined;
  NotificationsScreen: undefined;
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
