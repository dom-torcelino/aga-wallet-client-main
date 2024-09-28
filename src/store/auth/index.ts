import { ActionType } from "../../types/enum";
import { AuthAction, AuthState } from "./interface";

export const initialAuthState: AuthState = {
    userId: null,
    refreshToken: '',
    accessToken : '', 
    fcmToken: '',
    loggedIn: true,
    // loggedOut: false,
    hasWallet: false,
 
}

export const authReducer = (state: AuthState, action: AuthAction) : AuthState => {
    switch (action.type) {
        case ActionType.SET_USER_ID:
            return { ...state, userId: action.payload }
        case ActionType.SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload }
        case ActionType.SET_FCM_TOKEN:
            return { ...state, fcmToken: action.payload }
        case ActionType.SET_LOGGED_IN:
            return {...state, loggedIn: true}
        // case ActionType.SET_LOGGED_OUT:
        //     return {...state, loggedIn: false, userId: null, accessToken: null}
        case ActionType.SET_HAS_WALLET:
            return {...state, hasWallet: true}
        default:
            return state
    }
}