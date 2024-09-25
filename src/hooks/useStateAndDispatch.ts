import { act, useReducer } from "react"
import { authReducer, initialAuthState, initialUserState, initialWalletState, userReducer, walletReducer } from "../store"
import { WalletAction } from "../store/wallet/interface";
import { UserAction } from "../store/user/interface";
import { AuthAction } from "../store/auth/interface";

const useStateAndDispatch = () => {
    const [walletState, dispatchWallet] = useReducer(walletReducer, initialWalletState);
    const [userState, dispatchUser] = useReducer(userReducer, initialUserState);
    const [authState, dispatchAuth] = useReducer(authReducer, initialAuthState);

    const state = { ...walletState, ...userState, ...authState };

    const dispatch = (action: WalletAction | UserAction | AuthAction) => {
        dispatchWallet(action as WalletAction);
        dispatchUser(action as UserAction);
        dispatchAuth(action as AuthAction)
    }

    // useEffect(() => {
    //   const callApiSetup = async () => {
    //     try {
    //         const assets: AssetData[] = await getAccountAllAssets();
    //         if (assets.length){
    //             dispatch({ type: ActionType.SET_ASSETS, payload: assets })
    //         }
    //     } catch (error) {
    //         console.log("Error setting up API")
    //     }
    //   }
    //   callApiSetup().then()
    // }, [])
    
    return { state, dispatch }
}

export default useStateAndDispatch;