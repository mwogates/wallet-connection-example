import { Ethereum } from '@wagmi/core'
import { useEffect, useState } from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { InjectedConnector } from 'wagmi/connectors/injected'

import { useIsMounted } from '../hooks'

export function Connect() {
  const isMounted = useIsMounted()
  const { connector, isConnected } = useAccount()
  const {
    connect,
    connectors: allConnectors,
    error,
    isLoading,
    pendingConnector,
  } = useConnect()
  const { disconnect } = useDisconnect()
  const injectedConnector = new InjectedConnector()
  const [connectors, setConnectors] = useState(allConnectors)
  const [metaMaskEthereum, setMetaMaskEthereum] = useState<Ethereum>()

  useEffect(() => {
    const connectors = allConnectors.filter((x) => x.id !== 'injected')
    setConnectors(connectors)
  }, [])

  const connectBitKeep = () => {
    if ((window as any).bitkeep && (window as any).bitkeep.ethereum) {
      setMetaMaskEthereum(window.ethereum)
      window.ethereum = (window as any).bitkeep.ethereum
      connect({ connector: injectedConnector })
    } else {
      alert('BitKeep wallet not installed')
    }
  }

  const connectBinance = () => {
    if ((window as any).BinanceChain) {
      setMetaMaskEthereum(window.ethereum)
      window.ethereum = (window as any).BinanceChain
      connect({ connector: injectedConnector })
    } else {
      alert('Binance wallet not installed')
    }
  }

  const disconnectWallet = () => {
    window.ethereum = metaMaskEthereum
    disconnect()
  }

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex flex-col items-center border border-neutral-200 rounded pt-4 pb-2 px-8 w-full sm:w-1/2">
        {isConnected && (
          <button
            onClick={() => disconnectWallet()}
            className="block w-full mb-5 bg-neutral-100 font-sans py-2 px-3 rounded text-neutral-900"
          >
            Disconnect from {connector?.name}
          </button>
        )}

        {connectors
          .filter((x) => isMounted && x.ready && x.id !== connector?.id)
          .map((x) => (
            <button
              key={x.id}
              onClick={() => connect({ connector: x })}
              className="block w-full mb-2 bg-neutral-100 font-sans py-2 px-3 rounded text-neutral-900"
            >
              {x.name}
              {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
            </button>
          ))}

        <button
          key={'bitkeep'}
          onClick={connectBitKeep}
          className="block w-full mb-2 bg-neutral-100 font-sans py-2 px-3 rounded text-neutral-900"
        >
          BitKeep
        </button>

        <button
          key={'binance'}
          onClick={connectBinance}
          className="block w-full mb-2 bg-neutral-100 font-sans py-2 px-3 rounded text-neutral-900"
        >
          Binance
        </button>
      </div>

      {error && <div className="pt-3 text-red-500">{error.message}</div>}
    </div>
  )
}
