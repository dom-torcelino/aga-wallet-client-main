export interface TransactionData {
  tx_id: number;
  tx_wallet_sender_address: string;
  tx_wallet_recipient_address: string;
  tx_amount: number;
  tx_status: string;
  tx_hash: string;
  tx_block_hash: string;
  tx_created_at: string;
  tx_updated_at: string;
  tx_type: string;
}
