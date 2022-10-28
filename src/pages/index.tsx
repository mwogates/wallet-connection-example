import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect, NetworkSwitcher } from '../components'
import { useIsMounted } from '../hooks'

function Page() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  if (!isMounted) return null
  return (
    <main className="w-full h-screen bg-neutral-700 flex flex-col items-center justify-start py-20 px-4">
      <h1 className="font-sans font-medium text-4xl sm:text-5xl uppercase text-white text-center mb-3">
        Wallet Connection Example
      </h1>
      <h2 className="font-mono text-2xl text-neutral-300 mb-4">
        Michael Gates
      </h2>

      <div className="container">
        <Connect />

        {isConnected && (
          <>
            <Account />
            <NetworkSwitcher />
          </>
        )}
      </div>
    </main>
  )
}

export default Page
