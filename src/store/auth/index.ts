import { ActionType } from "../../types/enum";
import { AuthAction, AuthState } from "./interface";

export const initialAuthState: AuthState = {
    userId: null,
    refreshToken: '',
    accessToken : ''
}

export const authReducer = (state: AuthState, action: AuthAction) : AuthState => {
    switch (action.type) {
        case ActionType.SET_USER_ID:
            return { ...state, userId: action.payload }
        case ActionType.SET_ACCES_TOKEN:
            return { ...state, accessToken: action.payload }
        case ActionType.SET_REFRESH_TOKEN:
            return { ...state, refreshToken: action.payload }
        default:
            return state
    }
}