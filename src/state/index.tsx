import { createContext, Dispatch, FC, ReactNode, useContext } from "react";
import { WalletAction, WalletState } from "../store/wallet/interface";
import { UserAction, UserState } from "../store/user/interface";
import { AuthAction, AuthState } from "../store/auth/interface";

// REGISTER ALL STORES HERE
interface AppContextType {
    state: WalletState & UserState & AuthState;
    dispatch: Dispatch<WalletAction | UserAction | AuthAction >
}

interface AppStateProviderProps {
    children: ReactNode
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppStateProvider: FC<AppStateProviderProps & AppContextType> = (props) => {
    const { children, state, dispatch } = props;

    if (!children) {
        throw new Error("AppStateProvider must have children");
    }

    return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>
}

export const useAppContext = () => {
    const context = useContext(AppContext);

    if (!context) {
        throw new Error("useAppContext must be used within an AppProvider")
    }

    return context;
}   