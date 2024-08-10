import {ReactNode} from 'react';

/* eslint-disable prettier/prettier */
export type TransactionType = 'transfer' | 'received';

export interface TransactionData {
  tx_wallet_recipient_address: ReactNode;
  tx_amount: ReactNode;
  tx_status: ReactNode;
  tx_hash: ReactNode;
  tx_block_hash: ReactNode;
  tx_created_at: ReactNode;
  tx_updated_at: ReactNode;
  tx_type: ReactNode;
  tx_id: ReactNode;
  tx_wallet_sender_address: ReactNode;
  id: number;
  date: string;
  name: string;
  amount: string;
  description: string;
  type: TransactionType;
}

export interface NotificationData {
  code: ReactNode;
  message: string;
}

export interface TokenData {
  id: number;
  coin: string;
  coinName: string;
  fiat: number;
  crypto: number;
  image: any;
}

export interface NFTData {
  id: number;
  name: string;
  image: string;
}

export interface GameData {
  id: number;
  name: string;
  image: string;
  type: 'slot' | 'casino' | 'poker';
}



// Function to format date from YYYY-MM-DD to MMM DD, YYYY
const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
  return new Date(dateString).toLocaleDateString('en-US', options);
}

export const mockTransactions: TransactionData[] = [
  {
    id: 1, date: formatDate('2024-01-01'), amount: '1000.00', description: 'Received payment', type: 'received', name: 'Jay',
    tx_wallet_recipient_address: undefined,
    tx_amount: undefined,
    tx_status: undefined,
    tx_hash: undefined,
    tx_block_hash: undefined,
    tx_created_at: undefined,
    tx_updated_at: undefined,
    tx_type: undefined,
    tx_id: undefined,
    tx_wallet_sender_address: undefined
  },
  {
    id: 2, date: formatDate('2024-01-01'), amount: '-100.00', description: 'Received payment', type: 'transfer', name: 'Dom',
    tx_wallet_recipient_address: undefined,
    tx_amount: undefined,
    tx_status: undefined,
    tx_hash: undefined,
    tx_block_hash: undefined,
    tx_created_at: undefined,
    tx_updated_at: undefined,
    tx_type: undefined,
    tx_id: undefined,
    tx_wallet_sender_address: undefined
  },
  {
    id: 3, date: formatDate('2024-01-02'), amount: '10000.00', description: 'Sent payment', type: 'received', name: 'Aldrich',
    tx_wallet_recipient_address: undefined,
    tx_amount: undefined,
    tx_status: undefined,
    tx_hash: undefined,
    tx_block_hash: undefined,
    tx_created_at: undefined,
    tx_updated_at: undefined,
    tx_type: undefined,
    tx_id: undefined,
    tx_wallet_sender_address: undefined
  },
  {
    id: 4, date: formatDate('2024-01-02'), amount: '-100.00', description: 'Sent payment', type: 'transfer', name: 'Jang',
    tx_wallet_recipient_address: undefined,
    tx_amount: undefined,
    tx_status: undefined,
    tx_hash: undefined,
    tx_block_hash: undefined,
    tx_created_at: undefined,
    tx_updated_at: undefined,
    tx_type: undefined,
    tx_id: undefined,
    tx_wallet_sender_address: undefined
  },
  {
    id: 5, date: formatDate('2024-01-02'), amount: '-100.00', description: 'Sent payment', type: 'transfer', name: 'Jess',
    tx_wallet_recipient_address: undefined,
    tx_amount: undefined,
    tx_status: undefined,
    tx_hash: undefined,
    tx_block_hash: undefined,
    tx_created_at: undefined,
    tx_updated_at: undefined,
    tx_type: undefined,
    tx_id: undefined,
    tx_wallet_sender_address: undefined
  },

];

export const mockTokens: TokenData[] = [
  { id: 1, coin: 'AGA', coinName: 'AlphaGamingArcade', fiat: 171.566, crypto: 10000,  image: require('../../assets/images/aga_coin.png')},
  { id: 2, coin: 'BTC', coinName: 'Bitcoin', fiat: 17.156, crypto: 10000,  image: require('../../assets/images/bit_coin.png')},
  { id: 3, coin: 'ETH', coinName: 'Etherium', fiat: 1.715, crypto: 1000,  image: require('../../assets/images/etherium_coin.png')},
  { id: 4, coin: 'OMG', coinName: 'Omg Coin', fiat: 17.156, crypto: 100,  image: require('../../assets/images/omg_coin.png')},
  { id: 5, coin: 'EOS', coinName: 'Eos Coin', fiat: 17.156, crypto: 10,  image: require('../../assets/images/eos_icon.png')},
];

// export const mockNFTs: NFTData[] = [
//   { id: 1, name: 'CryptoPunk #3100', image: 'https://img.freepik.com/free-vector/flat-design-thug-life-sunglasses-illustration_23-2150209328.jpg?t=st=1720252336~exp=1720255936~hmac=97017684081ead75734dc71db79bbb6bea0f0943148af9cc1bd53a680e5fec9d&w=826' },
//   { id: 2, name: 'Bored Ape #1234', image: 'https://thisboredapedoesnotexist.s3.amazonaws.com/generated_images/generated-11-27-2021_18-28-54-8237.png'},
//   { id: 3, name: 'Bored Ape #1234', image: 'https://thisboredapedoesnotexist.s3.amazonaws.com/generated_images/generated-11-27-2021_18-28-54-41251-ema.png'},
// ];



export const games: GameData[] = [
  { id: 1, name: 'Ocean Story', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 2, name: 'Jungle Story', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 3, name: 'Space Story', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 4, name: 'Egypt Story', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 5, name: 'Wild Buffalo', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 6, name: 'Coin Mania', image: 'https://img.freepik.com/premium-photo/slot-machine-with-bar-star-it_1067477-11484.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'slot' },
  { id: 7, name: 'Ocean Story', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 8, name: 'Jungle Story', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 9, name: 'Space Story', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 10, name: 'Egypt Story', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 11, name: 'Wild Buffalo', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 12, name: 'Coin Mania', image: 'https://img.freepik.com/free-photo/photorealistic-casino-lifestyle_23-2151037024.jpg?t=st=1720773161~exp=1720776761~hmac=b114888739ba9bacc9c060dd65de4da575ed34987e4ef44c5ffb3bde2821cd53&w=1380', type: 'casino' },
  { id: 13, name: 'Ocean Story', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
  { id: 14, name: 'Jungle Story', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
  { id: 15, name: 'Space Story', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
  { id: 16, name: 'Egypt Story', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
  { id: 17, name: 'Wild Buffalo', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
  // { id: 18, name: 'Coin Mania', image: 'https://img.freepik.com/premium-photo/pair-aces-green-felt-table_376684-881.jpg?uid=R152380179&ga=GA1.1.1166362212.1720765043&semt=ais_user_ai_gen', type: 'poker' },
]
