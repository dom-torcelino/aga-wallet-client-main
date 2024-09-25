
import { AssetData } from "../../types/types";
// @ts-ignore
import { API_URL } from '@env';

export const getAccountAllAssets = async (walletAddress: string) => {
    try {
        // const response = await fetch(`${API_URL}/v1/aga/accounts/${walletAddress}/assets`);
        // const responseData = await response.json()
        return [] as AssetData[]
    } catch (error) {
        console.log(error)
        return [] as AssetData[]
    }
}