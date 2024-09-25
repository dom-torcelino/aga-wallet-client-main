import { ActionType } from "../../types/enum"

export interface AuthState {
    userId: number | null,
    accessToken: string,
    refreshToken: string
}

export type AuthAction = 
    | { type: ActionType.SET_USER_ID, payload: number }
    | { type: ActionType.SET_ACCES_TOKEN, payload: string }
    | { type: ActionType.SET_REFRESH_TOKEN, payload: string }