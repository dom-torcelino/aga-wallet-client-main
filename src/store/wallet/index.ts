import { ActionType } from "../../types/enum";
import { WalletAction, WalletState } from "./interface";

export const initialWalletState: WalletState = {
    assets: [],
    accountAddress: null,
    accountName: '',
    balance: 0
}

export const walletReducer = (state: WalletState, action: WalletAction) : WalletState => {
    switch (action.type) {
        case ActionType.SET_ASSETS:
            return { ...state, assets: action.payload };
        case ActionType.SET_ACCOUNT_ADDRESS:
            return { ...state, accountAddress: action.payload };
        case ActionType.SET_ACCOUNT_NAME:
            return { ...state, accountName: action.payload };
        case ActionType.SET_BALANCE:
            return { ...state, balance: action.payload };
        default:
            return state;
    }
}