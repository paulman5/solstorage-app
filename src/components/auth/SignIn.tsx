import { useEffect, useState } from "react"
import { chainConfig } from "@/config/chainConfig"
import { Web3Auth } from "@web3auth/modal"
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base"
import { CommonPrivateKeyProvider } from "@web3auth/base-provider"
import { Web3AuthNoModal } from "@web3auth/no-modal"

export default function SigIn() {
  const [provider, setProvider] = useState<IProvider | null>(null)
  const [loggedIn, setLoggedIn] = useState(false)

  const clientId =
    "BMJUc20xaAezd8AsXObue4LLBSFTFwyl6fXjwmoQTnIQShRScbZCPUSqdS_vYxYJFytzjn6k3x6kIXOKMj2EJwE"

  const privateKeyProvider = new CommonPrivateKeyProvider({
    config: { chainConfig },
  })

  const web3auth = new Web3AuthNoModal({
    clientId,
    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET,
  })
}
