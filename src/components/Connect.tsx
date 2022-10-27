import { useAccount, useConnect, useDisconnect } from 'wagmi'

import { useIsMounted } from '../hooks'

export function Connect() {
  const isMounted = useIsMounted()
  const { connector, isConnected } = useAccount()
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="flex flex-col items-center border border-neutral-200 rounded pt-4 pb-2 px-8 w-full sm:w-1/2">
        {isConnected && (
          <button
            onClick={() => disconnect()}
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
      </div>

      {error && <div className="pt-3 text-red-500">{error.message}</div>}
    </div>
  )
}
