import { ActionType } from "../../types/enum"

export interface AuthState {
    userId: number | null,
    accessToken: string | null,
    refreshToken: string,
    fcmToken: string,
    loggedIn: boolean,
    // loggedOut: boolean,
    hasWallet: boolean,
}
 
export type AuthAction = 
    | { type: ActionType.SET_USER_ID, payload: number }
    | { type: ActionType.SET_ACCESS_TOKEN, payload: string }
    | { type: ActionType.SET_REFRESH_TOKEN, payload: string }
    | { type: ActionType.SET_FCM_TOKEN, payload: string }
    | { type: ActionType.SET_LOGGED_IN}
    // | { type: ActionType.SET_LOGGED_OUT}
    | { type: ActionType.SET_HAS_WALLET, payload: boolean }