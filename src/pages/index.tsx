import * as React from 'react'
import { useAccount } from 'wagmi'

import { Account, Connect } from '../components'
import { useIsMounted } from '../hooks'

function Page() {
  const isMounted = useIsMounted()
  const { isConnected } = useAccount()

  if (!isMounted) return null
  return (
    <main className="w-full h-screen bg-neutral-700 flex flex-col items-center justify-start py-28 px-4">
      <h1 className="font-sans text-4xl sm:text-5xl uppercase text-white text-center mb-4">
        Wallet Connection Example
      </h1>
      <h2 className="font-mono text-2xl text-neutral-300 mb-5">
        Michael Gates
      </h2>

      <div className="container">
        <Connect />

        {isConnected && <Account />}
      </div>
    </main>
  )
}

export default Page
