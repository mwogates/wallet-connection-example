import { useNetwork, useSwitchNetwork } from 'wagmi'

export function NetworkSwitcher() {
  const { chain } = useNetwork()
  const { chains, error, isLoading, pendingChainId, switchNetwork } =
    useSwitchNetwork()

  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center border border-neutral-200 rounded pt-4 pb-2 px-8 w-full sm:w-1/2">
        <div className="font-sans text-neutral-100 mb-3">
          Connected to {chain?.name ?? chain?.id}
          {chain?.unsupported && ' (unsupported)'}
        </div>

        {switchNetwork && (
          <div className="flex justify-center gap-4">
            {chains.map((x) =>
              x.id === chain?.id ? null : (
                <button
                  key={x.id}
                  onClick={() => switchNetwork(x.id)}
                  className="bg-neutral-100 font-sans py-1 px-2 rounded text-neutral-900"
                >
                  {x.name}
                  {isLoading && x.id === pendingChainId && ' (switching)'}
                </button>
              ),
            )}
          </div>
        )}

        <div className="pt-2 text-red-500">{error && error.message}</div>
      </div>
    </div>
  )
}
