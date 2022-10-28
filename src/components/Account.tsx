import { useAccount, useBalance, useEnsName } from 'wagmi'

export function Account() {
  const { address } = useAccount()
  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
  })
  const { data: ensNameData } = useEnsName({ address })

  return (
    <div className="flex justify-center mb-4">
      <div className="flex flex-col items-center border border-neutral-200 rounded pt-4 pb-2 px-8 w-full sm:w-1/2">
        <span className="text-lg font-semibold text-white">Account Information</span>
        <span className="font-sans text-neutral-100">
          {ensNameData ?? address}
        </span>
        <span>{ensNameData ? ` (${address})` : null}</span>
        {!isError && !isLoading && (
          <span className="font-mono text-sm text-neutral-100">
            Balance: {data?.formatted} {data?.symbol}
          </span>
        )}
      </div>
    </div>
  )
}
