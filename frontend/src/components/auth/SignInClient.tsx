'use client'

import type { BuiltInProviderType } from 'next-auth/providers'
import type { ClientSafeProvider, LiteralUnion } from 'next-auth/react'
import { signIn } from 'next-auth/react'

interface SignInClientProps {
  providers: Record<LiteralUnion<BuiltInProviderType, string>, ClientSafeProvider> | never[]
}

export default function SignInClient({ providers }: SignInClientProps) {
  return (
    <div className="grid h-screen place-items-center bg-gradient-to-br from-cyan-600 to-blue-300">
      <div className="grid gap-8">
        <h1 className="text-center text-5xl text-gray-800">
          Sign in required.
        </h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button
              className="w-full rounded-lg border border-gray-300  py-2 text-xl font-bold"
              onClick={() => signIn(provider.id)}
            >
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 