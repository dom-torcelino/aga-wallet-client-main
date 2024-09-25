import { ActionType } from "../../types/enum";
import { UserAction, UserState } from "./interface";

export const initialUserState: UserState = {
    name: '',
}

export const userReducer = (state: UserState, action: UserAction ): UserState => {
    switch (action.type) {
        case ActionType.SET_NAME:
            return { ...state, name: action.payload}
        default:
            return state
    }
}