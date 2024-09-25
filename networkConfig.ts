import { NetworkKeys } from "./src/types/enum";


type NetworkConfig = {
    nativeTokenSymbol: string,
    rpcUrl: string;
    parents: number;
    assethubSubscanUrl?: string;
}

export const NETWORKS: Record<NetworkKeys, NetworkConfig> = {
    [NetworkKeys.Aga]: {
        nativeTokenSymbol: "AGA",
        rpcUrl: "wss://cryptotest.agaglobal.com",
        parents: 1,
        assethubSubscanUrl: "https://agascan.com"
    }
}