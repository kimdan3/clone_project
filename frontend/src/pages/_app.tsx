import { useState } from 'react'
import { Inter } from 'next/font/google'
import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { CookiesProvider } from 'react-cookie'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Provider as JotaiProvider } from 'jotai'

import '@/styles/globals.css'
import { AuthRedirect } from '@/components/common/AuthRedirect'

const inter = Inter({ subsets: ['latin'] })

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  const [queryClient] = useState(
    new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: 1000 * 60 * 5, // 5 mins
          cacheTime: Infinity,
          refetchOnWindowFocus: false,
          refetchOnMount: false,
        },
      },
    })
  )

  return (
    <SessionProvider session={session}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={pageProps.dehydratedState}>
            <JotaiProvider>
              <div className={inter.className}>
                <AuthRedirect />
                <Component {...pageProps} />
              </div>
            </JotaiProvider>
          </Hydrate>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </CookiesProvider>
    </SessionProvider>
  )
}
