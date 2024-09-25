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
  TransactionSuccess: { 
    amount: number,
    destination_address: string,
    blockHash: string, 
    transactionHash: string,
    timestamp: string ,
  };
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

// All types where string because
// of how blockchain send it's own datatype
export type AssetData = {
    tokenId: string | null,
    tokenIcon: string,
    balance: string,
    tokenDecimal: string,
    tokenSymbol: string
}

