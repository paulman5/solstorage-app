import { CHAIN_NAMESPACES } from "@web3auth/base"

export const chainConfig = {
  chainNamespace: CHAIN_NAMESPACES.OTHER,
  chainId: "0x1", //
  rpcTarget: "https://rpc.ankr.com/eth",
  // Avoid using public rpcTarget in production.
  displayName: "StarkNet Mainnet",
  blockExplorerUrl: "https://explorer.immutable.com",
  ticker: "STRK",
  tickerName: "StarkNet",
}
