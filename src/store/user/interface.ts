import { ActionType } from "../../types/enum"

export interface UserState {
    name: string,
}

export type UserAction = 
    | { type: ActionType.SET_NAME, payload: string }