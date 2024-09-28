import { ActionType } from "../../types/enum";
import { AssetData } from "../../types/types"

export interface WalletState {
    assets: AssetData[],
    accountAddress: string | null,
    accountName: string,
    balance: number
}

export type WalletAction =
    | { type: ActionType.SET_ASSETS, payload: AssetData[] }
    | { type: ActionType.SET_ACCOUNT_ADDRESS, payload: string }
    | { type: ActionType.SET_ACCOUNT_NAME, payload: string }
    | { type: ActionType.SET_BALANCE, payload: number }
